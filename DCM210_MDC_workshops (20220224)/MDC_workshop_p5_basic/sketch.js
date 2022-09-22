function setup() {
  // createCanvas(400, 400);
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //set 1: create a white circle
  background(0);
  
  //set the position
  const x = width / 2;
  const y = height / 2;
  
  //set diameter
  const diameter = min(width, height) * 0.5;
  
  //set drawing style: white, no stroke
  fill('white');
  noStroke();
  
  //step 2: create a animated circle
  const minDim = min(width, height);
  const time = millis() / 1000;
  const duration = 5;
  const playhead = time / duration % 1;
  const anim = sin(playhead * PI * 2) * 0.5 + 0.5;
  const thickness = minDim * 0.1 * anim;
  
  noFill();
  stroke(255);
  strokeWeight(thickness);
  
  //set 3: add noise
  //strokeWeight(thickness*random(3));
  
  //draw a circle or polygon
  //circle(x, y, diameter);
  polygon(x, y, diameter/3, 6);
}

// On window resize, update the canvas size
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
function polygon(x, y, radius, sides = 3, angle = 0) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    const a = angle + TWO_PI * (i / sides);
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}