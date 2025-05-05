let worm, bluefish, tigerfish;
let playerCrayfish;
let monsterFish;

let enemies = [];

let player;
let playerFood = 100;

let boss;
let bossHealth = 100;

//#region base functions
function preLoadSprites() {
    worm = loadImage("media/sprites/worm2.5x.png");
    bluefish = loadImage("media/sprites/blueFish2.5x.png");
    tigerfish = loadImage("media/sprites/tigerFish2.5x.png");
    playerCrayfish = loadImage("media/player/crawfishPlayer2.5x.png");
    monsterFish = loadImage("media/sprites/monsterFish2.5x.png");
}
//declare ant animations
function addEnemyAnimations(enemy, number) {
    //number = 0;
    if(number == 0) {
        enemy.addAnimation("wormRight", new SpriteAnimation(worm, 0, 0, 6, 160, 80));
        enemy.addAnimation("wormLeft", new SpriteAnimation(worm, 0, 0, 6, 160, 80));
    } else if (number == 1) {
        enemy.addAnimation("blueRight", new SpriteAnimation(bluefish, 0, 0, 2, 80, 80));
        enemy.addAnimation("blueLeft", new SpriteAnimation(bluefish, 0, 0, 2, 80, 80));
    } else if (number == 2) {
        enemy.addAnimation("blueRightFast", new SpriteAnimation(bluefish, 0, 0, 2, 80, 80));
    } else if (number == 3) {
        enemy.addAnimation("tigerFishDown", new SpriteAnimation(tigerfish, 0, 0, 2, 80, 80));
    } else if (number == 4) {
        enemy.addAnimation("tigerFishUp", new SpriteAnimation(tigerfish, 0, 0, 2, 80, 80));
    }
}

function addPlayerAnimations() {
    player.addAnimation("crayfishRight", new PlayerSpriteAnimation(playerCrayfish, 0, 0, 7, 320, 160, 7));
    player.addAnimation("crayfishAttack", new SpriteAnimation(playerCrayfish, 0, 1, 2, 320, 160, 14));
    player.currentAnimation = "crayfishRight";
}

function addBossAnimations() {
    boss.addAnimation("monsterFish", new BossSpriteAnimation(monsterFish, 0, 0, 6, 640, 640, 7));
    boss.currentAnimation = "monsterFish";
}

function spawnEnemy() {
    let wormHeight = Math.floor(Math.random() * 540) + 540;
    let blueHeight = Math.floor(Math.random() * windowHeight) + 100;
    let tigerX = Math.floor(Math.random() * windowWidth);
    //console.log(height);

    let newEnemy;

    let randomNumber = Math.floor(Math.random() * 5);

    if (randomNumber == 0) {
        newEnemy = new Enemy(windowWidth, wormHeight);
        addEnemyAnimations(newEnemy, randomNumber);
        newEnemy.spawnEnemy("worm");
        enemies.push(newEnemy);
    } else if (randomNumber == 1) {
        newEnemy = new Enemy(windowWidth + 128, blueHeight)
        addEnemyAnimations(newEnemy, randomNumber);
        newEnemy.spawnEnemy("bluefish");
        enemies.push(newEnemy);
    } else if (randomNumber == 2) {
        newEnemy = new Enemy(-128, blueHeight)
        addEnemyAnimations(newEnemy, randomNumber);
        newEnemy.spawnEnemy("bluefishFast");
        enemies.push(newEnemy);
    } else if (randomNumber == 3) {
        newEnemy = new Enemy(tigerX, -128)
        addEnemyAnimations(newEnemy, randomNumber);
        newEnemy.spawnEnemy("tigerFishDown");
        enemies.push(newEnemy);
    } else if (randomNumber == 4) {
        newEnemy = new Enemy(tigerX, windowHeight + 128)
        addEnemyAnimations(newEnemy, randomNumber);
        newEnemy.spawnEnemy("tigerFishUp");
        enemies.push(newEnemy);
  }
  }

function displayPlayer() {
  player = new Player(300, 300);
  addPlayerAnimations();
  player.displayPlayer();
  

}

function displayBoss() {
  boss = new Boss(windowWidth - 640, windowHeight / 2 -320);
  addBossAnimations();
}
//#endregion base functions

//#region enemy class
  class Enemy {
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
          case "wormLeft":
            this.x -= 3;
            break;
          case "wormRight":
            this.x -= 0.5;
            break;
          case "blueLeft":
            this.x -= 4;
            break;
          case "blueRight":
            this.x -=1.5;
            break;
          case "blueRightFast":
            this.x += 3;
            break;
          case "tigerFishDown":
            this.y += 2;
            break;
          case "tigerFishUp":
            this.y -=2;
            break;
        }
        push();
        translate(this.x, this.y);
        animation.draw();
        pop();
      }
    }

    spawnEnemy(enemyType) {
        let direction = Math.floor(Math.random() * 2);
        //let flippedVert = Math.floor(Math.random() * 2)
        //console.log(direction);
        //direction = 0;
        if (enemyType === "worm") {
            if (direction == 0) {
                this.currentAnimation = "wormLeft";
            } else if (direction == 1) {
                this.currentAnimation = "wormRight";
                this.animations["wormRight"].flipped = true;
            }
        } else if (enemyType === "bluefish") {
            if (direction == 0) {
                this.currentAnimation = "blueLeft";
            } else if (direction == 1) {
                this.currentAnimation = "blueRight";
                this.animations["blueRight"].flipped = true;
                //console.log(this.animations["blueRight"].flipped ? "true" : "false");
            }
        } else if (enemyType === "bluefishFast") {
          this.currentAnimation = "blueRightFast";
          this.animations["blueRightFast"].flipped = true;
        } else if (enemyType === "tigerFishDown") {
          this.currentAnimation = "tigerFishDown";
          this.animations["tigerFishDown"].goingDown = true;
        } else if (enemyType === "tigerFishUp") {
          this.currentAnimation = "tigerFishUp";
        }
        
      }
  }
  
  class SpriteAnimation {
    constructor(spriteSheet, startU, startV, duration, sizeX, sizeY) {
      this.spriteSheet = spriteSheet;
      this.u = startU;
      this.v = startV;
      this.duration = duration;
      this.startU = startU;
      this.width = sizeX;
      this.height = sizeY;
      this.frameCount = 0;
      this.flipped = false;
      this.goingUp = false;
      this.goingDown = false;
    }
  
    draw() {
      push();
      let s = (this.flipped) ? -1 : 1;
      let t = (this.goingDown) ? -1 : 1;
      scale(s, 1);
      scale(1, t);
  
      //ensure the origins are in the apropriate location
    //   if (this.flipped) {
    //     translate(-width, 0);
    //     //console.log("flipped")
    //   }
  
      //console.log(this.u, this.v, this.width, this.height);
      image(this.spriteSheet, 0, 0, this.width, this.height, this.u * this.width, this.v * this.height, this.width, this.height);
      
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
//#endregion enemy class

//#region player class
  let attackAnimTime = 500;
  let lastAnimTime = 0;
  let logAngle = 0;
  let alreadyMoved = false;

  let lostFoodTest = 0;
  class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = 0;
      this.lastInput = 0;
      this.currentAnimation = null;
      this.animations = {};
    }
  
    addAnimation(key, animation) {
      this.animations[key] = animation;
    }

    move(joyX, joyY) {
      const DEAD_ZONE = 40;
      let SENSITIVITY = 0.03;
    
      let centerX = 512;
      let centerY = 512;
    
      let dx = joyX - centerX;
      let dy = centerY - joyY;
    
      if(this.currentAnimation === "crayfishRight") {
        // Only update position if input is valid
        if(!bossSpawned) {
          if (!Number.isNaN(dx) && Math.abs(dx) > DEAD_ZONE) {
            if(this.x > 160 && this.x < windowWidth - 160) {
              this.x += dx * SENSITIVITY;
            } else if(this.x <= 160 && dx > 0) {
              this.x += dx * SENSITIVITY;
            } else if(this.x >= windowWidth - 160 && dx < 0) {
              this.x += dx * SENSITIVITY;
            }
          }
        //console.log("x: " + this.x);
      
          if (!Number.isNaN(dy) && Math.abs(dy) > DEAD_ZONE) {
            if(this.y > 160 && this.y < windowHeight - 160) {
              this.y += dy * SENSITIVITY;
            } else if(this.y <= 160 && dy > 0) {
              this.y += dy * SENSITIVITY;
            } else if(this.y >= windowHeight - 160 && dy < 0) {
              this.y += dy * SENSITIVITY;
            }
          }
        } else if(bossSpawned) {
          if (!Number.isNaN(dx) && Math.abs(dx) > DEAD_ZONE) {
            if(this.x > 10 && this.x < boss.x - 120) {
              this.x += dx * SENSITIVITY;
            } else if(this.x <= 160 && dx > 0) {
              this.x += dx * SENSITIVITY;
            } else if(this.x >= boss.x - 120) {
              this.x = boss.x - 120;
              if(dx < 0) {
                this.x += dx * SENSITIVITY;
              }
              
            } else if(this.x >= boss.x - 120 && dx < 0) {
              this.x += dx * SENSITIVITY;
            } 
          } else if(Math.abs(dx) < DEAD_ZONE && !alreadyMoved && this.x >= boss.x - 120) { 
            this.x = boss.x - 120;
            alreadyMoved = true;
          }
        //console.log("x: " + this.x);
      
          if (!Number.isNaN(dy) && Math.abs(dy) > DEAD_ZONE) {
            if(this.y > 160 && this.y < windowHeight - 160) {
              this.y += dy * SENSITIVITY;
            } else if(this.y <= 160 && dy > 0) {
              this.y += dy * SENSITIVITY;
            } else if(this.y >= windowHeight - 160 && dy < 0) {
              this.y += dy * SENSITIVITY;
            }
          }
        }   
      }
      
    
      
      if(Math.abs(dx) > DEAD_ZONE || Math.abs(dy) > DEAD_ZONE) {
        if (!Number.isNaN(dx) && !Number.isNaN(dy)) {
          this.angle = Math.atan2(dy, dx);
          logAngle = this.angle;
          //console.log("Angle: " + this.angle);
        }
      }


      if(this.angle > PI/2 || this.angle < -PI/2) {
        //flip the sprite
        this.animations["crayfishRight"].flipped = true;
      } else {
        this.animations["crayfishRight"].flipped = false;
      }
    }
    
    draw() {
      let animation = this.animations[this.currentAnimation];
      //detect what animation to use and make the ant move at a speed proportional to the score
      if (animation) {
        // let currentAnimTime = millis();
        // if (currentAnimTime - lastAnimTime >= attackAnimTime) {
        //   this.currentAnimation = "crayfishAttack";
        //   lastAnimTime = currentAnimTime;
          
        // }
        switch (this.currentAnimation) {
          case "crayfishRight":
            this.angle = logAngle;
            break;
          case "crayfishAttack":
            this.angle = 0;

            //this.animations["crayfishRight"].flipped = false;
            console.log("crayfishAttack");
            break;
        }
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        animation.draw();
        pop();
      }
    }

    arduinoInput(input) {
      if (this.currentAnimation === "crayfishRight") {
        if (input === "1") {
          this.currentAnimation = "crayfishAttack";
    
          // Delay animation reset
          setTimeout(() => {
            if (this.currentAnimation === "crayfishAttack") {
              this.currentAnimation = "crayfishRight";
            }
          }, 500);
    
          let enemyHit = false;
    
          // Check if any enemy is hit
          for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            if (
              enemy.x >= this.x &&
              enemy.x <= this.x + 160 &&
              enemy.y >= this.y - 80 &&
              enemy.y <= this.y + 80
            ) {
              enemies.splice(i, 1);
              enemyHit = true;
            }
          }
    
          // Update food once based on result
          if (enemyHit) {
            if (playerFood > 0) {
              playerFood += 10;
              port.write("Food: " + playerFood + "\n");
            }
          } else {
            if (playerFood > 0) {
              playerFood -= 5;
              port.write("Food: " + playerFood + "\n");
              console.log("Lost Food: " + (lostFoodTest += 5));
            }
          }
    
          // Boss damage stays
          if (bossSpawned) {
            if (boss.x >= this.x && boss.x <= this.x + 160) {
              bossHealth -= 5;
            }
          }
    
          buttonStatus = "0";
        }
      }
    }
    

    displayPlayer() {
      this.arduinoInput(0);
    }
  }
  
  class PlayerSpriteAnimation {
    constructor(spriteSheet, startU, startV, duration, sizeX, sizeY, framesPerSecond) {
      this.spriteSheet = spriteSheet;
      this.u = startU;
      this.v = startV;
      this.duration = duration;
      this.startU = startU;
      this.width = sizeX;
      this.height = sizeY;
      this.frameCount = 0;
      this.flipped = false;
      this.goingUp = false;
      this.goingDown = false;
      //this.slow = false;
      this.fps = framesPerSecond;
    }
  
    draw() {
      push();
      let s = (this.flipped) ? -1 : 1;
      scale(1, s);
  
      //ensure the origins are in the apropriate location
      // if (this.flipped) {
      //   //translate(-width, 0);
      //   console.log("flipped")
      // }
      // let fps = 7;
      // if(this.slow) {
      //   fps = 14;
      // }
      //console.log("fps: " + this.fps);
      //console.log(this.frameCount);

      imageMode(CENTER);

      // if(imageMode() === CENTER) {
      //   console.log("imageMode is center");
      // } else if(imageMode() !== CENTER) {
      //   console.log("imageMode is not center");
      // }
      image(this.spriteSheet, 0, 0, this.width, this.height, this.u * this.width, this.v * this.height, this.width, this.height);
      //scale(1, 1);
      this.frameCount++;
      if (this.frameCount % this.fps === 0) {
        //console.log("going to next frame");
        this.u++;
      }

      if (this.u === this.startU + this.duration) {
        this.u = this.startU;
      }
      pop();
    }
  }
//#endregion player class

//#region boss class
  class Boss {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.angle = 0;
      this.lastInput = 0;
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
        // let currentAnimTime = millis();
        // if (currentAnimTime - lastAnimTime >= attackAnimTime) {
        //   this.currentAnimation = "crayfishAttack";
        //   lastAnimTime = currentAnimTime;
          
        // }
        switch (this.currentAnimation) {
          case "crayfishRight":
            this.angle = logAngle;
            break;
          case "crayfishAttack":
            this.angle = 0;

            //this.animations["crayfishRight"].flipped = false;
            //console.log("crayfishAttack");
            break;
        }
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        animation.draw();
        pop();
      }
    }

    arduinoInput(input) {
      if (input === "1") {
        this.currentAnimation = "crayfishAttack";
        
        setTimeout(() => {
          // Only reset if still in attack state
          if (this.currentAnimation === "crayfishAttack") {
            this.currentAnimation = "crayfishRight";
          }
        }, 500);

        for(let enemy of enemies) {
          if(enemy.x >= this.x && enemy.x <= this.x + 160 && enemy.y >= this.y - 80 && enemy.y <= this.y + 80) {
            enemies.splice(enemies.indexOf(enemy), 1);
          }
        }
      }
    }

  }
  
  class BossSpriteAnimation {
    constructor(spriteSheet, startU, startV, duration, sizeX, sizeY, framesPerSecond) {
      this.spriteSheet = spriteSheet;
      this.u = startU;
      this.v = startV;
      this.duration = duration;
      this.startU = startU;
      this.width = sizeX;
      this.height = sizeY;
      this.frameCount = 0;
      this.flipped = false;
      this.goingUp = false;
      this.goingDown = false;
      //this.slow = false;
      this.fps = framesPerSecond;
    }
  
    draw() {
      push();
      image(this.spriteSheet, 0, 0, this.width, this.height, this.u * this.width, this.v * this.height, this.width, this.height);
      //scale(1, 1);
      this.frameCount++;
      if (this.frameCount % this.fps === 0) {
        //console.log("going to next frame");
        this.u++;
      }

      if (this.u === this.startU + this.duration) {
        this.u = this.startU;
      }
      pop();
    }
  }
//#endregion boss class