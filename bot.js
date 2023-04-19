require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildMembers,
  ],
});
const cron = require("node-cron");
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");
const axios = require("axios");
const { triviaQuestions } = require("./triviaQuestions");

const uri = process.env.MONGODB_URI;
const token = process.env.DISCORD_TOKEN;

const mongoClient = new MongoClient(uri);

const db = mongoClient.db("trivia");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  scheduleTrivia();
});

client.on(Discord.Events.MessageCreate, async (msg) => {
  console.log("MESSAGE", msg.content);
  const triviaChannel = client.channels.cache.find(
    (channel) => channel.name === "trivia"
  );
  if (msg.content === "!highestscore") {
    await displayHighestScore(msg.channel);
  }

  if (msg.content === "!top10") {
    await displayTopTenScores(msg.channel);
  }

  if (
    msg.content === "!askquestion" &&
    msg.member.permissions.has("Administrator")
  ) {
    await askQuestion(triviaChannel);
  }

  if (msg.content === "!myprofile") {
    await displayUserProfile(msg.author.id, msg.channel);
  }

  if (msg.content === "!gamenews") {
    const news = await fetchGameNewsAndReleases();
    displayGameNewsAndReleases(msg.channel, news);
  }
});

async function updateUserScore(userId, isCorrect) {
  const userScore = await db.collection("scores").findOne({ userId });

  if (userScore) {
    const newTotalQuestions = (userScore.totalQuestions ?? 0) + 1;
    const newCorrectAnswers =
      (userScore.correctAnswers ?? 0) + (isCorrect ? 1 : 0);
    const newAccuracy = (newCorrectAnswers / newTotalQuestions) * 100;

    await db.collection("scores").updateOne(
      { userId },
      {
        $set: {
          score: isCorrect ? userScore.score + 1 : userScore.score,
          totalQuestions: newTotalQuestions,
          correctAnswers: newCorrectAnswers,
          accuracy: newAccuracy,
        },
      }
    );
  } else {
    await db.collection("scores").insertOne({
      userId,
      score: isCorrect ? 1 : 0,
      totalQuestions: 1,
      correctAnswers: isCorrect ? 1 : 0,
      accuracy: isCorrect ? 100 : 0,
    });
  }
}

function scheduleTrivia() {
  cron.schedule("0 */3 * * *", async () => {
    const triviaChannel = client.channels.cache.find(
      (channel) => channel.name === "trivia"
    );
    if (!triviaChannel) {
      console.error("Trivia channel not found");
      return;
    }

    await askQuestion(triviaChannel);
  });
}

async function askQuestion(triviaChannel) {
  let currentQuestion = null;

  do {
    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    currentQuestion = triviaQuestions[randomIndex];

    const askedQuestion = await db
      .collection("askedQuestions")
      .findOne({ question: currentQuestion.question });

    if (askedQuestion) {
      currentQuestion = null;
    }
  } while (!currentQuestion);

  const options = _.shuffle(currentQuestion.options);

  await db.collection("askedQuestions").insertOne({
    question: currentQuestion.question,
    answer: currentQuestion.answer,
    options,
    askedAt: new Date(),
  });

  const sentMessage = await triviaChannel.send(
    `Trivia question: ${currentQuestion.question}\n\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}`
  );

  const collector = new Discord.MessageCollector(
    sentMessage.channel,
    (m) => !m.author.bot,
    { time: 86400000 }
  );

  let answeredUsers = [];

  collector.on("collect", async (message) => {
    if (answeredUsers.includes(message.author.id)) return;

    const userAnswer = options[parseInt(message.content) - 1];

    const isCorrect =
      userAnswer &&
      userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase();
    await updateUserScore(message.author.id, isCorrect);

    if (isCorrect) {
      sentMessage.channel.send(
        `Correct, ${message.author}! You earned 1 point.`
      );
      answeredUsers = [];

      collector.stop("correct_answer");
    } else {
      answeredUsers.push(message.author.id);
    }
  });

  collector.on("end", (collected, reason) => {
    if (reason !== "correct_answer") {
      sentMessage.channel.send(
        `Time's up! The correct answer is: ${currentQuestion.answer}`
      );
    }
  });
}

async function displayHighestScore(channel) {
  const highestScore = await db
    .collection("scores")
    .find()
    .sort({ score: -1 })
    .limit(1)
    .toArray();
  if (highestScore && highestScore.length > 0) {
    const highestScorer = await client.users.fetch(highestScore[0].userId);

    console.log("DISPLAYING_HIGHEST_SCORE");

    channel.send(
      `The highest score is held by ${highestScorer.username} with ${highestScore[0].score} points.`
    );
  } else {
    channel.send("No scores available.");
  }
}

async function displayTopTenScores(channel) {
  const scores = await db.collection("scores").find().toArray();

  const sortedScores = _.orderBy(scores, ["score"], ["desc"]);

  const topTenScores = await Promise.all(
    sortedScores.slice(0, 10).map(async (score) => {
      const user = await client.users.fetch(score.userId);

      return { ...score, username: user.username };
    })
  );

  let message = "**Top 10 Scores**\n";
  topTenScores.forEach((item, index) => {
    message += `${index + 1}. ${item.username} - ${item.score}\n`;
  });

  channel.send(message);
}

async function displayUserProfile(userId, channel) {
  const userScore = await db.collection("scores").findOne({ userId });

  if (userScore) {
    const user = await client.users.fetch(userId);

    const message = `**${user.username}'s Profile**\n
Total Points: ${userScore.score}\n
Total Questions Answered: ${userScore.totalQuestions ?? 0}\n
Correct Answers: ${userScore.correctAnswers ?? 0}\n
Accuracy: ${userScore.accuracy ? userScore.accuracy.toFixed(2) : 0}%\n`;

    channel.send(message);
  } else {
    channel.send("No profile information available.");
  }
}

async function fetchGameNewsAndReleases() {
  const url = "https://api.igdb.com/v4/games";
  const { access_token } = await authenticateTwitch();

  const headers = {
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    Authorization: `Bearer ${access_token}`,
  };

  // You can adjust the search parameters according to your needs
  const requestBody = `
  fields name,first_release_date,cover.url,release_dates.platform.name; where platforms = (6,130,167,169) & first_release_date > ${Math.ceil(
    Date.now() / 1_000
  )}; sort first_release_date asc; limit 5;
  `;

  try {
    const response = await axios.post(url, requestBody, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching game news and releases:", error.message);
    return [];
  }
}

function displayGameNewsAndReleases(channel, news) {
  let message = "**Upcoming Game Releases**\n\n";

  news.forEach((game) => {
    const releaseDate = new Date(game.first_release_date * 1000);
    const dateString = releaseDate.toDateString();
    const coverUrl = game.cover?.url || "";

    message += `**${game.name}**\n${dateString}\n${game.release_dates
      .map((release_date) => `${release_date.platform.name}`)
      .join(", ")}\nhttps:${coverUrl}\n\n`;
  });

  channel.send(message);
}

async function authenticateTwitch() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  const url = "https://id.twitch.tv/oauth2/token";

  try {
    const response = await axios.post(url, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error authenticating with Twitch:", error.message);
    return null;
  }
}

client.login(token);
