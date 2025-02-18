//set global variables
let ants = []; //array to hold ats
let score = 0; //keep track of score
let spawnRate = 1000; //default spawnrate (to be decreased when score increases)
let lastSpawnTime = 0; //keep track of the last spawn Time
let timer = 30; //set timer to start at 30
let prevTimer = 0; //keep track of the previous time

function preload() {
  Ant = loadImage('Media/Ant.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  lastSpawnTime = millis() - spawnRate;
}

function draw() {
  background(220);

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
    prevTimer = currentTime; // Update the lastTime to the currentTime
  }
  else if(timer <= 0){
      ants.splice(0, ants.length); //clear all ants when timer is out.
  }
  
  // Draw all the ants
  for (let i = 0; i < ants.length; i++) {
    ants[i].draw();
  }

  

  
}

//spawns an ant
function spawnAnt() {
  let newAnt = new Bug(random(width - 64), random(height - 64));
    addAntAnimations(newAnt);
    newAnt.spawnBug();
    ants.push(newAnt);
}
function mousePressed() {
  for (let i = ants.length - 1; i >= 0; i--) {
    if (ants[i].isSquished(mouseX, mouseY)) {
      score++;
      spawnRate = 1000 - (score * 10);
      console.log(ants[i].currentAnimation);
      break;
    }
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
