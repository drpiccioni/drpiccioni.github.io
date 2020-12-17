
var w;                // Width of entire wave
var amplitude = 50.0; // Height of wave
//var wavelength = 50;   // How many pixels before the wave repeats
var v = 12 // fixed wave speed
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
//var k = 2*Math.PI/wavelength;
var omega = Math.PI;
var phi   = Math.PI;
var t = 0;
var dt = 0.1;

function setup() {

  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  w = 0.5*width;

  y = new Array(200);

  speedSlider = createSlider(0.0,1.0,0.0,0.1);
  speedSlider.parent('sketch-holder');
  speedSlider.position(20,20);
  speedSlider.class("sim-slider gray");
  speedSliderLabel = createP('&omega;'+ ' / '+ '&pi; = '+speedSlider.value());
  speedSliderLabel.parent('sketch-holder');
  speedSliderLabel.position(20,speedSlider.y+10);

  phiSlider = createSlider(0.0,1.0,0.0,1.0);
  phiSlider.parent('sketch-holder');
  phiSlider.position(200,20);
  phiSlider.class("sim-slider gray");
  phiSliderLabel = createP('&phi;'+ ' / '+ '&pi; = '+phiSlider.value());
  phiSliderLabel.parent('sketch-holder');
  phiSliderLabel.position(200,phiSlider.y+10);

}

function draw() {
  background(255);
  speedSliderLabel.html('&omega;'+ ' / '+ '&pi; = '+speedSlider.value());
  phiSliderLabel.html('&phi;'+ ' / '+ '&pi; = '+phiSlider.value());
  //t = millis()/1000;
  translate(0,height/2);

  calcWaveA(1);
  //renderLine(color(250,0,0),1);
  renderLine(color(0,250,0),1);

  calcWaveB(-1);
  renderLine(color(0,0,250),1);

  calcSum(1);
  renderLine(color(0,0,0),2);




  push();
  strokeWeight(1);
  stroke(0);
  line(0,height/2,width,height/2);
  pop();
  //dt = speedSlider.value();
  omega = speedSlider.value()*Math.PI;
  phi   = phiSlider.value()*Math.PI
  t = t+dt;
}

function calcWaveA(direction) {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] =  Math.sin(omega*(t - direction*x/v))*amplitude;
  }
}

function calcWaveB(direction) {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
    y[x] =  Math.sin(omega*(t - direction*x/v)+phi)*amplitude;
  }
}

function calcSum(direction) {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
      y[x] =  Math.sin(omega*(t - direction*x/v))*amplitude + Math.sin(omega*(t + direction*x/v)+phi)*amplitude;
  }

}




function renderLine(color_,weight_) {
  //this function puts a line through all the positions defined above.

  push();
  noFill();
  stroke(color_);
  strokeWeight(weight_);
  beginShape();
  for (var x = 0; x < y.length; x += 3) {
    curveVertex(map(x,0,y.length,0,width), -y[x]);
  }
  endShape();
  pop();
}
