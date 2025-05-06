let x = 0; // Initial x position for the scrolling
let xInv = 0;
let currentImage = 0; // Tracks the current image (0 to 3)
let lastCycleTime = 0; // The last time the image changed
let isFlipped = false; // Flag to track if the image is inverted
let imageWidth; // Image width to handle looping