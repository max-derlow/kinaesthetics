const bodies = new BodyStream ({
    posenet: posenet,
    architecture: modelArchitecture.ResNet50, 
    detectionType: detectionType.singleBody,
    videoElement: document.getElementById('video'), 
    samplingRate: 250
});
  
let body;

bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0);
});


let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");


function drawCameraIntoCanvas() {
    ctx.drawImage(video, 0, 0, video.width, video.height);

    if (body) {
        let colour;

        const leftShoulder = body.getBodyPart(bodyParts.leftShoulder);
        const rightShoulder = body.getBodyPart(bodyParts.rightShoulder);
        const leftEye = body.getBodyPart(bodyParts.leftEye);
        const rightEye = body.getBodyPart(bodyParts.rightEye);
        const leftEar = body.getBodyPart(bodyParts.leftEar);
        const rightEar = body.getBodyPart(bodyParts.rightEar);
        const nose = body.getBodyPart(bodyParts.nose);
        let distanceBetweenEyes = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftEye, bodyParts.rightEye));
        const distanceFromScreen = distanceCm(distanceBetweenEyes);
        const distanceBetweenShoulders = leftShoulder.position.x - rightShoulder.position.x;
        //ellipseRadiusY = distanceBetweenShoulders;
        if(Math.sign(distanceBetweenShoulders) === -1){
            colour = "red";
        } else if (distanceBetweenShoulders <= 40){
            colour = "orange";
        } else if(distanceBetweenShoulders <= 80) {
            colour = "yellow";
        } else {
            colour = "green";
        }
        draw(leftShoulder, colour, 20);
        draw(rightShoulder, colour, 20);

        const turnHeadLeft = nose.position.x - leftEar.position.x;
        const turnHeadRight = nose.position.x - rightEar.position.x;

        if(Math.sign(turnHeadLeft) === 1){
            colour = "red";
        } else if (turnHeadLeft >= -10){
            colour = "orange";
        } else if(turnHeadLeft >= -30) {
            colour = "yellow";
        } else {
            colour = "green";
        }
       draw(leftEar, colour, 20);

        if(Math.sign(turnHeadRight) === -1){
            colour = "red";
        } else if (turnHeadRight <= -10){
            colour = "orange";
        } else if(turnHeadRight <= 30) {
            colour = "yellow";
        } else {
            colour = "green";
        }
        draw(rightEar, colour, 20);


        const sideTiltHeadLeft = nose.position.y - leftEar.position.y;
        const sideTiltHeadRight = nose.position.y - rightEar.position.y;

        if(sideTiltHeadLeft <= -50){
            colour = "red";
        } else if (sideTiltHeadLeft <= -35){
            colour = "orange";
        } else if(sideTiltHeadLeft <= -20) {
            colour = "yellow";
        } else {
            colour = "green";
        }
        draw(leftEar, colour, 10);

        if(sideTiltHeadRight <= -50){
            colour = "red";
        } else if (sideTiltHeadRight <= -35){
            colour = "orange";
        } else if(sideTiltHeadRight <= -20) {
            colour = "yellow";
        } else {
            colour = "green";
        }
        draw(rightEar, colour, 10);

        console.log("Tilt head left: " + sideTiltHeadLeft);
        console.log("Tilt head right: " + sideTiltHeadRight);

        const verticalTiltHead = nose.position.y - rightShoulder.position.y;
        if(verticalTiltHead >= -50 || (verticalTiltHead <= -170 && !verticalTiltHead >= -160)){
            colour = "red";
        } else if (verticalTiltHead >= -80 || (verticalTiltHead <= -160 && !verticalTiltHead >= -150)){
            colour = "orange";
        } else if(verticalTiltHead >= -120 || (verticalTiltHead <= -150 && !verticalTiltHead >= -140)) {
            colour = "yellow";
        } else {
            colour = "green";
        }
        console.log(verticalTiltHead);
        draw(nose, colour, 10);
  }
  requestAnimationFrame(drawCameraIntoCanvas);
}

bodies.start();
drawCameraIntoCanvas();