const bodies = new BodyStream ({
      posenet: posenet,
      architecture: modelArchitecture.ResNet50, //options: MobileNetV1, ResNet50
      detectionType: detectionType.singleBody, //options: singleBody, multipleBodies
      videoElement: document.getElementById('video'), 
      samplingRate: 250
});
    
let body;
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0);
    const distance = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist));
    document.getElementById('output').innerText = `Distance between wrists: ${distance}`;
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist);
});

let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// draw the video, nose and eyes into the canvas
function drawCameraIntoCanvas() {
    ctx.drawImage(video, 0, 0, video.width, video.height); // draw the video element into the canvas

    if (body) {
        // draw circle for left and right wrist
        const leftWrist = body.getBodyPart(bodyParts.leftWrist);
        const rightWrist = body.getBodyPart(bodyParts.rightWrist);

        // draw left wrist
        ctx.beginPath();
        ctx.arc(leftWrist.position.x, leftWrist.position.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        // draw right wrist
        ctx.beginPath();
        ctx.arc(rightWrist.position.x, rightWrist.position.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        drawGrid();
    }
    requestAnimationFrame(drawCameraIntoCanvas);
}

/* ----- run ------ */
bodies.start();
drawCameraIntoCanvas();