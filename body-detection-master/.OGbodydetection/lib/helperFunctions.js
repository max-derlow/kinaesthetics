function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//x = distance between the user's eyes
function distanceCm(x) {
    return -21.6 + (594.6724 - -21.6)/(1 + (x/8.436912)**1.09424);
}
/*
function draw(bodyPart, colour, radius){
    if(!bodyPart){return;} //jesus fuck this syntax

    let x = bodyPart.position.x;
    let y = bodyPart.position.y;
    let confidenceScore = bodyPart.confidenceScore;

    if(confidenceScore >= 0) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = colour;
        ctx.fill();
    }*/



