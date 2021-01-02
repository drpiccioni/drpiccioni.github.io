/*
 * @name Propagate Disturbance
 * @frame 720,400
 * @description  based on code from Keith Peters. Multiple-object collision..
 */

// create two y tables, one for the left-propagating pulse, the other for the right-propagating pulse, add them and display the result.

var numEle = 157;
var eleR = [];
var eleL = [];
var eleS = [];
var dx = 10;
//var boundL = 41;
var boundR = 90;
var pTail = 10;
var pHead = 5;
var pTailSlope = 3;
var pHeadSlope = 6;
var y0 = 200;
var D = dx;
var n = 0;

function setup() {
  canvas = createCanvas(0.9*windowWidth, 0.9*windowHeight);
  
//  canvas.parent('sketch-holder'); // uncomment for web
  createToggles();
  initialize();
  noLoop();
}

function draw() {
  background(255);
  frameRate(6);
  propagate();
  superpose();
  display();
  n ++;
  if (n > numEle) {
  toggleRunButton.html('Sorry</br>To watch this again you have to restart the program</br> Clicking this button does nothing');
  }
}

function initialize() {
  // initialize medium
  for (let i = 0; i < numEle; i++) {
    eleR[i] = y0;
  }
  
  for (let i = 0; i < numEle; i++) {
    eleL[i] = y0;
  }

  // right-moving pulses  

   for (let i = 0; i < pTail; i++) {
    eleR[i] = -pTailSlope*(i+1) + y0;
  }
  
  eleR[pTail] = -pTailSlope*(pTail)+y0;

  for (let i = pTail+1; i < pTail+pHead; i++) {
    eleR[i] = -pHeadSlope*(pTail+pHead-i) + y0;
  }
  
// for (let i = boundL; i < boundL+pTail; i++) {
//    eleR[i] = -pTailSlope*(i-boundL) + y0;
//  }
  
//  eleR[boundL+pTail] = -pTailSlope*(pTail)+y0;

//  for (let i = boundL+pTail+1; i < boundL+pTail+pHead; i++) {
//    eleR[i] = -pHeadSlope*(boundL+pTail+pHead-i) + y0;
//  }

  // left-moivng pulses


  for (let i = boundR-pTail-pHead; i < boundR-pTail; i++) {
    eleL[i] =  -pHeadSlope*(i-boundR+pTail+pHead) + y0;
  }

  eleL[boundR-pTail] = -pTailSlope*(pTail)+y0;

  for (let i = boundR-pTail+1; i < boundR; i++) {
    eleL[i] =  -pTailSlope*(boundR-i) + y0;
  }
  for (let i = numEle-pTail-pHead; i < numEle-pTail; i++) {
    eleL[i] =  pHeadSlope*(i-numEle+pTail+pHead) + y0;
  }

  eleL[numEle-pTail] = pTailSlope*(pTail)+y0;

  for (let i = numEle-pTail+1; i < numEle; i++) {
    eleL[i] =  pTailSlope*(numEle-i) + y0;
  }
  
}

function createToggles() {
  push();
  
  runAnimation = false;
  toggleRunButton = createButton('start');
  toggleRunButton.position(windowWidth/2, 20);
  toggleRunButton.mousePressed(toggleRun);
  toggleRunButton.class('sim-button')
  
  running = true;

//  toggleRunButton.parent('sketch-holder'); // uncomment for web
  
  pop();
}

function toggleRun() {
  if (runAnimation) {
    runAnimation = false;
    toggleRunButton.html('resume');
    noLoop();
  }
  
  else {
    runAnimation = true;
    toggleRunButton.html('freeze');
    loop();
  }
}
  
function propagate() {
  for (let i = 1; i < numEle; i++) {
      eleL[i] = eleL[i+1];
  }
  eleL[numEle-1] = y0;
  
  for (let j = numEle-1; j > 0; j--) {
      eleR[j] = eleR[j-1];
  }    
  eleR[0] = y0;
}

function superpose() {
  for (let k = 0; k < numEle; k++) {
   eleS[k] = eleR[k] + eleL[k];
    }
}

function display() {
  for (let k = 0; k < numEle; k++) {
    noStroke();
    if (k >= 0) {
      if (k % dx == 0) {
        fill(250, 117, 0);
      }
      else {
        fill(114, 171, 144);
      }
    }
    ellipse(k*dx, eleS[k], D, D);
  }
}


