var gameStarted = 0;
var gameOver = 0;

/* The following four variables can be used to check if the 
*  players have selected colors and shapes*/
var p1ColorSelect = 1;
var p2ColorSelect = 1;
var p1ShapeSelect = 1;
var p2ShapeSelect = 1;

var turn = 0;

function fill(square) {
    
    if(!gameOver && gameStarted && document.getElementById(square).innerHTML == "") {
        document.getElementById(square).innerHTML = turn % 2 == 0 ? "X" : "O";
        document.getElementById("turn-indicator").innerHTML = "Turn: Player " + (turn % 2 ? "X" : "O");
        play(parseInt(square, 10));
        turn++;
    }
    /* Change button into restart game button after first move*/
    if(turn == 1) {
        document.getElementById("start-button").innerHTML = "Restart Game";
        document.getElementById("start-button").onclick = restart;
    }
}

function startGame() {
    document.getElementById("board").style.opacity = 1;
    document.getElementById("turn-indicator").innerHTML = "Turn: Player X";
    gameStarted = 1;
    gameOver = 0;
}

function restart() {
    location.reload();
    turn = 0;
}


var playerXarray = [NaN,0,0,0,0,0,0,0,0,0]; //won't use index 0 for these arrays
var playerOarray = [NaN,0,0,0,0,0,0,0,0,0];

var playerXturns = 0;
var playerOturns = 0;

function play(squareNum){
    
    var player = (turn % 2 == 0 ? 'X' : 'O'); //determine player
    if(player=='X'){
        playerXarray[squareNum] = 1;
        playerXturns++;
        if(playerXturns>=3 && isWinningMove(squareNum, playerXarray)){ //if player won
            announceResult("win", player);
        }
    }
    else if (player=='O'){
        playerOarray[squareNum] = 1;
        playerOturns++;
        if(playerOturns>=3 && isWinningMove(squareNum, playerOarray)){ //if player won
            announceResult("win", player);
        }
    }
    if(turn+1==9){
       announceResult("draw", player)
    }
}

function announceResult(winOrDraw, player){
    if(winOrDraw=="win"){
        gameOver = 1;
        var winningStr = "Player "+ player + " won!";
        document.getElementById("turn-indicator").innerHTML = winningStr;
        document.body.style.backgroundImage = "url(confetti.gif), url(Gradient-HD-Desktop-Wallpaper.jpg)";
        setTimeout(function() {
            // alert(winningStr);  
            document.getElementById("result-popup").innerHTML = winningStr;
            document.getElementById("result-popup").style.visibility = "visible";
        },10)
        turn=0;
    }
    else if("draw") {
        gameOver = 1;
        document.getElementById("turn-indicator").innerHTML = "It's a draw!";
        setTimeout(function() {
            // alert("It's a draw!"); 
            document.getElementById("result-popup").innerHTML = "It's a draw!";
            document.getElementById("result-popup").style.visibility = "visible";
        },10)
    }
}

function isWinningMove(squareNum, arr){
    switch(squareNum){
        case 1:
            if(arr[2]&&arr[3] || arr[4]&&arr[7] || arr[5]&&arr[9] ){
                return true;
            }
            break;
        case 2:
            if(arr[1]&&arr[3] || arr[5]&&arr[8] ){
                return true;
            }
            break;
        case 3:
            if(arr[1]&&arr[2] || arr[6]&&arr[9] || arr[5]&&arr[7] ){
                return true;
            }
            break;
        case 4:
            if(arr[5]&&arr[6] || arr[1]&&arr[7] ){
                return true;
            }
            break;
        case 5:
            if(arr[4]&&arr[6] || arr[2]&&arr[8] || arr[3]&&arr[7] ){
                return true;
            }
            break;
        case 6:
            if(arr[4]&&arr[5] || arr[3]&&arr[9] ){
                return true;
            }
            break;
        case 7:
            if(arr[8]&&arr[9] || arr[1]&&arr[4] || arr[3]&&arr[5] ){
                return true;
            }
            break;
        case 8:
            if(arr[7]&&arr[9] || arr[2]&&arr[5] ){
                return true;
            }
            break;
        case 9:
            if(arr[7]&&arr[8] || arr[3]&&arr[6] || arr[1]&&arr[5] ){
                return true;
            }
            break;
    }
    return false;
}

function hidePopup(){
    document.getElementById("result-popup").style.visibility = "hidden";
}