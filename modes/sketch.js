var amplitude = 50.0; // Height of wave
var omega = 0;
var phi   = 0;
var t = 0;
var dt = 0.1;
//var v = 5.93          // fine-tuning for p5 webIDE 
var v = 5.94          // fine-tuning for webpage
var tScale = 0.3      // about right on my system

function setup() {
  
  frameRate(30);
  //canvas = createCanvas(0.9*windowWidth, 0.9*windowHeight);
  canvas = createCanvas(0.7*windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  
  y = new Array(200);

  createToggles();
  
  omegaSlider = createSlider(0.1,1,0.5,0.1);
  omegaSlider.parent('sketch-holder');
  omegaSlider.position(20,20);
  omegaSlider.class("sim-slider gray");
  omegaSliderLabel = createP()
  omegaSliderLabel.position(20,omegaSlider.y+10);
 
}

function createToggles() {
  push();
  showComp = true;
  toggleCompButton = createButton('eggs');
  toggleCompButton.html('hide components');
  toggleCompButton.position(400, 20);
  toggleCompButton.mousePressed(toggleComp);
  toggleCompButton.class('sim-button')

  freeBoundary = true;
  toggleBoundaryButton = createButton('eggs');
  toggleBoundaryButton.html('fix boundaries');
  toggleBoundaryButton.class('sim-button')
  toggleBoundaryButton.position(200, 20);
  toggleBoundaryButton.mousePressed(toggleBoundary);
  
  running = true;

  toggleCompButton.parent('sketch-holder');
  toggleBoundaryButton.parent('sketch-holder');

  pop();
}

function toggleComp() {
  if (showComp) {
    showComp = false;
    toggleCompButton.html('show components');

  } else {
    showComp = true;
    toggleCompButton.html('hide components');
  }
}

function toggleBoundary() {
  if (freeBoundary) {
    freeBoundary = false;
    toggleBoundaryButton.html('liberate boundaries');
  } else {
    freeBoundary = true;
    toggleBoundaryButton.html('fix boundaries');
  }
}

function draw() {
  
  background(255);
  
  omegaSliderLabel.html('&omega;'+' / '+'&pi; = '+omegaSlider.value());
    
  omega = tScale*omegaSlider.value()*Math.PI;

  if (freeBoundary) {
    phi = 0
  } else {
    phi = Math.PI
  }

  translate(7,height/2);  // more fine-tuning
  
  if(showComp){
    calcWave(amplitude,0,omega,v,phi,t);
    renderLine(color(250,0,0),1);

    calcWave(0,amplitude,omega,v,phi,t);
    renderLine(color(0,0,250),1);

  }
  
  calcWave(amplitude,amplitude,omega,v,phi,t);
  renderLine(color(0,0,0),1);

  push();
  strokeWeight(1);
  stroke(0);
  line(0,0,width,0);
  pop();
  t = t+dt;
}

function calcWave(ampR_,ampL_,omega_,v_,phi_,t_) {
  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] =  ampR_*Math.sin(omega_*(t_ - x/v_)) +      
            ampL_*Math.sin(omega_*(t_ + x/v_)+phi_);
  }
}


function renderLine(color_,weight_) {
  //this function puts a line through all the positions defined above.
  push();
  noFill();
  stroke(color_);
  strokeWeight(weight_);
  beginShape();
  for (var x = -1; x < y.length; x += 1) {
    curveVertex(map(x,0,y.length,0,width), -y[x]);
  }
  endShape();
  pop();
}
