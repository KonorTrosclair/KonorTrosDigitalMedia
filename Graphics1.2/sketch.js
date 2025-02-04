let x = 200, y = 200;
let color = 'rgb(0, 0, 0)';
function setup() {
  createCanvas(1920, 1080);

  background(240, 240, 240)

  strokeWeight(15);
  //#region Button Creation
  //red
  let red = createButton('');
  red.position(5, 5);
  red.size(50, 50);
  red.style('background-color', 'rgb(234, 65, 44)');
  red.style('border', 'none');
  red.mousePressed(() => color = 'rgb(234, 65, 44)');

  //orange
  let orange = createButton('');
  orange.position(5, 60);
  orange.size(50, 50);
  orange.style('background-color', 'rgb(239, 134, 52)');
  orange.style('border', 'none');
  orange.mousePressed(() => color = 'rgb(239, 134, 52)');
  

  //yellow
  let yellow = createButton('');
  yellow.position(5, 115);
  yellow.size(50, 50);
  yellow.style('background-color', 'rgb(255, 248, 75)');
  yellow.style('border', 'none');
  yellow.mousePressed(() => color = 'rgb(255, 248, 75)');

  //green
  let green = createButton('');
  green.position(5, 170);
  green.size(50, 50);
  green.style('background-color', 'rgb(119,243,59)');
  green.style('border', 'none');
  green.mousePressed(() => color = 'rgb(119,243,59)');

  //cyan
  let cyan = createButton('');
  cyan.position(5, 225);
  cyan.size(50, 50);
  cyan.style('background-color', 'rgb(116,249,252)');
  cyan.style('border', 'none');
  cyan.mousePressed(() => color = 'rgb(116,249,252)');

  //blue
  let blue = createButton('');
  blue.position(5, 280);
  blue.size(50, 50);
  blue.style('background-color', 'rgb(0,67,247)');
  blue.style('border', 'none');
  blue.mousePressed(() => color = 'rgb(0,67,247)');

  //magenta
  let magenta = createButton('');
  magenta.position(5, 335);
  magenta.size(50, 50);
  magenta.style('background-color', 'rgb(255,0,246)');
  magenta.style('border', 'none');
  magenta.mousePressed(() => color = 'rgb(255,0,246)');

  //brown
  let brown = createButton('');
  brown.position(5, 390);
  brown.size(50, 50);
  brown.style('background-color', 'rgb(118,67,20)');
  brown.style('border', 'none');
  brown.mousePressed(() => color = 'rgb(118,67,20)');

  //white
  let white = createButton('');
  white.position(5, 445);
  white.size(50, 50);
  white.style('background-color', 'rgb(255, 255, 255)');
  white.style('border', 'none');
  white.mousePressed(() => color = 'rgb(255, 255, 255)');

  //black
  let black = createButton('');
  black.position(5, 500);
  black.size(50, 50);
  black.style('background-color', 'rgb(0, 0, 0)');
  black.style('border', 'none');
  black.mousePressed(() => color = 'rgb(0, 0, 0)');
  //#endregion



}

function draw() {
  //background(220);

  if (mouseIsPressed) {
    mouseDragged();
  }


}

function mouseDragged() {
  stroke(color);
  line(pmouseX, pmouseY, mouseX, mouseY);
}
