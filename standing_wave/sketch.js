var amplitude = 50.0; // Height of wave
var omega = 0;
var phi   = 0;
var t = 0;
var dt = 0.1;
var v = 5.92         // fine-tuning by the Almighty
var tScale = 0.3    // about right on my system

function setup() {
  
  frameRate(30);
  canvas = createCanvas(0.7*windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  y = new Array(200);
    
  omegaSlider = createSlider(0.1,1,0.5,0.1);
  omegaSlider.parent('sketch-holder');
  omegaSlider.position(20,20);
  omegaSlider.class("sim-slider gray");
  omegaSliderLabel = createP()
  omegaSliderLabel.position(20,omegaSlider.y+10);
 
  phiSlider = createSlider(0,1,1,1);
  phiSlider.parent('sketch-holder');
  phiSlider.position(200,20);
  phiSlider.class("sim-slider gray");
  phiSliderLabel = createP()
  phiSliderLabel.position(200,phiSlider.y+10);

  compSlider = createSlider(0,1,1,1);
  compSlider.parent('sketch-holder');
  compSlider.position(400,20);
  compSlider.class("sim-slider gray");
  compSliderLabel = createP();
  compSliderLabel.position(400,compSlider.y+10);

}

function draw() {
  
  background(255);
  
  omegaSliderLabel.html('&omega;'+' / '+'&pi; = '+omegaSlider.value());
  
  phiSliderLabel.html('&phi;'+ ' / '+'&pi; = '+phiSlider.value());
  
  compSliderLabel.html('components');
  
  omega = tScale*omegaSlider.value()*Math.PI;

  phi   = phiSlider.value()*Math.PI

  showcomp = compSlider.value()

  translate(7,height/2);  // more fine-tuning
  
  if(showcomp){
    calcWave(1,amplitude,0,omega,v,phi,t);
    renderLine(color(250,0,0),1);

    calcWave(-1,0,amplitude,omega,v,phi,t);
    renderLine(color(0,0,250),1);

  }
  
  calcWave(1,amplitude,amplitude,omega,v,phi,t);
  renderLine(color(0,0,0),1);

  push();
  strokeWeight(1);
  stroke(0);
  line(0,0,width,0);
  pop();
  t = t+dt;
}

function calcWave(direction_,ampA_,ampB_,omega_,v_,phi_,t_) {
  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] =  ampA_*Math.sin(omega_*(t_ - direction_*x/v_)) +      
            ampB_*Math.sin(omega_*(t_ + direction_*x/v_)+phi_);
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
