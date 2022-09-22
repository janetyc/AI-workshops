/*********************************************************
*   DCM210 Creativity and Aesthetic of Artificial Intelligence
*   Example: Sound Classifier + Polygon Visualization
*   Input: DO, RE, MI
*   Output: show sound label (C, D, E) and visualize detected sound using polygon
*
*********************************************************/
let classifier;

// Label
let label = "";

// Teachable Machine model URL or local filepath of the pre-trained model locally
let soundModel = 'https://teachablemachine.withgoogle.com/models/_l_GKyLBj/';

let sound_data = [];
let last_label = "";
let current_label = "";
let display_text = "listening...";

const sides = 7;

function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(500, 500);

  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);
}

function draw() { 
  // Black background
  background(0);
  noFill();
  stroke(255);
  
  //For consistent sizing regardless of portrait/landscape
  const dim = Math.min(width, height);
  const maxRadius = dim * 0.4;
  
  //listening
  last_label = current_label;
  if(label != last_label){
    if(label == "do"){
      display_text = "C";
      current_label = "do";
      sound_data.push({"pingPong": 1, "label": "C", "color": 50});
    }else if (label == "re"){
      display_text = "D";
      current_label = "re";
      sound_data.push({"pingPong": 1, "label": "D", "color": 100});
    }else if (label == "mi"){
      display_text = "E";
      current_label = "mi";
      sound_data.push({"pingPong": 1, "label": "E", "color": 210});
    }else if (label == "Background Noise"){
      display_text = "Noise";
      current_label = "Background Noise";
    }else{
      display_text = "";
    }  
  }
  
  let rings = sound_data.length;
  for (let i = 0; i < rings; i++) {
    // Get a normalized 't' value that isn't 0
    const t = (i + 1) / rings;
    // Scale it by max radius
    const radius = t * maxRadius;
    
    // set thickness
    const thickness = sound_data[i].pingPong;
    
    // Draw line
    stroke(sound_data[i].color);
    strokeWeight(thickness);
    polygon(width / 2, height / 2, radius, sides, PI / 2);
  }
  
  // Draw the label in the canvas
  noStroke();
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(display_text, width / 2, height / 2);
  
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
}


// Draw a basic polygon (e.g., triangles, squares, pentagons, etc)
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
