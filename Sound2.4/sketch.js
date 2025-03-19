//set global variables
let ants = []; //array to hold ats
let score = 0, prevScore; //keep track of score
let spawnRate = 1000; //default spawnrate (to be decreased when score increases)
let lastSpawnTime = 0; //keep track of the last spawn Time
let timer = 30, restartTimer = 3, countDownTimer = 3; //set timer to start at 30
let prevTimer = 0, prevRestartTimer = 0, prevCountDownTimer = 0; 
let gameStarted = false, gameOver = false, countDownActive = false;

let timeSignatureChanged = false;

let crawlingSoundPlayed = false;

let  phase, filt, countDownSynth;

let squishSound;

let backGroundTransport, backGroundMusic, part1, percussion, percPart;

let startTransport, startMusic, startPart;


let activeNum = null;
let countDownTimerState = {
  '1': false,
  '2': false,
  '3': false
}

let countDownNotes = {
  '1': 'C5',
  '2': 'C4',
  '3': 'C4'
}

function preload() {
  Ant = loadImage('Media/Ant.png');

  sounds = new Tone.Players({
    squish: 'Media/squish.mp3',
    miss: 'Media/missed.mp3',
    crawling: 'Media/crawling.mp3'
  }).toDestination();

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  lastSpawnTime = millis() - spawnRate;


  createCanvas(windowWidth, windowHeight);
  filt = new Tone.Filter(1000, "peaking").toDestination();

  countDownSynth = new Tone.Synth(Tone.Synth).connect(filt);
  countDownSynth.set({
    envelope: {
          attack: 0.001,
          decay: 1.4,
          sustain: 0,
          release: 0.2
    },
    oscillator: {
      type: 'triangle'
    }

  });



Tone.Transport.timeSignature = [2, 4];
Tone.Transport.bpm.value = 80;  

startMusic = new Tone.PolySynth(Tone.Synth).toDestination();


startPart = new Tone.Part(((time, value) => {
  startMusic.triggerAttackRelease(value.note, value.dur, time);
}), [
  {time: 0, note: "C3", dur: "8n"},  
  {time: "0:1", note: "E3", dur: "8n"},  

  {time: "1:0", note: "C3", dur: "8n"},  
  {time: "1:0.5", note: "C3", dur: "8n"},  
  {time: "1:1", note: "G3", dur: "8n"},  

  {time: "2:0", note: "C3", dur: "8n"},  
  {time: "2:1", note: "E3", dur: "8n"},  

  {time: "3:0", note: "C3", dur: "8n"},  
  {time: "3:0.5", note: "C3", dur: "8n"},  
  {time: "3:1", note: "B3", dur: "8n"},  


]).start();

backGroundMusic = new Tone.PolySynth(Tone.Synth).toDestination();


part1 = new Tone.Part(((time, value) => {
  backGroundMusic.triggerAttackRelease(value.note, value.dur, time);
}), [
  {time: 0, note: "C3", dur: "16n"},  // Original sequence
  {time: "0:0.5", note: ["F3", "D4"], dur: "16n"},
  {time: "0:1", note: ["G3", "E4"], dur: "16n"},
  {time: "0:2", note: ["A3", "F4"], dur: "32n"},
  {time: "1:0", note: "A3", dur: "16n"},
  {time: "1:0.5", note: ["E3", "G4"], dur: "32n"},
  {time: "1:1", note: ["D3", "F4"], dur: "16n"},
  {time: "1:2", note: ["A3", "B4"], dur: "16n"},

  {time: "2:0", note: "C5", dur: "16n"},  
  {time: "2:0.5", note: ["F3", "D4"], dur: "16n"},
  {time: "2:1", note: ["G3", "E4"], dur: "16n"},
  {time: "2:2", note: ["A3", "F4"], dur: "16n"}, 
  {time: "3:0", note: "D3", dur: "16n"}, 
  {time: "3:0.5", note: ["E3", "G4"], dur: "32n"},
  {time: "3:1", note: ["C3", "F4"], dur: "16n"},  
  {time: "3:2", note: ["A3", "B4"], dur: "16n"}
]).start();


percussion = new Tone.MembraneSynth().toDestination();
percPart = new Tone.Part(((time) => {
  percussion.triggerAttackRelease("C2", "8n", time); 
}), [
  {time: "0:1", note: "C2"},
  {time: "0:1.5", note: "C2"},
  {time: "0:2", note: "F2"},
  {time: "1:1", note: "C2"},
  {time: "1:1.5", note: "C2"},
  {time: "1:2", note: "G2"},

  {time: "2:1", note: "A2"},
  {time: "2:1.5", note: "C2"},
  {time: "2:2", note: "C2"},
  {time: "3:1", note: "F2"},  
  {time: "3:1.5", note: "C2"}
]).start();

Tone.Transport.start();

startPart.loop = true;
part1.loop = true;
percPart.loop = true;
startPart.loopEnd = '4m';
part1.loopEnd = '4m';
percPart.loopEnd = '4m';

}

function draw() {
  background(220);


  if(!gameStarted) {
    textSize(48);
    text("Click to start", windowWidth/2 -150, windowHeight/3);
    text("BUG SMASHER", windowWidth/2 - 180, windowHeight/2);
    startPart.start();
    part1.stop();
    percPart.stop();

    if(mouseIsPressed) {
      countDownActive = true;
      gameStarted = true;
      startPart.stop();
    }
  }
  else if(gameStarted){
    if(gameOver) {
      endScreen();
      sounds.player("crawling").stop();
      Tone.Transport.bpm.value = 80;
      part1.stop();
      percPart.stop();
      startPart.start();
      if (mouseIsPressed && restartTimer <= 0) {
        gameStarted = false;  
        gameOver = false;
        countDownActive = true;
        score = 0;
        timer = 30;
        restartTimer = 3;
        spawnRate = 1000;
        lastSpawnTime = millis();
        prevRestartTimer = millis(); 
        activeNum = null; 
        ants = [];
        console.log("Restarting game...");
        crawlingSoundPlayed = false;
      }
    }
    else {
      if (countDownActive) {
        beginGameCountDown();
      }
      else {
        gameLoop();
        if(!crawlingSoundPlayed) {
          sounds.player("crawling").start();
          crawlingSoundPlayed = true;
        }
        console.log("game Loop");
        part1.start();
        percPart.start();
      }
    }
  }
}

function beginGameCountDown() {
  let currentCountDownTime = millis();

  if (prevRestartTimer === 0) {
    prevRestartTimer = currentCountDownTime;
  }

  let remainingTime = countDownTimer - Math.floor((currentCountDownTime - prevRestartTimer) / 1000);

  if (countDownActive && !gameOver) {
    let note = countDownNotes[remainingTime];

    if (note && remainingTime !== activeNum) {
      countDownSynth.triggerRelease(); 
      activeNum = remainingTime; 
      if (activeNum == 1) {
        countDownSynth.triggerAttack(note, "+0.3");
      } else {
        countDownSynth.triggerAttack(note);
      }
    }

    console.log("countDownActive = " + countDownActive);

    textSize(48);
    text("Game Starting in: " + remainingTime, windowWidth / 2 - 200, windowHeight / 2.5);
  }

 
  if (remainingTime <= 0) {
    countDownActive = false;
    prevRestartTimer = 0;
    activeNum = null;
  }
}


function gameLoop() {
  textSize(28);
  text("Score: " + score, 20, 40);
  text("Time: " + timer, windowWidth - 120, 40);

  let currentRate = millis();

  // spawn 5 ants periodicly based on current spawnrate
  if (currentRate - lastSpawnTime >= spawnRate && timer > 0) {
    spawnAnt();
    spawnAnt();
    spawnAnt();
    spawnAnt();
    spawnAnt();
    lastSpawnTime = currentRate;
  }

  let currentTime = millis();
  // Decrement the timer every second
  if (currentTime - prevTimer >= 1000 && timer > 0) {
    timer--;
    console.log("current bpm = " + Tone.Transport.bpm);


    if(timer > 25) {
      Tone.Transport.bpm.value = Tone.Transport.bpm.value + 1;
      console.log("New BPM: " + Tone.Transport.bpm.value);
    } else if(timer >= 20) {
      Tone.Transport.bpm.value = Tone.Transport.bpm.value + 4;
      console.log("New BPM: " + Tone.Transport.bpm.value);
    } else if(timer >= 15) {
      Tone.Transport.bpm.value = Tone.Transport.bpm.value + 7;
      console.log("New BPM: " + Tone.Transport.bpm.value);
    } else if(timer >= 10) {
      Tone.Transport.bpm.value = Tone.Transport.bpm.value + 10;
      console.log("New BPM: " + Tone.Transport.bpm.value);
    } else if(timer >= 5) {
      Tone.Transport.bpm.value = Tone.Transport.bpm.value + 13;
      console.log("New BPM: " + Tone.Transport.bpm.value);
    } else if(timer < 5) {
      Tone.Transport.bpm.value = Tone.Transport.bpm.value + 15;
      console.log("New BPM: " + Tone.Transport.bpm.value);
    }
    // Apply new BPM
    


    prevTimer = currentTime; // Update the lastTime to the currentTime
  }
  else if(timer <= 0){
      ants.splice(0, ants.length); //clear all ants when timer is out.
  }
  
  // Draw all the ants
  for (let i = 0; i < ants.length; i++) {
    ants[i].draw();
  }

  if(timer <=0 && ants.length == 0) {
    gameOver = true;
  }
}

function endScreen() {
  let currentRestartTime = millis();
  textSize(47);
  text("Game Over", windowWidth / 2 - 150, 150);
  textSize(28);
  text("Final Score: " + score, windowWidth / 2 - 120, windowHeight / 2.5);
  textSize(20);
  if(restartTimer > 0) {
    text("Click to restart in: " + restartTimer, windowWidth / 2 - 120, windowHeight / 2.5 + 50 );
  }
  else {
    text("Click to restart", windowWidth / 2 - 100, windowHeight / 2.5 + 50);
  }
    
  
  if (currentRestartTime - prevRestartTimer >= 1000 && restartTimer > 0) {
    restartTimer--;
    prevRestartTimer = currentRestartTime; // Update the lastTime to the currentTime
  }
  
}


function spawnAnt() {
  let newAnt = new Bug(random(width - 64), random(height - 64));
    addAntAnimations(newAnt);
    newAnt.spawnBug();
    ants.push(newAnt);
}
function mousePressed() {
  let hit = false;

  for (let i = ants.length - 1; i >= 0; i--) {
    if (ants[i].isSquished(mouseX, mouseY) && !ants[i].isSquishedAlready) {
      score++;
      spawnRate = 1000 - (score * 10);
      sounds.player("squish").start();

      ants[i].isSquishedAlready = true;

      console.log(ants[i].currentAnimation);

      hit = true;
      break;
    }
  }

  if(!hit) {
    sounds.player("miss").start();
  }
}

//declare ant animations
function addAntAnimations(bug) {
  bug.addAnimation("up", new SpriteAnimation(Ant, 0, 0, 4));
  bug.addAnimation("down", new SpriteAnimation(Ant, 0, 0, 4));
  bug.addAnimation("left", new SpriteAnimation(Ant, 0, 0, 4));
  bug.addAnimation("right", new SpriteAnimation(Ant, 0, 0, 4));
  bug.addAnimation("squished", new SpriteAnimation(Ant, 0, 1, 4));
}

class Bug {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    //detect what animation to use and make the ant move at a speed proportional to the score
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= score * 0.1 + 2;
          break;
        case "down":
          this.y += score * 0.1 + 2;
          break;
        case "left":
          this.x -= score * 0.1 + 2;
          break;
        case "right":
          this.x += score * 0.1 + 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  //Determine a random number and based on that spawn ant moving in its respected direction
  spawnBug() {
    let direction = Math.floor(Math.random() * 4);
    let flippedVert = Math.floor(Math.random() * 2)

    if (direction == 0) {
      this.currentAnimation = "up";
      this.animations["up"].goingUp = true;
      if(flippedVert == 0) {
        this.animations["up"].flipped = true;
      }
    } else if (direction == 1) {
      this.currentAnimation = "down";
      this.animations["down"].goingDown = true;
      if(flippedVert == 0) {
        this.animations["down"].flipped = true;
      }
    } else if (direction == 2) {
      this.currentAnimation = "left";
      this.animations["left"].flipped = true;
    } else if (direction == 3) {
      this.currentAnimation = "right";
    }
  }

  //check if ant has been clicked then squish it in the direction it was facing
  isSquished(px, py) {
    let d = dist(px, py, this.x + 32, this.y + 32);
    let index = ants.indexOf(this);

    if(ants[index].animations[ants[index].currentAnimation].flipped) {
      this.animations["squished"].flipped = true;
    } else if(ants[index].animations[ants[index].currentAnimation].goingUp) {
      this.animations["squished"].goingUp = true;
    } else if(ants[index].animations[ants[index].currentAnimation].goingDown) {
      this.animations["squished"].goingDown = true;
    }
    if(d < 32) {
      this.currentAnimation = "squished";
      
      setTimeout(() => {
        this.removeBug();
      }, 670);
      return true;
    }
    return false;
  }

  //remove the ant after its been squished
  removeBug() {
    let index = ants.indexOf(this);
    if (index !== -1) {
      ants.splice(index, 1);
    }
  }
}

class SpriteAnimation {
  constructor(spriteSheet, startU, startV, duration) {
    this.spriteSheet = spriteSheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
    this.goingUp = false;
    this.goingDown = false;
  }

  draw() {
    push();
    let s = (this.flipped) ? -1 : 1;
    scale(s, 1);

    //ensure the origins are in the apropriate location
    if (this.flipped) {
      translate(-64, 0);
    }
    if (this.goingUp) {
      rotate(-HALF_PI);
      translate(-64, 0);
    }
    if (this.goingDown) {
      rotate(HALF_PI);
      translate(0, -64);
    }


    image(this.spriteSheet, 0, 0, 64, 64, this.u * 64, this.v * 64, 64, 64);
    
    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.u++;
    }

    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
    pop();
  }
}

// //debuging to check game over screen
// function keyPressed() {
//   if (key == 'q') {
//     gameOver = true;
//   }
// }
