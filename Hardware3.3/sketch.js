let port;
let connectButton;
let LEDButton;
let potValue = 0;
let red = 0, green = 0, blue = 0;
let prevPotValue = -1; 
let isLEDOn = false;
let LEDSent = false;

function setup() {
  createCanvas(400, 400);

  connectButton = createButton('Connect');
  connectButton.mousePressed(connect);

  LEDButton = createButton('Toggle LED');
  LEDButton.mousePressed(toggle);

  port = createSerial();
}

function draw() {
  let line = port.readUntil('\n').trim();
  

  if(line.startsWith("POT: ")) {
    line = line.slice(5);
  }

  //console.log(line);
  if (line.length > 0) {
    let newValue = int(line);

    if (!isNaN(newValue) && (newValue !== prevPotValue && newValue !== prevPotValue + 1 && newValue !== prevPotValue - 1)) {
      potValue = newValue;
      prevPotValue = potValue;
      console.log(potValue);

      red = map(potValue, 0, 1023, 0, 255);
      green = map(potValue, 0, 1023, 255, 0);
      blue = 255 - abs(red - green);
    }
  }

  background(Math.floor(red), Math.floor(green), Math.floor(blue));

  // console.log("Pot Value:", potValue);
  // console.log("RGB:", red, green, blue);

  if(!LEDSent) {
    if(!isLEDOn) {
      if (port.opened()) {
        let r = Math.floor(red);
        let g = Math.floor(green);
        let b = Math.floor(blue);
        let msg = `LED: ${r},${g},${b}\n`;
        port.write(msg);
        console.log(msg);
      }
    } else {
      msg = "LED: " + 0 + "," + 0 + "," + 0 + "\n";
      port.write(msg);
    }
    LEDSent = true;
  }
  
  
}

function connect() {
  port.open('Arduino', 9600);
}

function toggle() {
  if(!isLEDOn) {
    isLEDOn = true;
  } else {
    isLEDOn = false;
  }
  LEDSent = false;
}
