const bodies = new BodyStream ({
    posenet: posenet,
    architecture: modelArchitecture.ResNet50, 
    detectionType: detectionType.singleBody,
    videoElement: document.getElementById('video'), 
    samplingRate: 125
});
  
let body;
let distWrist;
let distElbow;


bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0);
    distWrist = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist));
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist);

    distElbow = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftElbow, bodyParts.rightElbow));
    body.getDistanceBetweenBodyParts(bodyParts.leftElbow, bodyParts.rightElbow)
});

let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function drawCameraIntoCanvas() {

    ctx.drawImage(video, 0, 0, video.width, video.height);
  
    if (body) {
        const leftShoulder = body.getBodyPart(bodyParts.leftShoulder);
        const rightShoulder = body.getBodyPart(bodyParts.rightShoulder);
        const leftEye = body.getBodyPart(bodyParts.leftEye);
        const rightEye = body.getBodyPart(bodyParts.rightEye);
        let colour;

        const distance = leftShoulder.position.x - rightShoulder.position.x;
        let distanceBetweenEyes = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftEye, bodyParts.rightEye));
        const distanceFromScreen = distanceCm(distanceBetweenEyes);

        console.log("Distance between shoulders: " + distance);

        if(Math.sign(distance) === -1){
            colour = "red";
        } else if (distance <= 40){
            colour = "orange";
        } else if(distance <= 80) {
            colour = "yellow";
        } else {
            colour = "green";
        }
        console.log(distanceFromScreen);
        draw(leftShoulder, colour, 20);
        draw(rightShoulder, colour, 20);
  }
  requestAnimationFrame(drawCameraIntoCanvas);
}

bodies.start();
drawCameraIntoCanvas();