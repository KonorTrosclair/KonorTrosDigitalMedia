let x = 0; // Initial x position for the scrolling
let xInv = 0;
let currentImage = 0; // Tracks the current image (0 to 3)
let lastCycleTime = 0; // The last time the image changed
let isFlipped = false; // Flag to track if the image is inverted
let imageWidth; // Image width to handle looping

let musicStarted = false;
let gameMelody, gameChorus;
let part1, part2;
let bassVibrato, lightChorus, reverb;



function setupGameplayMusic() {
  bassVibrato = new Tone.Vibrato({
    frequency: 4, // 4Hz wobble
    depth: 0.2
  });
  
  // Add light chorus
  lightChorus = new Tone.Chorus({
    frequency: 0.5,
    delayTime: 2.5,
    depth: 0.4,
    feedback: 0.1,
    wet: 0.3
  }).start();
  
  // Short reverb
  reverb = new Tone.Reverb({
    decay: 3,
    preDelay: 0.1,
    wet: 0.5
  }).toDestination();


  gameMelody = new Tone.FMSynth({
    harmonicity: 0.5, // Adds underwater texture
    modulationIndex: 2,
    oscillator: { type: "sine" },
    modulation: { type: "triangle" },
    envelope: {
      attack: 0.05,
      decay: 0.2,
      sustain: 0.5,
      release: 1
    },
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.2,
      sustain: 0.5,
      release: 0.5
    }
  });
  
  // Underwater bass synth (smooth + pulsing)
  gameChorus = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: {
      attack: 0.05,
      decay: 0.3,
      sustain: 0.4,
      release: 1
    }
  });
  
  
  // Connect background music
  gameMelody.chain(lightChorus, reverb);
  
  // Connect bass through vibrato -> chorus -> reverb
  gameChorus.chain(bassVibrato, lightChorus, reverb);
}

function craydadsRetributionTheme() {
  Tone.Transport.timeSignature = [6, 8];
  Tone.Transport.bpm.value = 100;


  // --- Main Loop (The Chase Continues) ---
  part1 = new Tone.Part((time, value) => {
    value.note.forEach((n, i) => {
      gameMelody.triggerAttackRelease(n, "16n", time + Tone.Time("16n") * i);
    });
  }, [
    { time: "0:0:0", note: ["Ab2", "Cb3", "Eb3", "Gb4"] },
    { time: "0:1:2", note: ["Gb3", "Eb3", "Cb3", "Ab4"] },
    { time: "1:0:0", note: ["Eb2", "Gb2", "Bb2", "Db4"] },
    { time: "1:1:2", note: ["Db3", "Bb2", "Gb2", "Eb4"] },
    { time: "2:0:0", note: ["B2", "D#3", "F#3", "A#4"] },
    { time: "2:1:2", note: ["A#3", "F#3", "D#3", "B4"] },
    { time: "3:0:0", note: ["F#2", "A#2", "C#2", "F4"] },
    { time: "3:1:2", note: ["Bb1", "Db2", "F2", "Ab4"] },

    { time: "4:0:0", note: ["Ab2", "Cb3", "Eb3", "Gb4"] },
    { time: "4:1:2", note: ["Gb3", "Eb3", "Cb3", "Ab4"] },
    { time: "5:0:0", note: ["Eb2", "Gb2", "Bb2", "Db4"] },
    { time: "5:1:2", note: ["Db3", "Bb2", "Gb2", "Eb4"] },
    { time: "6:0:0", note: ["B2", "D#3", "F#3", "A#4"] },
    { time: "6:1:2", note: ["A#3", "F#3", "D#3", "B4"] },
    { time: "7:0:0", note: ["F#2", "A#2", "C#2", "F4"] },
    { time: "7:1:2", note: ["Bb1", "Db2", "F2", "Ab4"] },

    // { time: "8:0:0", note: ["Ab2", "Cb3", "Eb3", "Gb4"] },
    // { time: "8:1:2", note: ["Gb3", "Eb3", "Cb3", "Ab4"] },
    // { time: "9:0:0", note: ["Eb2", "Gb2", "Bb2", "Db4"] },
    // { time: "9:1:2", note: ["Db3", "Bb2", "Gb2", "Eb4"] },
    // { time: "10:0:0", note: ["B2", "D#3", "F#3", "A#4"] },
    // { time: "10:1:2", note: ["A#3", "F#3", "D#3", "B4"] },
    // { time: "11:0:0", note: ["F#2", "A#2", "C#2", "F4"] },
    // { time: "11:1:2", note: ["Bb1", "Db2", "F2", "Ab4"] },

    { time: "8:0:0", note: ["Ab2", "Cb3", "Eb3", "Gb4"] },
    { time: "8:1:2", note: ["Ab4"] },
    { time: "9:0:0", note: ["Eb2", "Gb2", "Bb2", "Db4"] },
    { time: "9:1:2", note: ["Eb4"] },
    { time: "10:0:0", note: ["B2", "D#3", "F#3", "A#4"] },
    { time: "10:1:2", note: ["B4"] },
    { time: "11:0:0", note: ["F#2", "A#2", "C#2", "F4"] },
    { time: "11:1:2", note: ["Bb1", "Db2", "F2", "Ab4"] },

    { time: "12:0:0", note: ["Ab2", "Cb3", "Eb3", "Gb4"] },
    { time: "12:1:2", note: ["Ab4"] },
    { time: "13:0:0", note: ["Eb2", "Gb2", "Bb2", "Db4"] },
    { time: "13:1:2", note: ["Eb4"] },
    { time: "14:0:0", note: ["B2", "D#3", "F#3", "A#4"] },
    { time: "14:1:2", note: ["B4"] },
    { time: "15:0:0", note: ["F#2", "A#2", "C#2", "F4"] },
    { time: "15:1:2", note: ["Bb1", "Db2", "F2", "Ab4"] },

  ]).start();
  part1.loop = true;
  part1.loopEnd = "16:0:0";

  part2 = new Tone.Part((time, value) => {
    value.note.forEach((n) => {
      gameChorus.triggerAttackRelease(n, value.dur, time);
    });
  }, [
    { time: "0:0:0", note: ["Ab4"], dur: "1m" },
    { time: "1:0:0", note: ["Eb4"], dur: "1m" },
    { time: "2:0:0", note: ["B4"], dur: "1m" },
    { time: "3:0:0", note: ["Ab4"], dur: "1m" },
  ]).start();
  gameChorus.volume.value = -12;
  part2.loop = true;
  part2.loopEnd = "4:0:0";


  Tone.loaded().then(() => {
    Tone.Transport.start();
  });
}
  

  