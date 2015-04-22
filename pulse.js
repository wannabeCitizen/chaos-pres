var xspacing = 26;    // Distance between each horizontal location
var w;                // Width of entire wave
var thetaStim = 0.0;
var thetaFollow = 0.0;      // Start angle at 0
var wStim = 3.5;
var wFollow = 2;
var amplitude = 90.0; // Height of wave
var period = 1400.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvaluesStim;  // Using an array to store height values for the wave
var yvaluesFollow;
var blinker; 
var reg;

function setup() {
  createCanvas(1400, 1000);
  blinker = color(229, 196, 0);
  reg = 255;
  w = width+16;
  dx = (TWO_PI / period) * xspacing;
  yvaluesStim = new Array(floor(w/xspacing));
  yvaluesFollow = new Array(floor(w/xspacing));
  // noLoop();
  setInterval(stim, 2000);
}

function draw() {
  background(0);
  calcWave();
  renderWave();
}

function stim() {
    reg = blinker;
    wFollow = wFollow + 2*sin(thetaStim - thetaFollow);

    setTimeout(function() { reg = 255;}, 500); 
}


// function mousePressed(){
//     reg = blinker;
//     wFollow = wFollow + .01*sin(thetaStim - thetaFollow);

//     setTimeout(function() { reg = 255;}, 500); 
// }

function calcWave() {
  // Increment theta (try different values for 
  // 'angular velocity' here
  thetaStim += wStim/100;
  thetaFollow += wFollow/100;

  // For every x value, calculate a y value with sine function
  var x = thetaStim;
  var y = thetaFollow
  for (var i = 0; i < yvaluesStim.length; i++) {
    yvaluesStim[i] = sin(x)*amplitude;
    x+=dx;
    yvaluesFollow[i] = sin(y)*amplitude;
    y+=dx;
  }
}

function renderWave() {
  noStroke();
  
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < yvaluesStim.length; x++) {
    fill(reg);
    ellipse(x*xspacing, height/4+yvaluesStim[x], 16, 16);
    fill(87, 229, 11)
    ellipse(x*xspacing, height/1.5+yvaluesFollow[x], 16, 16);
  }
}