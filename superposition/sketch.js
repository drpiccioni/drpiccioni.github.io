/*
 * @name Propagate Disturbance
 * @frame 720,400
 * @description  based on code from Keith Peters. Multiple-object collision..
 */

// create two y tables, one for the left-propagating pulse, the other for the right-propagating pulse, add them and display the result.

//console.log("eggs", Math.sqrt(2*2));
var numEle = 300;
var eleR = [];
var eleL = [];
var eleS = [];
var dx = 6;
var boundL = 100;
var boundR = 200;
var pTail = 11;
var pHead = 11;
var pSlope = 4;
var y0 = 200;
var D = 6;
var n = 0;
var showElements = true;
var runAnimation = true;


function setup() {
  canvas = createCanvas(0.638*windowWidth, 0.9*windowHeight);
  
  canvas.parent('sketch-holder');
    
  for (let i = 0; i < numEle; i++) {
    eleR[i] = y0;
  }
  
  for (let i = 0; i < numEle; i++) {
    eleL[i] = y0;
  }

  // pulses  

  for (let i = boundL; i < boundL+pTail; i++) {
    eleR[i] = -pSlope*(i-boundL) + y0;
  }
  
  eleR[boundL+pTail] = -pSlope*(pTail)+y0;

  for (let i = boundL+pTail+1; i < boundL+pTail+pHead; i++) {
    eleR[i] = -pSlope*(boundL+pTail+pHead-i) + y0;
  }

  for (let i = boundR-pTail-pHead; i < boundR-pTail; i++) {
    eleL[i] =  -pSlope*(i-boundR+pTail+pHead) + y0;
  }

  eleL[boundR-pTail] = -pSlope*(pTail)+y0;

  for (let i = boundR-pTail+1; i < boundR; i++) {
    eleL[i] =  -pSlope*(boundR-i) + y0;
  }
  
  // reflections

  for (let i = 0; i < pTail; i++) {
    eleR[i] = pSlope*i + y0;
  }
  
  eleR[pTail] = pSlope*(pTail)+y0;

  for (let i = pTail+1; i < pTail+pHead; i++) {
    eleR[i] = pSlope*(pTail+pHead-i) + y0;
  }

  for (let i = numEle-pTail-pHead; i < numEle-pTail; i++) {
    eleL[i] =  -pSlope*(i-numEle+pTail+pHead) + y0;
  }

  eleL[numEle-pTail] = -pSlope*(pTail)+y0;

  for (let i = numEle-pTail+1; i < numEle; i++) {
    eleL[i] =  -pSlope*(numEle-i) + y0;
  }
  
  
// query lists:  
//  for (let i = 0; i < numEle; i++) {
//    console.log("eleR",i,"=", eleR[i])
//  }

//  for (let i = 0; i < numEle; i++) {
//    console.log("eleL",i,"=", eleL[i])
//  }

  
  for (let i = 0; i < numEle; i++) {
    eleS[i] = new Ele(i*dx, y0, D, i);
  }
 
  createToggles()
  noLoop();
}


function createToggles() {
  push();

//  showElements = true;
//  toggleElementsButton = createButton('eggs');
//  toggleElementsButton.html('hide elements');
//  toggleElementsButton.position(300, 20);
//  toggleElementsButton.mousePressed(toggleElements);
//  toggleElementsButton.class('sim-button')
  
  runAnimation = false;
  toggleRunButton = createButton('eggs');
  toggleRunButton.html('start');
  toggleRunButton.position(windowWidth/2, 20);
  toggleRunButton.mousePressed(toggleRun);
  toggleRunButton.class('sim-button')
  
  running = true;

//  toggleElementButton.parent('sketch-holder');
  toggleRunButton.parent('sketch-holder');
  
  pop();
}

//function toggleElements() {
//  if (showElements) {
//    showElements = false;
//    toggleElementsButton.html('show elements');
//  }
//  else {
//    showElements = true;
//    toggleElementsButton.html('hide elements');
//  }
//}

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
  
//  if(runAnimation == false) noLoop();
//  canvas.mousePressed(function() {
//    runAnimation = !runAnimation;
//    runAnimation ? loop() : noLoop()
//  })


function draw() {
  background(255);
  frameRate(20);
  n += 1;
//  console.log("iteration",n)
  propagate()
  if(showElements) {
    eleS.forEach(eleS => {
      eleS.superpose();
      eleS.display();
    });
  }
  else {
//    eleS.forEach(eleS => {
//      eleS.superpose()
//    });
//  for (let i = 0; i < numEle; i++) {
//    console.log("eleR",i,"=", eleR[i])
//  }
//    renderLine(color(0,0,0),2)
  }
    if (n > numEle - 126) {noLoop()}
}

function propagate() {

// query lists:  
//  console.log("propgate:before propagation")

  for (let i = 0; i < numEle; i++) {
//    console.log("eleR",i,"=", eleR[i])
  }

  for (let i = 0; i < numEle; i++) {
//    console.log("eleL",i,"=", eleL[i])
  }

// propagation
  for (let i = 1; i < numEle; i++) {
      eleL[i] = eleL[i+1];
//      console.log("L shift to i=",i)
  }
  eleL[numEle-1] = y0;
  
  for (let j = numEle-1; j > 0; j--) {
//      console.log("before j =",j, "eleR[j] =", eleR[j], "eleR[j-1] =",eleR[j-1]);
//      console.log("R shift to j=",j)
      eleR[j] = eleR[j-1];
//      console.log("after j =",j, "eleR[j] =", eleR[j]);
  }    
  eleR[0] = y0;

// query lists:  
//  console.log("propagate:after propagation")
  
//  for (let i = 0; i < numEle; i++) {
//    console.log("eleR",i,"=", eleR[i])
//  }

//  for (let i = 0; i < numEle; i++) {
//    console.log("eleL",i,"=", eleL[i])
//  }

}

class Ele {
  constructor(xin, yin, din, idin, rin, lin) {
    this.x = xin;
    this.y = yin;
    this.diameter = din;
    this.id = idin;
  }
  
  superpose() {
    for (let k = 0; k < numEle; k++) {
    eleS[this.id].y = eleR[this.id] + eleL[this.id];
//    console.log("superpose:after superposition",this.id, eleR[this.id], eleL[this.id]), eleS[this.id].y;
    }
  }
  
  display() {
    noStroke();

    if (this.id < boundR) {

      if (this.id % dx == 0) {
        fill('red');
      }
    
      else {
        fill(100);
      }

    ellipse(this.x-dx*(boundL-.5), this.y, this.diameter, this.diameter);

    }
  }
}

function renderLine(color_,weight_) {
    //this function puts a line through all the positions defined above.
//    console.log("renderLine", width);
    push();
    noFill();
    stroke(color_);
    strokeWeight(weight_);
    beginShape();
    xScale = width/boundR;
    for (let x = boundL; x < boundR; x++) {
//      console.log("eleS[",x,"].y =", eleS[x].y)
      curveVertex(map(x,boundL,boundR,0,xScale*boundR), eleS[x].y);
    }
    endShape();
    pop();
  }
