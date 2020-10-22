const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// sets up a bodystream with configuration object
const bodies = new BodyStream ({
      posenet: posenet,
      architecture: modelArchitecture.ResNet50, 
      detectionType: detectionType.singleBody, 
      videoElement: document.getElementById('video'), 
      samplingRate: 250})

let body
// when a body is detected get body data
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//min & max values for a 3x3 grid.
let gridVals = {
    x: [0, canvas.width/3,  (canvas.width/3)  * 2, canvas.width],
    y: [0, canvas.height/3, (canvas.height/3) * 2, canvas.height],
}

//the actual grid
let grid = {
    1:{xMin: gridVals.x[0], xMax: gridVals.x[1], yMin: gridVals.y[0], yMax: gridVals.y[1], drawn: false,},
    2:{xMin: gridVals.x[1], xMax: gridVals.x[2], yMin: gridVals.y[0], yMax: gridVals.y[1], drawn: false,},
    3:{xMin: gridVals.x[2], xMax: gridVals.x[3], yMin: gridVals.y[0], yMax: gridVals.y[1], drawn: false,},
    4:{xMin: gridVals.x[0], xMax: gridVals.x[1], yMin: gridVals.y[1], yMax: gridVals.y[2], drawn: false,},
    5:{xMin: gridVals.x[1], xMax: gridVals.x[2], yMin: gridVals.y[1], yMax: gridVals.y[2], drawn: false,},
    6:{xMin: gridVals.x[2], xMax: gridVals.x[3], yMin: gridVals.y[1], yMax: gridVals.y[2], drawn: false,},
    7:{xMin: gridVals.x[0], xMax: gridVals.x[1], yMin: gridVals.y[2], yMax: gridVals.y[3], drawn: false,},
    8:{xMin: gridVals.x[1], xMax: gridVals.x[2], yMin: gridVals.y[2], yMax: gridVals.y[3], drawn: false,},
    9:{xMin: gridVals.x[2], xMax: gridVals.x[3], yMin: gridVals.y[2], yMax: gridVals.y[3], drawn: false,},
}

function drawGrid(){
    //draw horizontal lines
    for(let i = 0; i <= gridVals.y.length; i++){
        ctx.beginPath();
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 5;
        ctx.moveTo(gridVals.x[0], gridVals.y[i]);
        ctx.lineTo(gridVals.x[3], gridVals.y[i]);
        ctx.stroke();
    }

    //draw vertical lines
    for(let i = 0; i <= gridVals.x.length; i++){
        ctx.beginPath();
        ctx.strokeStyle = "cyan";
        ctx.lineWidth = 5;
        ctx.moveTo(gridVals.x[i], gridVals.y[0]);
        ctx.lineTo(gridVals.x[i], gridVals.y[3]);
        ctx.stroke();
    }
}

//calculate distance between the user and the screen through his/her eyes.
function f(x) {
    return -21.6 + (594.6724 - -21.6)/(1 + (x/8.436912)**1.09424);
}
let curve = 1;
function drawLightning(){
    let leftX = body.getBodyPart("leftWrist").position.x;
    let leftY = body.getBodyPart("leftWrist").position.y;
    let rightX = body.getBodyPart("rightWrist").position.x;
    let rightY = body.getBodyPart("rightWrist").position.y;

    if(bodyParts.leftWrist.drawn === false || bodyParts.rightWrist.drawn === false){return;}
    console.log("lightning effect on");
    ctx.beginPath();
    ctx.strokeStyle = "orange";

    let distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist.string, bodyParts.rightWrist.string));
    ctx.lineWidth = 5 + distance/25;
    console.log(distance);
    ctx.moveTo(leftX, leftY);
    /*
    ctx.lineTo(rightX-(leftX/4) + 20*curve, leftY-(rightY/4) + 20*curve);
    ctx.lineTo(rightX-(leftX/3) + 20*curve, leftY-(rightY/3) + 20*curve);
    ctx.lineTo(rightX-(leftX/2) + 20*curve, leftY-(rightY/2) + 20*curve);
    ctx.lineTo(rightX-(leftX/1.5) + 20*curve, leftY-(rightY/1.5) + 20*curve);
     */
    ctx.lineTo(rightX, rightY);
    ctx.stroke();
    curve = curve*-1;
}

function draw(bodyPart, bodyPartObj, colour, radius){
    if(!bodyPart){return;} //jesus fuck this syntax
    if(bodyPart.confidenceScore >= 0.05) {
        ctx.beginPath();
        ctx.arc(bodyPart.position.x, bodyPart.position.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = colour;
        ctx.fill()
        bodyPartObj.drawn = true;
    } else {bodyPartObj.drawn = false;
    }
}

// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {
 
  // draw the video element into the canvas
 ctx.drawImage(video, 0, 0, video.width, video.height);

 //draw nipple twister here

 // draw nose and eyes
 if (body) {
     const nose = body.getBodyPart(bodyParts.nose.string)
     const leftEye = body.getBodyPart(bodyParts.leftEye.string)
     const rightEye = body.getBodyPart(bodyParts.rightEye.string)

     const leftAnkle = body.getBodyPart(bodyParts.leftAnkle.string);
     const rightAnkle = body.getBodyPart(bodyParts.rightAnkle.string);
     const leftWrist = body.getBodyPart(bodyParts.leftWrist.string);
     const rightWrist = body.getBodyPart(bodyParts.rightWrist.string);

     let distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftEye, bodyParts.rightEye));
     let cmFromScreen = Math.round(f(distance));

     draw(leftAnkle, bodyParts.leftAnkle, "cyan", 5 );
     draw(rightAnkle, bodyParts.rightAnkle, "cyan", 5);
     draw(leftWrist, bodyParts.leftWrist, "cyan", 5);
     draw(rightWrist, bodyParts.rightWrist, "cyan", 5);
     draw(leftEye, bodyParts.leftEye, "pink", 5);
     draw(rightEye, bodyParts.rightEye, "pink", 5);
     drawGrid();
     drawLightning();
 }
  window.requestAnimationFrame(drawCameraIntoCanvas);
}


/* ----- run ------ */

// start body detecting 
bodies.start()
// draw video and body parts into canvas continously 
drawCameraIntoCanvas();
