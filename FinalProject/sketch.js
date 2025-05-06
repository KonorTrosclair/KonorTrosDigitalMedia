function preload() {
  preLoadSprites()
  preLoadBackground();
  preloadSoundFiles();
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  //strokeWeight(5);

  setupGameplayMusic();

  setupConnectButton();
  //setupStartButton();

  displayPlayer();
  displayBoss();


  topColor = color(65, 32, 113);
  bottomColor = color(250, 167, 122);

  imageWidth = bg1.width; 

  nextBossSpawnTime = millis() + bossAppearMinInterval + random(5000, 15000);
}

isEndScreen = false;

let playerSpawned = false;
let prevButtonState = "0";
let buttonStatus = " ";
let joyStickStatusX = " ";
let joyStickStatusY = " ";

let spawnRate = 3000; 
let lastSpawnTime = 0; 

let bossSpawnRate = 5000;
let lastBossSpawnTime = 0;
let bossSpawned = false;

let bossDisplayDuration = 5000;
let bossAppearMinInterval = 5000; 
let nextBossSpawnTime = 0;
let bossSpawnTime = 0;

let playerFoodRate = 1000;
let lastPlayerFoodTick = 0;

let screenChangeBuffer = false;
let screenChangeBufferTimer = 3000;
let screenChangeBufferTime = 0;
let restartTimer = 3;

let timer = 0;
let timerInterval = 1000;
let lastTimerUpdate = 0;

let score = 0;
let scoreMultiplier = 5;


function draw() {
  background(220); 

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
        part1Title.stop();
        part2Title.stop();
        titleMusicStarted = false;
        craydadsRetributionTheme();
        musicStarted = true;
      }
      scrollBackground(); 
      let currentRate = millis();
      let currentFoodTick = millis();
      let currentTimer = millis();
      if (currentTimer - lastTimerUpdate >= timerInterval) {
        timer++;
        if(timer % 5 === 0) {
          scoreMultiplier = scoreMultiplier / 1.25;
        }

        if(timer >= 60) {
          score = score - 10;
          if(score < 0) {
            score = 0;
          }
        }
        lastTimerUpdate = currentTimer;
      }
      

      if (currentRate - lastSpawnTime >= spawnRate) {
        spawnEnemy();
        lastSpawnTime = currentRate;
      }
      

      for (let enemy of enemies) {
         enemy.draw();
      }

      if(buttonStatus !== prevButtonState) {
        //console.log("buttopn State: " + buttonStatus);
        if(buttonStatus === "0" ) {
          setTimeout(() => {
            player.arduinoInput(buttonStatus);
          }, 500);
        } else if(buttonStatus === "1") {
          player.arduinoInput(buttonStatus);
      
        }
        //console.log("button State: " + buttonStatus);
        prevButtonState = buttonStatus;
        //console.log("prevButtonState: " + prevButtonState);
      }
      
      player.draw();
      player.move(parseInt(joyStickStatusX), parseInt(joyStickStatusY));

      let now = millis();

      
      if (!bossSpawned && now >= nextBossSpawnTime) {
        bossSpawned = true;
        sounds.player("monsterRoar").start();
        bossSpawnTime = now;

        nextBossSpawnTime = now + bossAppearMinInterval + random(5000, 15000);
      }

      
      if (bossSpawned && now - bossSpawnTime >= bossDisplayDuration) {
        bossSpawned = false;
        alreadyMoved = false;
      }

      
      if (bossSpawned) {
        boss.draw();
      }

      if(playerFood > 0) {
        if(currentFoodTick - lastPlayerFoodTick >= playerFoodRate) {
          playerFood = playerFood - 1;
          port.write("Food: " + playerFood + "\n");
          lastPlayerFoodTick = currentFoodTick;
        } 
      }

      //console.log("Food: " + playerFood);
      
      drawBossHealthBar(); 
      textSize(20);
      fill(255);
      textAlign(LEFT);
      text("Score: " + Math.floor(score), 50, 50);
      text("Time: " + timer, windowWidth - 100, 50); 

      if(bossHealth <= 0 || playerFood <= 0) {
        isEndScreen = true;
        isGameStarted = false;
        bossSpawned = false;
        enemies = [];
        nextBossSpawnTime = millis() + bossAppearMinInterval + random(5000, 15000);
        bossSpawnTime = 0;
      }

    } else {
      if(isEndScreen) {
        bossSpawned = false;
        part1.stop();
        part2.stop();
        musicStarted = false;

        let currentScreenChangeBuffer = millis();
        

        if(restartTimer <= 0) {
          screenChangeBuffer = true;
        } else {
          screenChangeBuffer = false;
        }

        if(currentScreenChangeBuffer - screenChangeBufferTime >= 1000 && restartTimer > 0) {
          
          
          restartTimer--;
          screenChangeBufferTime = currentScreenChangeBuffer;
        }
        
        endScreen();
        if(buttonStatus === "1" && screenChangeBuffer === true) {
          screenChangeBuffer = false;
          screenChangeBufferTime = 0;
          isEndScreen = false;
          buttonStatus = "0";
          score = 0;
        }
      } else {
        displayBackground();
        displayTitleScreen();
        playerFood = 100;
        bossHealth = 100;
        player.x = 170;
        player.y = windowHeight / 2;
        player.angle = 0;
        timer = 0;
        isScoreMultiplied = false;
        scoreMultiplier = 5;
        restartTimer = 3;
        if(buttonStatus === "1") {
          isGameStarted = true;
        }
      }

      if(titleMusicStarted === false) {
        titleMusic();
        titleMusicStarted = true;
      }
      
      
    }
    //console.log(buttonStatus);
    //console.log("buttonStatus: " + buttonStatus + " prevButtonState: " + prevButtonState);
    
  } else {
    connectMessage();  
  }


}

