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

function getRandomGrid() {
    let gridNumber = getRandomInt(1,9);
    let i = 100;
    while(grid[gridNumber].drawn === true){
        let gridNumber = getRandomInt(1,9);
        i--;
        if(i <= 0){console.log("while loop busted, fix");}
    }

    grid[gridNumber].drawn = true;
    let x = getRandomInt(grid[gridNumber].xMin, grid[gridNumber].xMax);
    let y = getRandomInt(grid[gridNumber].yMin, grid[gridNumber].yMax);
    return [x, y, gridNumber];
}

let twisterObjects = {}; //limb:leftWrist, connected:true/false, grid: 1-9, sideLength:10,

//the body parts and their properties that we want to use in our game of twister
let twisterBodyParts = {
    leftWrist: {drawn:false, colour: "cyan", xPos:0, yPos:0, string: "leftWrist"},
    rightWrist:{drawn:false, colour: "red", xPos:0, yPos:0, string: "rightWrist"},
    leftAnkle: {drawn:false, colour: "green", xPos:0, yPos:0, string: "leftAnkle"},
    rightAnkle:{drawn:false, colour: "yellow", xPos:0, yPos:0, string: "rightAnkle"},
}

function checkConnection(twisterObject){
    let bodyPart = body.getBodyPart(twisterObject);
    let xBody = bodyPart.position.x;
    let yBody = bodyPart.position.y;
    let xBox = twisterObjects[bodyPart.part].x;
    let yBox = twisterObjects[bodyPart.part].y;
    let sideLength = twisterObjects[bodyPart.part].sideLength;
    console.log(xBox, yBox);
    if( xBody >= xBox && xBody <= (xBox + sideLength) &&
        yBody >= yBox && yBody <= (yBox + sideLength)){
        console.log("True boy!");
        return true;
    } else {
        return false;
    }
//body.getBodyPart("leftAnkle");
    /*
    if()
*/
    //check connectivity between corresponding part/twister object
}
function newTwisterObject(){
    let randomBodyArray = [];

    //get all of the undrawn bodyparts for later randomisation
    for(let key in twisterBodyParts) {
        if (twisterBodyParts[key].drawn === false) {
            randomBodyArray.push(key);
        }
    }
    console.log(randomBodyArray);
    let randomBodyPart = randomBodyArray[Math.floor(Math.random() * randomBodyArray.length)];
    let [x, y, gridNumber] = getRandomGrid();
    console.log("x: " + x + " y: " + y + " gridNumber: " + gridNumber);
    twisterObjects[randomBodyPart] = {connected:false, x:x, y:y, gridNumber:gridNumber, sideLength:100};
}

function drawInstructions(){
    let i = 1;
    ctx.fillStyle = ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, 150, 100);
    for(let key in twisterBodyParts){
        ctx.fillStyle = "white";
        ctx.font = "10px Calibri";
        ctx.fillText(twisterBodyParts[key].string, 10, i*20);
        ctx.fillStyle = twisterBodyParts[key].colour;
        ctx.fillRect(75, (i*20)-8, 10, 10);
        i++;
    }
}

function drawTwisterObject(connected, twisterObject){
    let colour;
    let bodyPart = body.getBodyPart(twisterObject);

    if(connected){
        colour = "green";
    } else {
        colour = twisterObjects[bodyPart.part].colour;
    }

    let xBox = twisterObjects[bodyPart.part].x;
    let yBox = twisterObjects[bodyPart.part].y;
    let sideLength = twisterObjects[bodyPart.part].sideLength;
    ctx.fillStyle = ctx.fillStyle = colour;
    ctx.fillRect(xBox, yBox, sideLength, sideLength);
}

let firstIteration = true; //generate a twisterObject if none are drawn
function playTwister() {
    //Draw instructions
    drawInstructions();

    //create the first twister object if first runtime
    if(firstIteration){
        newTwisterObject();
        firstIteration = false;
        return;
    }
    allConnected = true;
    //check connectivity of twister objects
    for(let key in twisterObjects){
        let isConnected = checkConnection(key); //returns true/false
        if (isConnected){
            drawTwisterObject(true, key);
        } else {
            drawTwisterObject(false, key);
            allConnected = false;
        }
    }

    if(allConnected){
        newTwisterObject();
    }

    //create new twister objects if all existing ones are connected

    //draw twister objects.

    //LOOP per object: check connectivity of drawn objects --> draw squares (green if connected, coloured if not)
    //create new square if connectivity returns true
    }

//calculate distance between the user and the screen through his/her eyes.
function f(x) {
    return -21.6 + (594.6724 - -21.6)/(1 + (x/8.436912)**1.09424);
}

function draw(bodyPart, bodyPartObj, colour, radius){
    if(!bodyPart){return;} //jesus fuck this syntax
    if(bodyPart.confidenceScore >= 0.2) {
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

     //console.log(distance);
     //console.log("distance from screen = " + cmFromScreen + "cm");
     if(nose.position.y >= 300){
         //console.log("working");
     }

    // left and right eye
   //drawStar(leftEye.position.x, leftEye.position.y, 5, 5, 13, 'yellow')
   //drawStar(rightEye.position.x, rightEye.position.y, 5, 5, 13, 'yellow')
     playTwister();


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
