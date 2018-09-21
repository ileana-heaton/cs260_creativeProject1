var gameStarted = 0;
var gameOver = 0;

/* The following four variables can be used to check if the 
*  players have selected colors and shapes*/
var p1ColorSelect = 0;
var p2ColorSelect = 0;
var p1ShapeSelect = 0;
var p2ShapeSelect = 0;

/*Variables for player specs*/
var p1Color = "black";
var p2Color = "black";
var p1Symbol = "fas fa-times"
var p2Symbol = "far fa-circle"


var turn = 0;

function fill(square) {
    
    if(!gameOver && gameStarted && document.getElementById(square).className == "") {
        document.getElementById(square).className += turn % 2 == 0 ? p1Symbol : p2Symbol;
        document.getElementById("turn-indicator").innerHTML = "Turn: Player " + (turn % 2 ? "1" : "2");
        document.getElementById(square).style.color = turn % 2 ==0 ? p1Color : p2Color;
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
    if(p1Color == p2Color && p1Symbol == p2Symbol) {
        document.getElementById("turn-indicator").innerHTML = "Pick different shapes and colors!";
        return;
    }
    if(p1ColorSelect && p1ShapeSelect && p2ColorSelect && p2ShapeSelect) {
        document.getElementById("board").style.opacity = 1;
        document.getElementById("turn-indicator").innerHTML = "Turn: Player 1";
        gameStarted = 1;
        gameOver = 0;
    } else {
        document.getElementById("turn-indicator").innerHTML = "Select your colors and shapes!";
    }
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
        var winningStr = "Player "+ (player == "O" ? "2" : "1") + " won!";
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

function changeP1Color(color) {
    if(color) {
        p1Color = color;
        document.getElementById("player-one-symbol").style.color = p1Color;
        p1ColorSelect = 1;
    }
}

function changeP1Symbol(symbol) {
    if(symbol) {
        p1Symbol = symbol;
        document.getElementById("player-one-symbol").className = p1Symbol;
        p1ShapeSelect = 1;
    }
}

function changeP2Color(color) {
    if(color) {
        p2Color = color;
        document.getElementById("player-two-symbol").style.color = p2Color;
        p2ColorSelect = 1;
    }
}

function changeP2Symbol(symbol) {
    if(symbol) {
        p2Symbol = symbol;
        document.getElementById("player-two-symbol").className = p2Symbol;
        p2ShapeSelect = 1;
    }
}