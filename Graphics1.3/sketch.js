let lime;
let ninja;
let characterLime;
let characterNinja;
let characterVan;

function preload() {
  lime = loadImage('Media/Lime.png');
  ninja = loadImage('Media/Ninja.png');
  van = loadImage('Media/Van.png');
}


function setup() {
  createCanvas(1560, 720);

  //Lime
  characterLime = new Character(0, 0);
  characterLime.addAnimation("up", new SpriteAnimation(lime, 0, 5, 6));
  characterLime.addAnimation("down", new SpriteAnimation(lime, 6, 5, 6));
  characterLime.addAnimation("left", new SpriteAnimation(lime, 0, 0, 9));
  characterLime.addAnimation("right", new SpriteAnimation(lime, 0, 0, 9));
  characterLime.addAnimation("stand", new SpriteAnimation(lime, 0, 0, 1));
  characterLime.currentAnimation = "stand";
  

  //Ninja
  characterNinja = new Character(0, 320);
  characterNinja.addAnimation("up", new SpriteAnimation(ninja, 0, 5, 6));
  characterNinja.addAnimation("down", new SpriteAnimation(ninja, 6, 5, 6));
  characterNinja.addAnimation("left", new SpriteAnimation(ninja, 0, 0, 9));
  characterNinja.addAnimation("right", new SpriteAnimation(ninja, 0, 0, 9));
  characterNinja.addAnimation("stand", new SpriteAnimation(ninja, 0, 0, 1));
  characterNinja.currentAnimation = "stand";

  //Van
  characterVan = new Character(0, 640);
  characterVan.addAnimation("up", new SpriteAnimation(van, 0, 5, 6));
  characterVan.addAnimation("down", new SpriteAnimation(van, 6, 5, 6));
  characterVan.addAnimation("left", new SpriteAnimation(van, 0, 0, 9));
  characterVan.addAnimation("right", new SpriteAnimation(van, 0, 0, 9));
  characterVan.addAnimation("stand", new SpriteAnimation(van, 0, 0, 1));
  characterVan.currentAnimation = "stand";
  
}

function draw() {
  background(220);
  characterLime.draw();
  characterNinja.draw();
  characterVan.draw();
}

function keyPressed() {
  characterLime.keyPressed();
  characterNinja.keyPressed();
  characterVan.keyPressed();
}

function keyReleased() {
  characterLime.keyReleased();
  characterNinja.keyReleased();
  characterVan.keyReleased();
}

class Character {
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
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down":
          this.y += 2;
          break;
        case "left":
          this.x -= 2;
          break;
        case "right":
          this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch (keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations["left"].flipped = true;
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
    }
  }

  keyReleased() {
    if (this.currentAnimation === "left") {
      this.animations["stand"].flipped = true;
    } else {
      this.animations["stand"].flipped = false;
    }
    this.currentAnimation = "stand";
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
  }

  draw() {
    let s = (this.flipped) ? -1 : 1;
    scale(s, 1);

    if (this.flipped) {
      translate(-80, 0);
    }
    image(this.spriteSheet, 0, 0, 80, 80, this.u * 80, this.v * 80, 80, 80);
    
    this.frameCount++;
    if (this.frameCount % 10 === 0) {
      this.u++;
    }

    if (this.u === this.startU + this.duration) {
      this.u = this.startU;
    }
  }
}
