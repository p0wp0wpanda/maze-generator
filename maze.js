window.onload = function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    setup();

    framesPerSecond = 10;
    setInterval(function(){
        drawEverything();
        moveEverything();
    }, 1000 / framesPerSecond);
}

function setup(){
    for(var j = 0; j < rowNumber; j++){
        var row = [];
        for(var i = 0; i < colNumber; i++){
            row[i] = new Cell(cellSide * i, cellSide * j);
        }
        grid[j] = row;
    }
}

function drawEverything(){
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    drawGrid();
}

function drawSegment(x1, y1, x2, y2){
    ctx.strokeStyle = 'rgb(100, 100, 100)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawGrid(){
    for(var row = 0; row < rowNumber; row ++){
        for (var col = 0; col < colNumber; col ++){
        grid[row][col].drawUp();
        grid[row][col].drawDown();
        grid[row][col].drawLeft();
        grid[row][col].drawRight();
        grid[row][col].drawInside();
      }
  }
}

function moveEverything(){
    getNext();
    currentCell(testRow, testCol);
    grid[testRow][testCol].visited = true;
    grid[testRow][testCol].color = 'rgba(100, 0, 100, 0.3)';
    stack.push([testRow, testCol]);

    if (previousRow - testRow == 1){
        grid[previousRow][previousCol].up = false;
        grid[testRow][testCol].down = false;
    }

    else if (previousRow - testRow == -1){
        grid[previousRow][previousCol].down = false;
        grid[testRow][testCol].up = false;
    }

    if (previousCol - testCol == 1){
        grid[previousRow][previousCol].left = false;
        grid[testRow][testCol].right = false;
    }

    else if (previousCol - testCol == -1){
        grid[previousRow][previousCol].right = false;
        grid[testRow][testCol].left = false;
    }

}

function currentCell(x, y){
    grid[x][y].drawCurrent();
}

function getNext(){
    var row = testRow;
    var col = testCol;
    previousRow = testRow;
    previousCol = testCol;
    var next = getRandom(0, 2);
    if (next == 0){
        var switchUpDown = getRandom(0, 2);
        if (switchUpDown == 0){
            row += 1;
        }
        else{
            row -= 1;
        }
    }
    else {
        var switchLeftRight = getRandom(0, 2);
        if (switchLeftRight == 0){
            col += 1;
        }
        else{
            col -= 1;
        }
    }
    checkValid(row, col);
}

function checkValid(row, col){
    if (grid[row][col].visited == true){
        getNext();
    }

    else{
        testRow = row;
        testCol = col;
    }

}

function colorRect(x, y, width, height, color){
    //Draw a black rectangle as background
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
