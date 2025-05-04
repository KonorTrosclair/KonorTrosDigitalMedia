//let stbg1, stbg2, stbg3, stbg4;
let startLastCycleTime = 0; // The last time the image changed
let stCurrentImage = 0;

let isGameStarted = false;

function setupStartButton() {
    startButton = createButton('Start Game');
    startButton.position(windowWidth/2 - 100, windowHeight/3 + 100);
    startButton.size(200, 50);
    startButton.style('background-color', '#3498db');
    startButton.mousePressed(() => {
        isGameStarted = true;
        startButton.hide();
    });
    startButton.hide();
}

function displayBackground() {
    // Choose the current image based on the currentImage index
    let stbg = [bg1, bg2, bg3, bg4][stCurrentImage];

    image(stbg, 0, -540, 3840, 1620);

    if (millis() - startLastCycleTime > 250) {
        startLastCycleTime = millis(); // Update the time
        // Change to the next image (cycle through 0-3)
        stCurrentImage = (stCurrentImage + 1) % 4; // Cycles through 0 to 3
      }
    
}