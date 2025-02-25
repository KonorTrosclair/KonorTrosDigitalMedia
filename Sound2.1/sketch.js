//sounds
let startContext, sounds;

//buttons
let buttonDog, buttonDogToy, buttonTigerRoar, buttonPigeon;

//sliders
let delayTimeSlider, feedbackSlider, distSlider, revSlider, pitchSlider, panSlider;

let pit = new Tone.PitchShift(10).toDestination();
let rev = new Tone.Reverb(5).connect(pit);
let dist = new Tone.Distortion(0).connect(rev);
let delay = new Tone.FeedbackDelay(0, 0).connect(dist);

function preload() {
  sounds = new Tone.Players({
    dog: "media/dog.mp3",
    dogToy: "media/dogToy.mp3",
    tigerRoar: "media/tigerRoar.mp3",
    pigeon: "media/pigeon.mp3"
  }).connect(delay);
}

function setup() {
  createCanvas(400, 400);
  rev.wet.value = 0;
  pit.wet.value = 0;
  createButtons();
  createSliders();
}

function draw() {
  background(220);

  text("Delay Time: " + delayTimeSlider.value() + "s", 15, 90);
  text("Feedback: " + feedbackSlider.value(), 215, 90);
  text("Distortion: " + distSlider.value(), 15, 150);
  text("Reverb: " + revSlider.value(), 215, 150);
  text("Pitch: " + pitchSlider.value(), 15, 210);
}


function startAudioContext() {
  if (Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio context started");
  }
  else {
    console.log("Audio context already running");
  }
}

function createButtons() {
  buttonDog = createButton("Dog Bark");
  buttonDog.position(10, 30);
  buttonDog.mousePressed(() => {sounds.player("dog").start()});

  buttonDogToy = createButton("Dog Toy");
  buttonDogToy.position(110, 30);
  buttonDogToy.mousePressed(() => {sounds.player("dogToy").start()});

  buttonTigerRoar = createButton("Tiger Roar");
  buttonTigerRoar.position(210, 30);
  buttonTigerRoar.mousePressed(() => {sounds.player("tigerRoar").start()});

  buttonPigeon = createButton("Pigeon");
  buttonPigeon.position(310, 30);
  buttonPigeon.mousePressed(() => {sounds.player("pigeon").start()});
}

function createSliders() {
  delayTimeSlider = createSlider(0, 1, 0, 0.01);
  delayTimeSlider.position(10, 100);
  delayTimeSlider.input(() => {delay.delayTime.value = delayTimeSlider.value()});

  feedbackSlider = createSlider(0, 0.99, 0, 0.01);
  feedbackSlider.position(210, 100);
  feedbackSlider.input(() => {delay.feedback.value = feedbackSlider.value()});

  distSlider = createSlider(0, 10, 0, 0.01);
  distSlider.position(10, 160);
  distSlider.input(() => {dist.distortion = distSlider.value()});

  revSlider = createSlider(0, 1, 0, 0.01);
  revSlider.position(210, 160);
  revSlider.input(() => {rev.wet.value = revSlider.value()});
  
  pitchSlider = createSlider(0, 1, 0, 0.01);
  pitchSlider.position(10, 220);
  pitchSlider.input(() => {pit.wet.value = pitchSlider.value()});
}
