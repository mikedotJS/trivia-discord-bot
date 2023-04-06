require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["Guilds", "GuildMessages"] });
const cron = require("node-cron");
const MongoClient = require("mongodb").MongoClient;
const _ = require("lodash");

const uri = process.env.MONGODB_URI;
const token = process.env.DISCORD_TOKEN;

const triviaQuestions = [
  {
    question: "What was the first commercially successful video game?",
    options: ["Pong", "Space Invaders", "Pac-Man"],
    answer: "Pong",
  },
  {
    question: "Which game features a protagonist named Mario?",
    options: ["Super Mario Bros", "The Legend of Zelda", "Metroid"],
    answer: "Super Mario Bros",
  },
  {
    question: "Which game is known for its phrase 'The cake is a lie'?",
    options: ["Portal", "Half-Life 2", "BioShock"],
    answer: "Portal",
  },
  {
    question: "What is the name of the main character in The Legend of Zelda?",
    options: ["Zelda", "Link", "Ganon"],
    answer: "Link",
  },
  {
    question:
      "In which game do players fight on floating islands called stages?",
    options: ["Super Smash Bros.", "Street Fighter", "Mortal Kombat"],
    answer: "Super Smash Bros.",
  },
  {
    question: "What is the name of the city in Grand Theft Auto: Vice City?",
    options: ["Liberty City", "San Andreas", "Vice City"],
    answer: "Vice City",
  },
  {
    question:
      "Which game features a crowbar as the main character's iconic weapon?",
    options: ["Half-Life", "Doom", "Quake"],
    answer: "Half-Life",
  },
  {
    question:
      "What is the name of the virtual reality world in the game 'Ready Player One'?",
    options: ["The Grid", "The Oasis", "The Metaverse"],
    answer: "The Oasis",
  },
  {
    question:
      "What was the first console to use CDs as the primary storage medium?",
    options: ["Sony PlayStation", "Sega CD", "Philips CD-i"],
    answer: "Philips CD-i",
  },
  {
    question:
      "Which video game series features an assassin named Ezio Auditore?",
    options: ["Assassin's Creed", "Hitman", "Splinter Cell"],
    answer: "Assassin's Creed",
  },
  {
    question: "What is the name of the alien species in the Halo series?",
    options: ["Covenant", "Reapers", "Chimeran"],
    answer: "Covenant",
  },
  {
    question: "Which game has a protagonist named Aloy?",
    options: ["Horizon Zero Dawn", "The Witcher 3", "Tomb Raider"],
    answer: "Horizon Zero Dawn",
  },
  {
    question:
      "What is the name of the digital card game based on The Witcher series?",
    options: ["Gwent", "Hearthstone", "Magic: The Gathering"],
    answer: "Gwent",
  },
  {
    question: "What was the first video game to be played in space?",
    options: ["Tetris", "Pong", "Asteroids"],
    answer: "Tetris",
  },
  {
    question:
      "Which company created the Mario, Zelda, and Donkey Kong franchises?",
    options: ["Nintendo", "Sega", "Sony"],
    answer: "Nintendo",
  },
  {
    question: "What year was the original PlayStation released?",
    options: ["1994", "1995", "1996"],
    answer: "1994",
  },
  {
    question:
      "What is the name of the main character in the God of War series?",
    options: ["Kratos", "Ares", "Zeus"],
    answer: "Kratos",
  },
  {
    question: "What is the name of the primary currency in the Fallout series?",
    options: ["Caps", "Bottle Caps", "Nuka-Cola Caps"],
    answer: "Bottle Caps",
  },
  {
    question: "Which game series features a character named Solid Snake?",
    options: ["Metal Gear Solid", "Splinter Cell", "Syphon Filter"],
    answer: "Metal Gear Solid",
  },
  {
    question: "In which game do players control a character named Chell?",
    options: ["Portal", "Half-Life 2", "BioShock"],
    answer: "Portal",
  },
  {
    question:
      "What is the name of the main character in the Tomb Raider series?",
    options: ["Lara Croft", "Aloy", "Samus Aran"],
    answer: "Lara Croft",
  },
  {
    question: "Which game features the Blue Shell item?",
    options: ["Super Mario Kart", "Mario Kart 64", "Mario Kart: Double Dash!!"],
    answer: "Mario Kart 64",
  },
  {
    question: "Which game introduced the concept of 'fatality' moves?",
    options: ["Street Fighter", "Mortal Kombat", "Tekken"],
    answer: "Mortal Kombat",
  },
  {
    question: "What is the name of the island in the game 'Fortnite'?",
    options: ["Pleasant Park", "Apollo", "Athena"],
    answer: "Apollo",
  },
  {
    question:
      "In which game do players control a character named Geralt of Rivia?",
    options: ["The Witcher", "Dark Souls", "Skyrim"],
    answer: "The Witcher",
  },
  {
    question:
      "What is the name of the digital distribution platform developed by Valve?",
    options: ["Origin", "Steam", "Epic Games Store"],
    answer: "Steam",
  },
  {
    question: "Which game features a character named Master Chief?",
    options: ["Halo", "Destiny", "Call of Duty"],
    answer: "Halo",
  },
  {
    question:
      "What is the name of the kingdom in the game 'The Legend of Zelda: Breath of the Wild'?",
    options: ["Hyrule", "Termina", "Koholint"],
    answer: "Hyrule",
  },
  {
    question: "Which game features the song 'Still Alive' by Jonathan Coulton?",
    options: ["Portal", "Half-Life 2", "BioShock"],
    answer: "Portal",
  },
  {
    question:
      "What is the maximum number of controllers supported by the Sega Dreamcast?",
    options: ["2", "4", "8"],
    answer: "4",
  },
  {
    question: "Which video game character is known as 'The Yellow Dart'?",
    options: ["Pikachu", "Pac-Man", "Q*bert"],
    answer: "Pac-Man",
  },
  {
    question:
      "What was the name of the canceled Sega system that later became the Sega Dreamcast?",
    options: ["Sega Neptune", "Sega Pluto", "Sega Saturn 2"],
    answer: "Sega Neptune",
  },
  {
    question:
      "What is the default name of the protagonist in 'The Elder Scrolls V: Skyrim'?",
    options: ["Dovahkiin", "Nerevarine", "Champion of Cyrodiil"],
    answer: "Dovahkiin",
  },
  {
    question: "Which Final Fantasy game introduced the character Sephiroth?",
    options: ["Final Fantasy VI", "Final Fantasy VII", "Final Fantasy VIII"],
    answer: "Final Fantasy VII",
  },
  {
    question: "Which of these Pokémon types was introduced in Generation II?",
    options: ["Dark", "Fairy", "Dragon"],
    answer: "Dark",
  },
  {
    question:
      "What is the name of the planet in the Mass Effect series where humans first encounter the Turians?",
    options: ["Eden Prime", "Shanxi", "Ilos"],
    answer: "Shanxi",
  },
  {
    question: "Which game features a character named Marcus Fenix?",
    options: ["Halo", "Gears of War", "Mass Effect"],
    answer: "Gears of War",
  },
  {
    question: "What is the name of the protagonist in the Max Payne series?",
    options: ["Max Payne", "John Marston", "Niko Bellic"],
    answer: "Max Payne",
  },
  {
    question: "Which company developed the Crash Bandicoot series?",
    options: ["Naughty Dog", "Insomniac Games", "Sucker Punch Productions"],
    answer: "Naughty Dog",
  },
  {
    question: "In which game can players find the 'Konami Code'?",
    options: ["Gradius", "Super Mario Bros.", "Mega Man"],
    answer: "Gradius",
  },
  {
    question: "What was the first commercially available video game console?",
    options: ["Magnavox Odyssey", "Atari 2600", "Fairchild Channel F"],
    answer: "Magnavox Odyssey",
  },
  {
    question: "Which game features the fictional drug Nuke?",
    options: ["Max Payne", "RoboCop", "Duke Nukem"],
    answer: "RoboCop",
  },
  {
    question: "Which game series features a character named HK-47?",
    options: ["Star Wars: Knights of the Old Republic", "Mass Effect", "Halo"],
    answer: "Star Wars: Knights of the Old Republic",
  },
  {
    question:
      "What is the name of the main antagonist in the game 'Far Cry 3'?",
    options: ["Pagan Min", "Vaas Montenegro", "Joseph Seed"],
    answer: "Vaas Montenegro",
  },
  {
    question: "What was the first game to feature a 'New Game+' mode?",
    options: ["The Legend of Zelda", "Chrono Trigger", "Super Mario Bros."],
    answer: "Chrono Trigger",
  },
  {
    question: "Which game is set in the underwater city of Rapture?",
    options: ["BioShock", "Subnautica", "Soma"],
    answer: "BioShock",
  },
  {
    question:
      "What is the name of the main villain in the 'Silent Hill' series?",
    options: ["Pyramid Head", "Nemesis", "Mr. X"],
    answer: "Pyramid Head",
  },
  {
    question: "What was the name of the first 'Battle Royale' game?",
    options: ["PlayerUnknown's Battlegrounds", "H1Z1", "DayZ"],
    answer: "H1Z1",
  },
  {
    question: "Which video game console was released first?",
    options: ["Nintendo 64", "Sega Saturn", "Sony PlayStation"],
    answer: "Sega Saturn",
  },
  {
    question:
      "What was the first game in the 'Metroid' series to feature 3D graphics?",
    options: ["Metroid Prime", "Super Metroid", "Metroid Fusion"],
    answer: "Metroid Prime",
  },
  {
    question: "What was the first game to feature a dedicated 'jump' button?",
    options: ["Donkey Kong", "Mario Bros.", "Pitfall!"],
    answer: "Donkey Kong",
  },
  {
    question: "In the game 'Deus Ex', who is the main character?",
    options: ["JC Denton", "Adam Jensen", "Alex D"],
    answer: "JC Denton",
  },
  {
    question: "What is the name of the protagonist in the 'Infamous' series?",
    options: ["Cole MacGrath", "Delsin Rowe", "Alex Mercer"],
    answer: "Cole MacGrath",
  },
  {
    question: "Which game features a character named Nathan Drake?",
    options: ["Uncharted", "The Last of Us", "Assassin's Creed"],
    answer: "Uncharted",
  },
  {
    question:
      "Which game was the first to feature a 'sandbox' open-world design?",
    options: [
      "Grand Theft Auto III",
      "Body Harvest",
      "Elder Scrolls II: Daggerfall",
    ],
    answer: "Body Harvest",
  },
  {
    question:
      "What is the name of the main character in the 'Wolfenstein' series?",
    options: ["B.J. Blazkowicz", "Doom Slayer", "Gordon Freeman"],
    answer: "B.J. Blazkowicz",
  },
  {
    question: "What is the name of the main character in the 'Thief' series?",
    options: ["Garrett", "Corvo Attano", "Dishonored"],
    answer: "Garrett",
  },
  {
    question: "Which game featured the first appearance of Sonic the Hedgehog?",
    options: ["Sonic the Hedgehog", "Rad Mobile", "Sonic the Hedgehog 2"],
    answer: "Rad Mobile",
  },
  {
    question: "Which game was developed by Edmund McMillen and Tommy Refenes?",
    options: ["Super Meat Boy", "Braid", "Fez"],
    answer: "Super Meat Boy",
  },
];

let db;

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error("Failed to connect to the database");
    return;
  }
  db = client.db("trivia");
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  scheduleTrivia();
});

client.on("message", async (msg) => {
  if (msg.content === "!highestscore") {
    await displayHighestScore(msg.channel);
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

    const randomIndex = Math.floor(Math.random() * triviaQuestions.length);
    const currentQuestion = triviaQuestions[randomIndex];

    const options = _.shuffle(currentQuestion.options);

    const sentMessage = await triviaChannel.send(
      `Trivia question: ${currentQuestion.question}\n\n1. ${options[0]}\n2. ${options[1]}\n3. ${options[2]}`
    );

    const collector = new Discord.MessageCollector(
      sentMessage.channel,
      (m) => !m.author.bot,
      { time: 86400000 }
    );

    collector.on("collect", async (message) => {
      const userAnswer = currentQuestion.options[parseInt(message.content) - 1];
      if (
        userAnswer &&
        userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()
      ) {
        await updateUserScore(message.author.id);
        sentMessage.channel.send(
          `Correct, ${message.author}! You earned 1 point.`
        );
        collector.stop("correct_answer");
      }
    });

    collector.on("end", (collected, reason) => {
      if (reason !== "correct_answer") {
        sentMessage.channel.send(
          `Time's up! The correct answer is: ${currentQuestion.answer}`
        );
      }
    });
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

client.login(token);
