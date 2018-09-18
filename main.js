var gameStarted = 0;

/* The following four variables can be used to check if the 
*  players have selected colors and shapes*/
var p1ColorSelect = 1;
var p2ColorSelect = 1;
var p1ShapeSelect = 1;
var p2ShapeSelect = 1;

var turn = 0;

function fill(square) {
    if(gameStarted && document.getElementById(square).innerHTML == "") {
        document.getElementById(square).innerHTML = turn % 2 == 0 ? "X" : "O";
        document.getElementById("turn-indicator").innerHTML = "Turn: Player " + (turn % 2 ? "1" : "2");
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
    document.getElementById("turn-indicator").innerHTML = "Turn: Player 1";
    gameStarted = 1;

}

function restart() {
    location.reload();
}