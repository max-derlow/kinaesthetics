let video = document.getElementById("video");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const bodies = new BodyStream ({
    posenet: posenet,
    architecture: modelArchitecture.ResNet50, 
    detectionType: detectionType.singleBody, 
    videoElement: document.getElementById('video'), 
    samplingRate: 300
})
  
let body
let distShoulder

let ellipseX = 100;
let ellipseY = 100;
let width = 20;
let width1 = 40;
let width2 = 80;
let height = 20;
let height1 = 40;
let height2 = 80;
let ellipseFull = 100;

bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0)

    distShoulder = Math.round(body.getDistanceBetweenBodyParts(bodyParts.leftShoulder, bodyParts.rightShoulder))
    body.getDistanceBetweenBodyParts(bodyParts.leftShoulder, bodyParts.rightShoulder)
})


function drawCameraIntoCanvas() {

    ctx.drawImage(video, 0, 0, video.width, video.height);

    const leftShoulder = body.getBodyPart(bodyParts.leftShoulder)
    const rightShoulder = body.getBodyPart(bodyParts.rightShoulder)

    ctx.beginPath();
    ctx.arc(leftShoulder.position.x, leftShoulder.position.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue'
    ctx.fill()
    ctx.beginPath();
    ctx.arc(rightShoulder.position.x, rightShoulder.position.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue'
    ctx.fill()

    ctx.beginPath();
    ctx.ellipse(200, 200, ellipseX, ellipseY, Math.PI / 1, 0, 2 * Math.PI);
    ctx.stroke();

    /*
    if (Math.round(rightShoulder.confidenceScore / 0.01) < 70 && ellipseY >= width){
        ellipseY = ellipseY -5;
        console.log('RIGHT');
    } else if (Math.round(leftShoulder.confidenceScore / 0.01) < 70 && ellipseY >= width){
        ellipseY = ellipseY -5;
        console.log('LEFT');
    } else if (ellipseY <= ellipseFull) {
        ellipseY = ellipseY +5;
        console.log('STRAIGHT');
    }
    */

    const turnLeft = Math.round(leftShoulder.position.x - rightShoulder.position.x);
    const turnRight = Math.round(rightShoulder.position.x - leftShoulder.position.x);

    if(Math.sign(turnLeft) === -1 || Math.sign(turnRight) === 1){
        ellipseX = ellipseX -5;
        console.log('CRACK')
    }else if(turnLeft <= 40 && turnLeft >= -20  && ellipseX >= width || turnRight >= -40 && turnRight <= 20 && ellipseX >= width){
        ellipseX = ellipseX -3;
        console.log('LEFT1');
    }else if(turnLeft <= 80 && turnLeft >= 50  && ellipseX >= width1 || turnRight >= -80 && turnRight <= -50 && ellipseX >= width1){
        ellipseX = ellipseX -2;
        console.log('LEFT2');
    }else if(turnLeft <= 140 && turnLeft >= 100 && ellipseX >= width2 || turnRight >= -140 && turnRight <= -100 && ellipseX >= width2){
        ellipseX = ellipseX -1;
        console.log('LEFT3');
    }else if(turnLeft >= 170 && ellipseX <= ellipseFull || turnRight <= -170 && ellipseX <= ellipseFull){
        ellipseX = ellipseX +5;
        console.log('STRAIGHT');
    }
/*
    const turnUp = Math.round(leftShoulder.position.y - rightShoulder.position.y);
    
    if(distShoulder <= 150 && turnUp >= -40 && turnUp <= -5 && ellipseY >= height || distShoulder <= 150 && turnUp <= 40 && turnUp > 5 && ellipseY >= height){
        ellipseY = ellipseY -1; 
        console.log('TWIST');  
    }else if(distShoulder >= 150 && turnUp <= 30 && turnUp >= -5 && ellipseY <= ellipseFull || distShoulder >= 150 && turnUp >= -5 && turnUp <= 30 && ellipseY <= ellipseFull){
        ellipseY = ellipseY +5;
        console.log('STABLE');
    }
*/  
    //console.log(distShoulder)
    //console.log(turnUp);
    //console.log(turnLeft);
  requestAnimationFrame(drawCameraIntoCanvas);
}
bodies.start()
drawCameraIntoCanvas();