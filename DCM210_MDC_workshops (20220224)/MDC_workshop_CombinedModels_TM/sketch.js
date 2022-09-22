/***************************************
*   DCM210 Creativity and Aesthetic of Artificial Intelligence
*   Example: Combined Models: Sound Classifier + Image Classifer
*   Input: 
*     - 3 sounds(DO, RE, MI) 
*      - webcam video
*   Output: polygon visualization, use webcam to change the shape of polygon (w/ and w/o phone)
*
***************************/
let sound_classifier;

// Label
let label = "";

// Teachable Machine model URL or local filepath of the pre-trained model locally
let soundModel = 'https://teachablemachine.withgoogle.com/models/_l_GKyLBj/';

let sound_data = [];
let last_label = "";
let current_label = "";
let display_text = "listening...";

let sides = 7;

//----- image classifier
let img_classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/s7BmjBx6H/';

// Video
let video;
let flippedVideo;
// To store the classification
let img_label = "";


function preload() {
  // Load the model
  sound_classifier = ml5.soundClassifier(soundModel + 'model.json');
  
  img_classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(500, 500);

  // Start classifying
  // The sound model will continuously listen to the microphone
  sound_classifier.classify(gotResult);
  
  
  // Start image classifying
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  classifyVideo();
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
  
  // Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(img_label, width / 2, height - 4);
  if(img_label == "WithoutPhone"){
    sides = 7;
  }else{
    sides = 4;
  }
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  
  //label = results[0].label;
  if(results[0].confidence > 0.7){
    label = results[0].label;
    console.log(label);
  }
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


//----------
// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  img_classifier.classify(flippedVideo, gotImgResult);
}

// When we get a result
function gotImgResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  
  if(results[0].confidence > 0.7){
    img_label = results[0].label;
    console.log(img_label);
  }
    
  // Classifiy again!
  classifyVideo();
}