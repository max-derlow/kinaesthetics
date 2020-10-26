self.importScripts('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs', 'https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet', 'https://unpkg.com/@reactivex/rxjs@6.6.3/dist/global/rxjs.umd.js', './bodydetection.js');
self.addEventListener('message', function(e) {
    let message = e.data;
    self.postMessage(message);
    console.log(message);

if(typeof bodies === 'undefined'){
    const bodies = new BodyStream ({
        posenet: posenet,
        architecture: modelArchitecture.ResNet50,
        detectionType: detectionType.singleBody,
        //videoElement: document.getElementById('video'),
        samplingRate: 2500
    });
    console.log("bodies: " + bodies)
}



let body;

//This is the sheit that causes the lag
bodies.addEventListener('bodiesDetected', (e) => {
    body = e.detail.bodies.getBodyAt(0);
});


//let video = document.getElementById("video");
//let canvas = document.getElementById("canvas");
//let ctx = canvas.getContext("2d");

//ellipse vars
const cEllipseX = 100;
const cEllipseY = 100;
const cEllipseRadiusX = 75;
const cEllipseRadiusY = 75;
const cEllipseRotation = 0;

let ellipseX;
let ellipseY;
let ellipseRadiusX;
let ellipseRadiusY;
let ellipseRotation;


function drawCameraIntoCanvas() {
    console.log(ellipseRadiusY);

    //ctx.drawImage(video, 0, 0, video.width, video.height);
    //ctx.clearRect(0,0,canvas.width,canvas.height);

    //ctx.beginPath();
    //ctx.ellipse(cEllipseX, cEllipseY, cEllipseRadiusX, cEllipseRadiusY + ellipseRadiusY, cEllipseRotation, 0, 2 * Math.PI);
    //ctx.stroke();

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
        const turnHeadLeft = nose.position.x - leftEar.position.x;
        const turnHeadRight = nose.position.x - rightEar.position.x;
        const sideTiltHeadLeft = nose.position.y - leftEar.position.y;
        const sideTiltHeadRight = nose.position.y - rightEar.position.y;

        console.log(distanceBetweenShoulders);
        baseLength = cBaseLength + distanceBetweenShoulders;
    }
    //requestAnimationFrame(drawCameraIntoCanvas);
}

bodies.start();
drawCameraIntoCanvas();
});