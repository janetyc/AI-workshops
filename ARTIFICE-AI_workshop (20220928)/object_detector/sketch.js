/* =======================================================
 * ARTIFICE squad
 * Example: Object Detection using COCOSSD in ml5.js
 * Description: This example uses a back camera to detect 80 objects using a pre-trained models. 
 *              It uses a callback pattern to create the classifier
 * Input: Webcam video
 * Output: one label from 80 object categories
========================================================= */

let cnv;
let video;
let detector;
let detections = [];

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  //cnv.touchEnded(logData);
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
      }
    }
  };
  video = createCapture(constraints);
  
  // The line below + the videoLoadedCallback were added 
  // after the video was shot to fix compability issues.
  // ref to: https://editor.p5js.org/makerslab/sketches/xRM_R4idW
  video.elt.addEventListener('loadeddata', videoLoadedCallback);
  
  video.size(windowWidth, windowHeight);
  video.hide();
  
}

function draw() {
  image(video, 0, 0, video.width, video.height);

  for (let i = 0; i < detections.length; i++) {
    let object = detections[i];
    if(object.confidence > 0.6) {
      stroke(0, 255, 0);
      strokeWeight(4);
      noFill();
      rect(object.x, object.y, object.width, object.height);
      noStroke();
      fill(255);
      textSize(24);
      text(object.label+"("+object.confidence.toFixed(3)+")", object.x + 10, object.y + 24);
    }  
  }
}

//solve loaded video issues
function videoLoadedCallback() {
  print("Video Loaded");
  
  //call model here
  // Models available are 'cocossd', 'yolo'
  detector = ml5.objectDetector('cocossd', modelReady);
}

function modelReady() {
  detector.detect(video, gotDetections);
}

function gotDetections(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
  detector.detect(video, gotDetections);
}

function getDetectionObjects(final_detections) {
  let objectList = ""
  firstObj = true
  for(let i = 0; i < final_detections.length; i++) {
    let object = final_detections[i]
    if (object.confidence > 0.6) {
      if (!firstObj) {
        objectList += "," + final_detections[i].label
      } else {
        objectList += final_detections[i].label
        firstObj = false
      }
    }
  }
  return objectList
}

function logData() {
  //final_detections = detections
  objectList = getDetectionObjects(final_detections);

  let data= {
    time: +(new Date),
    detections: objectList
  }
  
  let jsonBody = {
    activity: 'Customize_ThingCV',
    data: JSON.stringify(data)
  }

  fetch('[DATASET_URL]', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
              'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(jsonBody)
  });
}
