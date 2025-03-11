let propeller, propellerTremolo, noise, noiseFilter, panner, reverb, panValues, vol, volValues, freqValues, lfo, noiseVolValues;

let plane;

let isMoving = false;

let curX = -400;
let curY = 0;

let stepRatio

let lastTime, now;

let displayText = true;

function preload() {
  plane = loadImage('media/plane.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  stepRatio = windowWidth * 0.00459;

  panValues = new Float32Array([-1, 0.5, 0, 0.5, 1]);
  volValues = new Float32Array([-12, 6, 8, 0, -24]);
  freqValues = new Float32Array([500, 1000, 1500, 1000, 1000]);
  noiseVolValues = new Float32Array([-12, -6, -4, -6, -12]);

  panner = new Tone.Panner(0).toDestination();

  vol = new Tone.Volume(0);


  propeller = new Tone.Synth({
    oscillator: { 
      type: "sawtooth" 
    },
    envelope: { 
      attack: 0.01, 
      decay: 0.3, 
      sustain: 0.5, 
      release: 0.5 
    }
  });

  propellerTremolo = new Tone.Tremolo(10, 0.8).start();

  noise = new Tone.Noise("pink").start();
  noise.volume.value = -Infinity;

  lfo = new Tone.LFO(10, 600, 800).start();
  

  noiseFilter = new Tone.Filter(500, "lowpass");



  propeller.connect(propellerTremolo);
  propellerTremolo.connect(noiseFilter);

  noise.connect(noiseFilter);

  lfo.connect(noiseFilter.frequency);

  noiseFilter.connect(vol);
  vol.connect(panner);
}

function draw() {
  background(220);

  
  if(displayText) {
    textSize(32);
    text('Click to Start', windowWidth / 2 - 100, windowHeight / 2);
  }

  image(plane, curX, 250, 400, 300);
  
  if(isMoving) {
    now = millis();
    if(now - lastTime > 500) {
      timer = millis();
      curX += stepRatio;
    }

    if(curX > windowWidth) {
      isMoving = false;
      displayText = true;
    }
    
  }
 
  
}

function mouseClicked() {
  isMoving = true;
  displayText = false;
  curX = -400;
  lastTime = millis();

  propeller.triggerAttackRelease(100, 5);

  panner.pan.setValueCurveAtTime(panValues, Tone.now(), 5);
  vol.volume.setValueCurveAtTime(volValues, Tone.now(), 5);
  noise.volume.setValueCurveAtTime(noiseVolValues, Tone.now(), 5);

  noiseFilter.frequency.setValueCurveAtTime(freqValues, Tone.now(), 5);

  
}
