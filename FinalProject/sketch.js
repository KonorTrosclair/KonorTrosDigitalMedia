let crayfishTest;

function preload() {
  preLoadSprites()
  
  preLoadBackground();
  
  crayfishTest = loadImage('media/sprites/crawfishPlayer.png');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //strokeWeight(5);

  setupGameplayMusic();

  setupConnectButton();
  setupStartButton();

  displayPlayer();
  displayBoss();


  topColor = color(65, 32, 113);
  bottomColor = color(250, 167, 122);

  imageWidth = bg1.width; // Set the width of the image for looping logic

  nextBossSpawnTime = millis() + bossAppearMinInterval + random(5000, 15000); // first random spawn delay
}

let playerSpawned = false;
let prevButtonState = "0";
let buttonStatus = " ";
let joyStickStatusX = " ";
let joyStickStatusY = " ";

let spawnRate = 1000; //default spawnrate (to be decreased when score increases)
let lastSpawnTime = 0; //keep track of the last spawn Time

let bossSpawnRate = 5000;
let lastBossSpawnTime = 0;
let bossSpawned = false;

let bossDisplayDuration = 5000; // 5 seconds on screen
let bossAppearMinInterval = 5000; // Minimum 5 seconds between appearances
let nextBossSpawnTime = 0;
let bossSpawnTime = 0;

let playerFoodRate = 1000;
let lastPlayerFoodTick = 0;

function draw() {
  background(220); // Optional background color

  let input = port.readUntil("\n").trim();
  let tokens = input.split(" ");
  //console.log(tokens);
  
  if(tokens[0] === "Button:")
  {
    //console.log("Token: " + tokens[1]);
    if(tokens[1] === "0" || tokens[1] === "1") {
      buttonStatus = tokens[1];
    }
  }
  if(tokens[0] === "JoyStick:") {
    joyStickStatusX = tokens[1];
    joyStickStatusY = tokens[2];
    //console.log(parseInt(tokens[1]), parseInt(tokens[2]));
  }
  
  
  drawGradientBackground(topColor, bottomColor);
  if(connected) {
    if (isGameStarted) {
      if(!musicStarted) {
        craydadsRetributionTheme();
        musicStarted = true;
      }
      scrollBackground(); // Call to scroll background

      let currentRate = millis();
      let currentFootTick = millis();

      // spawn 5 ants periodicly based on current spawnrate
      if (currentRate - lastSpawnTime >= spawnRate) {
        spawnEnemy();
        lastSpawnTime = currentRate;
      }
      

      for (let enemy of enemies) {
         enemy.draw();
      }

      if(buttonStatus !== prevButtonState) {
        // console.log("buttopn State: " + buttonStatus);
        if(buttonStatus === "0" ) {
          setTimeout(() => {
            player.arduinoInput(buttonStatus);
          }, 500);
        } else if(buttonStatus === "1") {
          player.arduinoInput(buttonStatus);
        }
        
        prevButtonState = buttonStatus;
      }
      
      player.draw();
      player.move(parseInt(joyStickStatusX), parseInt(joyStickStatusY));

      let now = millis();

      // Spawn boss at a random time after at least 5 seconds
      if (!bossSpawned && now >= nextBossSpawnTime) {
        bossSpawned = true;
        bossSpawnTime = now;

        // Schedule next spawn at some point in the future (min 5s from now + random)
        nextBossSpawnTime = now + bossAppearMinInterval + random(5000, 15000);
      }

      // Hide boss after 5 seconds
      if (bossSpawned && now - bossSpawnTime >= bossDisplayDuration) {
        bossSpawned = false;
        alreadyMoved = false;
      }

      // Draw the boss if it's currently spawned
      if (bossSpawned) {
        boss.draw();
      }
      drawBossHealthBar();  
    } else {
      displayBackground();
    }
    //console.log(buttonStatus);
    //console.log("buttonStatus: " + buttonStatus + " prevButtonState: " + prevButtonState);
    
  } else {
    connectMessage();  
  }


}

