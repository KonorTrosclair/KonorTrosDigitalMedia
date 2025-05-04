let bg1, bg2, bg3, bg4;


function preLoadBackground() {
    bg1 = loadImage('media/Background/background1.jpg');
    bg2 = loadImage('media/Background/background2.jpg');
    bg3 = loadImage('media/Background/background3.jpg');
    bg4 = loadImage('media/Background/background4.jpg');
}

function scrollBackground() {
    // Choose the current image based on the currentImage index
    let bg = [bg1, bg2, bg3, bg4][currentImage];
    let bgInverted = [bg1, bg2, bg3, bg4][currentImage];

  
    // Scroll the image to the left by decreasing x
    x -= 2; // Adjust the scroll speed here
    xInv -=2;
  
    // Draw the image at the current x position (normal)
    image(bg, x, -540, imageWidth, bg.height);
  
    // Draw the flipped image once the normal image has moved off the screen
    if (isFlipped) {
        push();
        scale(-1, 1); // Flip horizontally
        image(bgInverted, -(xInv + imageWidth), -540, imageWidth, bg.height); // Draw the flipped image
        pop(); // Reset scale to normal
    }
  
    // Check if it's time to switch images (every 250 milliseconds)
    if (millis() - lastCycleTime > 250) {
      lastCycleTime = millis(); // Update the time
      // Change to the next image (cycle through 0-3)
      currentImage = (currentImage + 1) % 4; // Cycles through 0 to 3
    }
  
    // Loop the image when it's off the canvas (normal image)
    if (x == -(imageWidth / 2)) {
      xInv = imageWidth / 2; // Reset to the start
  
      // Switch to the flipped image after the normal image has finished
      isFlipped = true;
  
    } else if (xInv == -(imageWidth / 2)) {
      x = imageWidth / 2;
  
    }
  
    if (xInv <= -imageWidth) {
      isFlipped = false;
    }
}