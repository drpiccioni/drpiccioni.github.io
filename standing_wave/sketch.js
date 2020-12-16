
var w;                // Width of entire wave
var amplitude = 50.0; // Height of wave
//var wavelength = 50;   // How many pixels before the wave repeats
var v = 12 // fixed wave speed
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave
//var k = 2*Math.PI/wavelength;
var omega = Math.PI;
var phi = 0.5*Math.PI
var t = 0;
var dt = 0.1;
id="demo"
document.getElementById("demo").innerHTML = 5 + 6;

function setup() {

  frameRate(30);
  canvas = createCanvas(windowWidth, 0.9*windowHeight);
  canvas.parent('sketch-holder');
  w = 0.5*width;

  y = new Array(200);

  speedSlider = createSlider(0.0,2.0,0.1,0.1);
  speedSlider.parent('sketch-holder');
  speedSlider.position(20,20);
  speedSlider.class("sim-slider gray");
  speedSliderLabel = createP('&omega '+/ '+&pi; = '+speedSlider.value());
  speedSliderLabel.parent('sketch-holder');
  speedSliderLabel.position(20,speedSlider.y+10);
}

function draw() {
  background(255);
  speedSliderLabel.html('&omega '+/ '+&pi; = '+speedSlider.value());
  //t = millis()/1000;
  translate(0,height/2);

  calcWave(1);
//  renderLine(color(250,0,0),1);
  renderLine(color(0,250,0),1);

  calcWave(-1);
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
  t = t+dt;
}

function calcWave(direction) {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
//    y[x] =  Math.sin(k * x + omega * t)*amplitude;
    y[x] =  Math.sin(omega*(t + direction*x/v)+phi)*amplitude;
  }
}

function calcSum() {

  x = 0;
  for (var x = 0; x < y.length; x += 1) {
//    y[x] =  Math.sin(k * x + omega * t)*amplitude + Math.sin(k * x - omega * t)*amplitude ;
      y[x] =  Math.sin(omega*(t + x/v)+phi)*amplitude + Math.sin(omega*(t - x/v)+phi)*amplitude ;
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
