const bodies = new BodyStream ({
    posenet: posenet,
    architecture: modelArchitecture.ResNet50, 
    detectionType: detectionType.multipleBodies, 
    videoElement: document.getElementById('video'), 
    samplingRate: 250
})
  
let body
let distWrist
let distElbow


bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)
    distWrist = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist))
    body.getDistanceBetweenBodyParts(bodyParts.leftWrist, bodyParts.rightWrist)

    distElbow = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftElbow, bodyParts.rightElbow))
    body.getDistanceBetweenBodyParts(bodyParts.leftElbow, bodyParts.rightElbow)
})

let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

function drawCameraIntoCanvas() {

    ctx.drawImage(video, 0, 0, video.width, video.height);
  
    if (body) {
        const leftWrist = body.getBodyPart(bodyParts.leftWrist)
        const rightWrist = body.getBodyPart(bodyParts.rightWrist)

        const leftElbow = body.getBodyPart(bodyParts.leftElbow)
        const rightElbow = body.getBodyPart(bodyParts.rightElbow)

        const leftShoulder = body.getBodyPart(bodyParts.leftShoulder)
        const rightShoulder = body.getBodyPart(bodyParts.rightShoulder)

    if (Math.round(leftWrist.position.y / 10) == Math.round(leftElbow.position.y / 10)
    && Math.round(rightWrist.position.y / 10) == Math.round(rightElbow.position.y / 10)){
        console.log('T');
    }

    if (Math.round(leftElbow.position.y / 10) == Math.round(rightElbow.position.y / 10)
    && distWrist < 60){
        console.log('O');  
    }

    if (Math.round(leftShoulder.position.y / 10) > Math.round(leftElbow.position.y / 10)
    && Math.round(leftShoulder.position.y / 10) < Math.round(leftWrist.position.y / 10)
    && Math.round(rightShoulder.position.y / 10) > Math.round(rightElbow.position.y / 10)
    && Math.round(leftShoulder.position.y / 10) < Math.round(leftWrist.position.y / 10)){
       console.log('M'); 
    }

    ctx.beginPath();
    ctx.arc(leftWrist.position.x, leftWrist.position.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.beginPath();
    ctx.arc(rightWrist.position.x, rightWrist.position.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'white'
    ctx.fill()

    ctx.beginPath();
    ctx.arc(leftElbow.position.x, leftElbow.position.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'
    ctx.fill()
    ctx.beginPath();
    ctx.arc(rightElbow.position.x, rightElbow.position.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'
    ctx.fill()

    ctx.beginPath();
    ctx.arc(leftShoulder.position.x, leftShoulder.position.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'green'
    ctx.fill()
    ctx.beginPath();
    ctx.arc(rightShoulder.position.x, rightShoulder.position.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue'
    ctx.fill()
  }
  requestAnimationFrame(drawCameraIntoCanvas);
}

bodies.start()
drawCameraIntoCanvas();