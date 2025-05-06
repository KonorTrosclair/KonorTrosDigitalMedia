
let startLastCycleTime = 0;
let stCurrentImage = 0;

let isGameStarted = false;

// function setupStartButton() {
//     startButton = createButton('Start Game');
//     startButton.position(windowWidth/2 - 100, windowHeight/3 + 100);
//     startButton.size(200, 50);
//     startButton.style('background-color', '#3498db');
//     startButton.mousePressed(() => {
//         isGameStarted = true;
//         startButton.hide();
//     });
//     startButton.hide();
// }

function displayBackground() {

    let stbg = [bg1, bg2, bg3, bg4][stCurrentImage];

    image(stbg, 0, -540, 3840, 1620);

    if (millis() - startLastCycleTime > 250) {
        startLastCycleTime = millis(); 

        stCurrentImage = (stCurrentImage + 1) % 4; 
      }
    
}

function displayTitleScreen() {
    textAlign(CENTER);
    textSize(50);
    fill(253,213,8);
    text("Crawdads Retribution", windowWidth / 2, windowHeight / 2 - 200);
    textSize(20);
    text("Press the Button to Begin the Game", windowWidth / 2, windowHeight / 2 - 150);
}