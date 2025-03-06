let synth1, vib, jcRev, phase, filt, rev, polySynth;

let jcRevSlider, vibFreqSlider, vibDepSlider;

let activeKey = null;
let keyPressedState = {
  'a': false,
  's': false,
  'd': false,
  'f': false,
  'g': false,
  'h': false,
  'j': false,
  'k': false,
  'l': false,
  ';': false,
  "'": false,
  'w': false,
  'e': false,
  't': false,
  'y': false,
  'u': false,
  'o': false,
  'p':false

};

let keyNotes = {
  'a': 'C5',
  's': 'D5',
  'd': 'E5',
  'f': 'F5',
  'g': 'G5',
  'h': 'C6',
  'j': 'G4',
  'k': 'A5',
  'l': 'B5',
  ';': 'C5',
  "'": 'D5',
  'w': 'C#5',
  'e': 'D#5',
  't': 'F#5',
  'y': 'G#5',
  'u': 'A#5',
  'o': 'C#6',
  'p': 'D#6'
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  vib = new Tone.Vibrato(0, 0).toDestination();
  jcRev = new Tone.JCReverb(0).connect(vib);
  filt = new Tone.Filter(1000, "peaking").connect(jcRev);
  rev = new Tone.Reverb(2).connect(filt);
  phase = new Tone.Phaser(1).connect(rev);

  polySynth = new Tone.PolySynth(Tone.Synth).connect(phase);
  polySynth.set({
    envelope: {
          attack: 0.1,
          decay: 0.1,
          sustain: 0.1,
          release: 0.8
        },
    oscillator: {
          type: 'sine'
        }
  })


  //JCReverb Slider
  jcRevSlider = createSlider(0, 0.75, 0, 0.01);
  jcRevSlider.position(560, 30);
  jcRevSlider.input(() => {jcRev.roomSize.value = jcRevSlider.value()});

  //Vibrato Frequency Slider
  vibFreqSlider = createSlider(0, 20, 0, 0.01);
  vibFreqSlider.position(560, 130);
  vibFreqSlider.input(() => {vib.frequency.value = vibFreqSlider.value()});

  //Vibrato Depth Slider
  vibDepSlider = createSlider(0, 1, 0, 0.01);
  vibDepSlider.position(560, 230);
  vibDepSlider.input(() => {vib.depth.value = vibDepSlider.value()});
}


function draw() {
  background(220);

  let keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'"];
  let sharpKeys = ['w', 'e', 't', 'y', 'u', 'o', 'p'];
  let notes = ['C5', 'D5', 'E5', 'F5', 'G5', 'A6', 'B6', 'C6', 'D6', 'E6', 'F6'];
  let sharpNotes = ['C#5', 'D#5', 'F#5', 'G#5', 'A#5', 'C#6', 'D#6'];

  for(let i = 0; i < 11; i++){
    if(keyPressedState[keys[i]]){
      fill(169, 169, 169);
    } else {
      fill(255, 255, 255);
    }
    rect(10 + (50 * i), 10, 49, 250);
    fill(0, 0, 0);
    textSize(30);
    text(keys[i], 25 + (50 * i), 290);
    text(notes[i], 15 + (50 * i), 240);
  }


  let k = 0;
  for(let i = 0; i < 10; i++){
    if(keyPressedState[sharpKeys[k]]){
      fill(169, 169, 169);
    } else {
      fill(0, 0, 0);
    }
    if(i == 2 || i == 6 || i == 9) {
      
    } else {
      rect(40 + (50 * i), 10, 40, 135);
      fill(255, 255, 255);

      textSize(30);
      text(sharpKeys[k], 49 + (50 * i), 35);

      textSize(20);
      text(sharpNotes[k], 42 + (50 * i), 135);
      k++;
    }
    
  }

  textSize(15);
  text("JCReverb: " + jcRevSlider.value(), 570, 20);

  text("Vibrato Frequency: " + vibFreqSlider.value(), 570, 120);

  text("Vibrato Depth: " + vibDepSlider.value(), 570, 220);
}

function keyPressed() {
  let pitch = keyNotes[key];
  if(pitch && key !== activeKey){
    polySynth.triggerRelease();
    activeKey = key;
    polySynth.triggerAttack(pitch);
    keyPressedState[key] = true;
  }
}

function keyReleased() {
  let pitch = keyNotes[key];
  if(pitch){
    polySynth.triggerRelease(pitch);
    activeKey = null;
    keyPressedState[key] = false;
  }
  
}
