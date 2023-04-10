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
    msg.member.hasPermission("ADMINISTRATOR")
  ) {
    await askQuestion(triviaChannel);
  }
});

async function updateUserScore(userId) {
  const userScore = await db.collection("scores").findOne({ userId });
  if (userScore) {
    await db
      .collection("scores")
      .updateOne({ userId }, { $set: { score: userScore.score + 1 } });
  } else {
    await db.collection("scores").insertOne({ userId, score: 1 });
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
    if (
      userAnswer &&
      userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()
    ) {
      await updateUserScore(message.author.id);
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

client.login(token);
