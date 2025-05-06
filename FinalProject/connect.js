let connectButton, port;
let connected = false;

let topLeftColor 
let bottomRightColor 

function setupConnectButton() {
    connectButton = createButton('Connect');
    connectButton.position(windowWidth/2 - 100, windowHeight/3);
    connectButton.size(200, 50);
    connectButton.mousePressed(connect);
    port = createSerial();
}

function connect() {
      port.open('Arduino', 9600);

      const checkIfOpened = setInterval(() => {
        if (port.opened()) {
          connected = true;
          connectButton.hide();
          clearInterval(checkIfOpened); 
        }
      }, 100);
}

function connectMessage() {  
    fill(255, 255, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Connected to Arduino to Begin Playing', windowWidth/2, windowHeight/2 - 250);
}

function drawGradientBackground(c1, c2) {
    noFill();
    for (let i = 0; i <= width + height; i++) {
      let inter = map(i, 0, width + height, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, 0, 0, i);
    }
  }