// @ts-nocheck


/* ----- setup ------ */

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// sets up a bodystream with configuration object
const bodies = new BodyStream ({
      posenet: posenet,
      architecture: modelArchitecture.MobileNetV1, 
      detectionType: detectionType.singleBody, 
      videoElement: document.getElementById('video'), 
      samplingRate: 250})

let body

// when a body is detected get body data
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)
})
//calculate distance between the user and the screen through his/her eyes.
function f(x) {
    return -21.6 + (594.6724 - -21.6)/(1 + (x/8.436912)**1.09424);
}

function draw(bodyPart, bodyPartObject, colour, radius){
    if(!bodyPart){return;} //jesus fuck this syntax

    if(body.getBodyPart(bodyPartObject.string).confidenceScore >= 0.2) {
        ctx.beginPath();
        ctx.arc(bodyPart.position.x, bodyPart.position.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = colour;
        ctx.fill()
        bodyPartObject.drawn = true;
        //      bodyParts.nose.drawn = true;
        } else {bodyPartObject.drawn = false;}
}

// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {
 
  // draw the video element into the canvas
 ctx.drawImage(video, 0, 0, video.width, video.height);
  
 // draw nose and eyes
 if (body) {
     const nose = body.getBodyPart(bodyParts.nose.string)
     const leftEye = body.getBodyPart(bodyParts.leftEye.string)
     const rightEye = body.getBodyPart(bodyParts.rightEye.string)

     const leftAnkle = body.getBodyPart(bodyParts.leftAnkle.string);
     const rightAnkle = body.getBodyPart(bodyParts.rightAnkle.string);
     const leftWrist = body.getBodyPart(bodyParts.leftWrist.string);
     const rightWrist = body.getBodyPart(bodyParts.rightWrist.string);

     let distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftEye.string, bodyParts.rightEye.string));
     let cmFromScreen = Math.round(f(distance));

     draw(leftAnkle, bodyParts.leftAnkle, "cyan", 5 );
     draw(rightAnkle, bodyParts.rightAnkle, "cyan", 5);
     draw(leftWrist, bodyParts.leftWrist, "cyan", 5);
     draw(rightWrist, bodyParts.rightWrist, "cyan", 5);
     draw(leftEye,bodyParts.leftEye, "red", 5);
     draw(bodyParts.rightEye, bodyParts.rightEye, "red", 5);
    //drawLightning()


     //console.log(distance);
     //console.log("distance from screen = " + cmFromScreen + "cm");
     if(nose.position.y >= 300){
         console.log("working");
     }

    // left and right eye
   //drawStar(leftEye.position.x, leftEye.position.y, 5, 5, 13, 'yellow')
   //drawStar(rightEye.position.x, rightEye.position.y, 5, 5, 13, 'yellow')

 }
  window.requestAnimationFrame(drawCameraIntoCanvas);
}

// helper function to draw a star
function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
  let rot = Math.PI / 2 * 3
  let x = cx
  let y = cy
  let step = Math.PI / spikes

  ctx.beginPath()
  ctx.moveTo(cx, cy - outerRadius)
  for(i = 0; i < spikes; i++){
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y)
    rot += step

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y)
    rot += step
  }
  ctx.lineTo(cx,cy - outerRadius)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}


/* ----- run ------ */

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();
