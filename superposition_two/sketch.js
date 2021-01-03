/*
 * @name Propagate Disturbance
 * @frame 720,400
 * @description  based on code from Keith Peters. Multiple-object collision..
 */

// create two y tables, one for the left-propagating pulse, the other for the right-propagating pulse, add them and display the result.

var numEle = 110;
var eleR = [];
var eleL = [];
var eleS = [];
var dx = 10;
//var boundL = 41;
var boundR = 50;
var pAmp  = 10;
var pTail = 9;
var pHead = 5;
var pTailSlope = 4;
var pHeadSlope = 8;
var y0 = 200;
var D = dx;
var n = 0;

function setup() {
  canvas = createCanvas(0.9*windowWidth, 0.9*windowHeight);
  
  canvas.parent('sketch-holder'); // uncomment for web
  createToggles();
  initialize();
  noLoop();
}

function draw() {
  background(255);
  frameRate(3);
  propagate();
  superpose();
  display();
  n ++;
  if (n > numEle) {
  toggleRunButton.html('Sorry:</br>To watch this again you have to refresh the page.</br> Clicking this button does nothing. How to fix?');
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

  eleR[ 0] = y0 -  4;
  eleR[ 1] = y0 -  8;
  eleR[ 2] = y0 - 12;
  eleR[ 3] = y0 - 16;
  eleR[ 4] = y0 - 20;
  eleR[ 5] = y0 - 24;
  eleR[ 6] = y0 - 28;
  eleR[ 7] = y0 - 32;
  eleR[ 8] = y0 - 36;
  eleR[ 9] = y0 - 40;
  eleR[10] = y0 - 32;
  eleR[11] = y0 - 24;
  eleR[12] = y0 - 16;
  eleR[13] = y0 -  8;

  // left-moving pulse one

  eleL[37] = y0 -  8;
  eleL[38] = y0 - 16;
  eleL[39] = y0 - 24;
  eleL[40] = y0 - 32;
  eleL[41] = y0 - 40;
  eleL[42] = y0 - 36;
  eleL[43] = y0 - 32;
  eleL[44] = y0 - 28;
  eleL[45] = y0 - 24;
  eleL[46] = y0 - 20;
  eleL[47] = y0 - 16;
  eleL[48] = y0 - 12;
  eleL[49] = y0 -  8;
  eleL[50] = y0 -  4;
  
  // left-moving pulse two
    
  eleL[77] = y0 +  8;
  eleL[78] = y0 + 16;
  eleL[79] = y0 + 24;
  eleL[80] = y0 + 32;
  eleL[81] = y0 + 40;
  eleL[82] = y0 + 36;
  eleL[83] = y0 + 32;
  eleL[84] = y0 + 28;
  eleL[85] = y0 + 24;
  eleL[86] = y0 + 20;
  eleL[87] = y0 + 16;
  eleL[88] = y0 + 12;
  eleL[89] = y0 +  8;
  eleL[90] = y0 +  4;
  
}


function createToggles() {
  push();
  
  runAnimation = false;
  toggleRunButton = createButton('start');
  toggleRunButton.position(windowWidth/3, 20);
  toggleRunButton.mousePressed(toggleRun);
  toggleRunButton.class('sim-button')
  
  running = true;

  toggleRunButton.parent('sketch-holder'); // uncomment for web
  
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
  for (let i = 0; i < numEle; i++) {
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
      if (k % (dx/2) == 0) {
        fill(250, 117, 0);
      }
      else {
        fill(114, 171, 144);
      }
    }
    ellipse(k*dx, eleS[k], D, D);
  }
}


