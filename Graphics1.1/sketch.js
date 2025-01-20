//Konor Trosclair

function setup() {
  createCanvas(1920, 1080);
}

function draw() {
  background(255);

  //example #1
  //draw green rect with white circle and white rect
    //draw green rect
    fill(119, 243, 59);
    rect(100, 100, 400, 200);

    //draw white circle
    fill(255, 255, 255);
    ellipse(200, 200, 150, 150)

    //draw white rect
    fill(255, 255, 255);
    rect(325, 125, 150, 150);

  //example #2
  //draw opace red, blue, and green ellipses
    //draw white box
    fill(255, 255, 255);
    rect(100, 350, 400, 400);

  push();
  noStroke();
    //red circle
    fill(255, 0, 0, 75);
    ellipse(300, 500, 150, 150);

    //blue circle
    fill(0, 0, 255, 75);
    ellipse(250, 575, 150, 150);
  
    //green circle
    fill(0, 255, 0, 75);
    ellipse(350, 575, 150, 150);
  pop();

  //example #3
  //draw pac man next to ghost
  push();
  noStroke();
    //draw black rect
    fill(0, 0, 0);
    rect(600, 100, 400, 200);

    //pac-man
    fill(255, 248, 75);
    arc(700, 200, 175, 175, PI + 0.25 * PI, 0.75 * PI);

    //red ghost
    fill(234, 65, 44);
    ellipse(900, 200, 162.5, 162.5);

    rect(818.75, 200, 162.5, 87.5);

    fill(255, 255, 255); //white eyes
    ellipse(862.5, 200, 50, 50);

    ellipse(937.5, 200, 50, 50);

    fill(0, 67, 247); //blue pupils
    ellipse(862.5, 200, 25, 25);

    ellipse(937.5, 200, 25, 25);
  pop();

  //example #4
  //draw blue background with green circle and red star
    //draw blue background
    fill(0, 0, 129);
    rect(600, 350, 400, 400);

  push();
  stroke(255, 255, 255);
  strokeWeight(4);
    //draw green circle
    fill(0, 128, 0);
    ellipse(800, 550, 200, 200);

    //draw red star
    fill(255, 0, 0);
    beginShape();
      x0 = 800;
      y0 = 550;
      angle = 72;
      
      vertex(x0, y0 - 100); // Initial point (top of the circle)
      let [x1, y1] = calculateStarPoint(angle, x0, y0);
      vertex(x0 + 25, y1); // 2nd vertex
      vertex(x1, y1); // 3rd vertex
      let [x2, y2] = calculateStarPoint(2 * angle, x0, y0);
      vertex(x2 - 25, y2 - 75); // 4th vertex
      vertex(x2, y2); // 5th vertex
      let [x3, y3] = calculateStarPoint(3 * angle, x0, y0);
      vertex(x0, y3 - 50); // 6th vertex
      vertex(x3, y3); // 7th vertex
      vertex(x3 + 25, y3 - 75); // 8th vertex
      let [x4, y4] = calculateStarPoint(4 * angle, x0, y0);
      vertex(x4, y4); // 9th vertex
      vertex(x0 - 25 , y4); // 10th vertex

    endShape(CLOSE);
  pop();
}

//calculated the next point on the star by moving 72 degrees around the circle
function calculateStarPoint(curAngle, curX, curY) { 
  let angle = radians(curAngle); // Convert 72 degrees to radians
  let nextX = curX + 100 * sin(angle); // x-coordinate
  let nextY = curY - 100 * cos(angle); // y-coordinate
  return [nextX, nextY];
}
