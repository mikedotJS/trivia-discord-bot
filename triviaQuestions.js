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
  {
    question: "What was the first console to introduce a built-in DVD player?",
    options: ["PlayStation 2", "Xbox", "Nintendo GameCube"],
    answer: "PlayStation 2",
  },
  {
    question: "In which game was the character Solid Snake first introduced?",
    options: ["Metal Gear", "Metal Gear 2: Solid Snake", "Metal Gear Solid"],
    answer: "Metal Gear",
  },
  {
    question:
      "Which racing game series features the famous blue hedgehog Sonic?",
    options: ["Mario Kart", "Gran Turismo", "Sonic & All-Stars Racing"],
    answer: "Sonic & All-Stars Racing",
  },
  {
    question:
      "What is the name of the planet where Doomguy fights demons in Doom II?",
    options: ["Earth", "Mars", "Phobos"],
    answer: "Earth",
  },
  {
    question:
      "Which game is known for its endless procedural generation of worlds?",
    options: ["No Man's Sky", "Minecraft", "Terraria"],
    answer: "No Man's Sky",
  },
  {
    question:
      "In the game 'Portal 2', which type of gel gives the player the ability to leap farther?",
    options: ["Repulsion Gel", "Conversion Gel", "Propulsion Gel"],
    answer: "Propulsion Gel",
  },
  {
    question:
      "Which classic arcade game features a protagonist named Billy Lee?",
    options: ["Donkey Kong", "Galaga", "Double Dragon"],
    answer: "Double Dragon",
  },
  {
    question:
      "In the game 'Bioshock Infinite', what is the name of the sentient songbird that protects Elizabeth?",
    options: ["The Crow", "The Raven", "Songbird"],
    answer: "Songbird",
  },
  {
    question:
      "In the game 'Mass Effect 3', what is the name of the weapon that can fire a beam of plasma that can obliterate enemies?",
    options: ["M-920 Cain", "M-13 Raptor", "M-660 Vindicator"],
    answer: "M-920 Cain",
  },
  {
    question:
      "In the game 'Metal Gear Solid V: The Phantom Pain', what is the name of the landlocked country that serves as the setting for the game's events?",
    options: ["Iraq", "Syria", "Afghanistan"],
    answer: "Afghanistan",
  },
  {
    question: "Which game features the 'VATS' combat system?",
    options: ["Deus Ex", "Fallout 3", "Mass Effect"],
    answer: "Fallout 3",
  },
  {
    question: "Which game series features the 'S.T.A.L.K.E.R.' acronym?",
    options: ["Half-Life", "Metro", "S.T.A.L.K.E.R."],
    answer: "S.T.A.L.K.E.R.",
  },
  {
    question: "What is the name of the alien race in the game 'Crysis'?",
    options: ["Ceph", "Vortigaunts", "Combine"],
    answer: "Ceph",
  },
  {
    question: "Which game was developed by Team Ico?",
    options: ["Shadow of the Colossus", "Ico", "Both"],
    answer: "Both",
  },
  {
    question:
      "In the game 'Dark Souls', what is the name of the first boss players encounter?",
    options: ["Asylum Demon", "Taurus Demon", "Capra Demon"],
    answer: "Asylum Demon",
  },
  {
    question: "Which game is set in the post-apocalyptic world of Pandora?",
    options: ["Borderlands", "Fallout", "Mad Max"],
    answer: "Borderlands",
  },
  {
    question:
      "In 'The Elder Scrolls IV: Oblivion', which Daedric Prince is known as the 'Mad God'?",
    options: ["Sheogorath", "Molag Bal", "Sanguine"],
    answer: "Sheogorath",
  },
  {
    question:
      "In 'Super Mario 64', how many Power Stars are required to access the final boss?",
    options: ["70", "120", "100"],
    answer: "70",
  },
  {
    question: "What was the first 'Call of Duty' game set in World War II?",
    options: ["Call of Duty", "Call of Duty: World at War", "Call of Duty 2"],
    answer: "Call of Duty",
  },
  {
    question: "Which game features the planet Tallon IV?",
    options: ["Metroid Prime", "Mass Effect", "Halo"],
    answer: "Metroid Prime",
  },
  {
    question: "Which game features the time-manipulating 'Dagger of Time'?",
    options: ["Prince of Persia: The Sands of Time", "Braid", "Quantum Break"],
    answer: "Prince of Persia: The Sands of Time",
  },
  {
    question: "In 'Overwatch', which character can build a teleporter?",
    options: ["Symmetra", "Torbjörn", "Winston"],
    answer: "Symmetra",
  },
  {
    question: "What is the name of the fictional city in the game 'Bully'?",
    options: ["Bullworth", "New Coventry", "Blue Skies"],
    answer: "Bullworth",
  },
  {
    question: "Which game features a protagonist named Lee Everett?",
    options: ["The Walking Dead: The Game", "The Last of Us", "Left 4 Dead"],
    answer: "The Walking Dead: The Game",
  },
  {
    question: "Which game features a character named Alex Mercer?",
    options: ["Prototype", "Infamous", "Dishonored"],
    answer: "Prototype",
  },
  {
    question: "What is the name of the AI companion in the 'Halo' series?",
    options: ["Cortana", "GLaDOS", "EDI"],
    answer: "Cortana",
  },
  {
    question:
      "Which classic video game requires players to rotate and arrange falling blocks?",
    options: ["Tetris", "Dr. Mario", "Columns"],
    answer: "Tetris",
  },
  {
    question:
      "In 'The Elder Scrolls III: Morrowind', what is the name of the primary antagonist?",
    options: ["Dagoth Ur", "Mehrunes Dagon", "Alduin"],
    answer: "Dagoth Ur",
  },
  {
    question:
      "What is the name of the island in 'The Legend of Zelda: The Wind Waker'?",
    options: ["Outset Island", "Koholint Island", "Dragon Roost Island"],
    answer: "Outset Island",
  },
  {
    question:
      "What is the primary objective of the game 'Sid Meier's Civilization'?",
    options: [
      "Conquer the world",
      "Establish a successful colony",
      "Escape from a post-apocalyptic world",
    ],
    answer: "Conquer the world",
  },
  {
    question:
      "Which game series features a character named Guybrush Threepwood?",
    options: ["Monkey Island", "Grim Fandango", "Broken Sword"],
    answer: "Monkey Island",
  },
  {
    question: "Which game features a boss called Psycho Mantis?",
    options: ["Metal Gear Solid", "Resident Evil", "Silent Hill"],
    answer: "Metal Gear Solid",
  },
  {
    question: "What is the name of the protagonist in 'Dishonored'?",
    options: ["Corvo Attano", "Daud", "Emily Kaldwin"],
    answer: "Corvo Attano",
  },
  {
    question:
      "Which game features a post-apocalyptic world where players can use VATS?",
    options: ["Fallout", "Metro 2033", "Rage"],
    answer: "Fallout",
  },
  {
    question: "Which game features a character named Senua?",
    options: [
      "Hellblade: Senua's Sacrifice",
      "Sekiro: Shadows Die Twice",
      "A Plague Tale: Innocence",
    ],
    answer: "Hellblade: Senua's Sacrifice",
  },
  {
    question: "What is the name of the main character in 'Fable'?",
    options: [
      "The Hero of Oakvale",
      "The Hero of Bowerstone",
      "The Hero of Albion",
    ],
    answer: "The Hero of Oakvale",
  },
  {
    question:
      "Which game features a character named Desmond Miles as the main protagonist?",
    options: ["Assassin's Creed", "Prince of Persia", "Watch Dogs"],
    answer: "Assassin's Creed",
  },
  {
    question: "Which game features a character named Ryo Hazuki?",
    options: ["Shenmue", "Yakuza", "Sleeping Dogs"],
    answer: "Shenmue",
  },
  {
    question:
      "In 'StarCraft', which faction is known for its advanced technology and psionic abilities?",
    options: ["Terran", "Zerg", "Protoss"],
    answer: "Protoss",
  },
];
exports.triviaQuestions = triviaQuestions;
