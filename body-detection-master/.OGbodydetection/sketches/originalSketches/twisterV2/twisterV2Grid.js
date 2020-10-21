class Grid {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        //create a grid with x width boxes and y vertical boxes
    }
    createGridBoxes(){
        for (let iy = 0; iy <= this.y; iy++){
            for (let ix = 0; ix <= this.x; ix++){
                //create the GridBox
                //y0 = iy canvas.height/
            }
            ix = 0;
        }
    }
    drawGrid(){

    }
}

class GridBox extends Grid {
    constructor (x, y, width, height, colour, connected) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.colour = colour;
        this.connected = connected;
    }
    isConnected(){

    }
}
let gridVals = {
    x: [0, canvas.width/3,  (canvas.width/3)  * 2, canvas.width],
    y: [0, canvas.height/3, (canvas.height/3) * 2, canvas.height],
};

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
};

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