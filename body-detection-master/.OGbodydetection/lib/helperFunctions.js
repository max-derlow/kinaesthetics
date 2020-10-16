function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function distanceCm(x) {
    return -21.6 + (594.6724 - -21.6)/(1 + (x/8.436912)**1.09424);
}