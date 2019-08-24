var boardCellsArr;
var isFirstPlayerTurn = true;
var clicksCount = 0;

var firstPlayerNameElem = document.getElementById("first-player-name");
var secondPlayerNameElem = document.getElementById("second-player-name");

var playersNamesErrorElem = document.getElementById("players-names-error");
playersNamesErrorElem.style.visibility = "hidden";

var gameContainer = document.getElementById("game-container");
var tableCellsElems = document.getElementsByClassName("table-cell");
var displayWinnerElem = document.getElementById("winner");
displayWinnerElem.style.visibility = "hidden";


function startNewGame() {
	if (firstPlayerNameElem.value === '' && secondPlayerNameElem.value === '')  {
		playersNamesErrorElem.style.visibility = "visible";
		playersNamesErrorElem.innerHTML = 'Please enter players names!';
		return;
	}

	if (firstPlayerNameElem.value === '')  {
		playersNamesErrorElem.style.visibility = "visible";
		playersNamesErrorElem.innerHTML = 'Please enter first player name!';
		return;
	}

	if (secondPlayerNameElem.value === '')  {
		playersNamesErrorElem.style.visibility = "visible";
		playersNamesErrorElem.innerHTML = 'Please enter second player name!';
		return;
	}

	playersNamesErrorElem.style.visibility = "hidden";
	playersNamesErrorElem.innerHTML = '';

	//gameContainer.style.display = "block";
	getEmptyGameTable();
	displayWinnerElem.innerText = "";  
	displayWinnerElem.style.visibility = "hidden";
	isFirstPlayerTurn = true;
	clicksCount = 0;
	boardCellsArr = [ [0, 1, 2], [3, 4, 5], [6, 7, 8] ]; // The values doesn't metter, only must be 3*3 array
	enableChoicesOnGameBoard();

	for (var i = 0; i < tableCellsElems.length; i++) {
		tableCellsElems[i].onclick = function() {
			displayPlayersChoices(this);
		}
	}
}


function getEmptyGameTable() {
	for (var i = 0; i < tableCellsElems.length; i++) {
		tableCellsElems[i].innerText = "";
	}
}


function displayPlayersChoices(thisTableCellElem) {
	if(thisTableCellElem.innerText !== '') return;

	clicksCount++;

	var rowIndex = thisTableCellElem.parentNode.getAttribute("row-index");
	var columnIndex = thisTableCellElem.getAttribute("column-index");

	if(isFirstPlayerTurn) {
		thisTableCellElem.innerText = 'X';
		//console.log(boardCellsArr[rowIndex][columnIndex]);
		boardCellsArr[rowIndex][columnIndex] = 'X';
		//console.log(boardCellsArr[rowIndex][columnIndex]);
	}
	else {
		thisTableCellElem.innerText = 'O';
		//console.log(boardCellsArr[rowIndex][columnIndex]);
		boardCellsArr[rowIndex][columnIndex] = 'O';
		//console.log(boardCellsArr[rowIndex][columnIndex]);
	}

	checkWin(rowIndex, columnIndex);	

	if (isFirstPlayerTurn) isFirstPlayerTurn = false;
	else if(!isFirstPlayerTurn) isFirstPlayerTurn = true;
}


function checkWin(rowID, colID) {
	var winnerName = "";
	var isWon = false;

	if(isFirstPlayerTurn) winnerName = document.getElementById("first-player-name").value;
	else winnerName = document.getElementById("second-player-name").value;

	// If there is horizontal winning
	if(boardCellsArr[rowID][0] === boardCellsArr[rowID][1] && boardCellsArr[rowID][1] === boardCellsArr[rowID][2]) {
		displayWinnerElem.style.visibility = "visible";
		displayWinnerElem.innerText = `The winner is ${winnerName}`;
		isWon = true;
	}
	// If there is vertical winning
	else if(boardCellsArr[0][colID] === boardCellsArr[1][colID] && boardCellsArr[1][colID] === boardCellsArr[2][colID]) {
		displayWinnerElem.style.visibility = "visible";
		displayWinnerElem.innerText = `The winner is ${winnerName}`;
		isWon = true;
	}
	// If there is left diagonal winning
	else if(boardCellsArr[0][0] === boardCellsArr[1][1] && boardCellsArr[1][1] === boardCellsArr[2][2]) {
		displayWinnerElem.style.visibility = "visible";
		displayWinnerElem.innerText = `The winner is ${winnerName}`;
		isWon = true;
	}
	// If there is right diagonal winning
	else if(boardCellsArr[2][0] === boardCellsArr[1][1] && boardCellsArr[1][1] === boardCellsArr[0][2]) {
		displayWinnerElem.style.visibility = "visible";
		displayWinnerElem.innerText = `The winner is ${winnerName}`;
		isWon = true;
	}
	// If there is no winning but the game board is full
	else if (clicksCount === 9) {
		displayWinnerElem.innerText = "A Tie";
		isWon = true;
	}

	//if(isWon) gameContainer.style.display = "none";	
	if(isWon) disableChoicesOnGameBoard();
}


function disableChoicesOnGameBoard() {
	for (var i = 0; i < tableCellsElems.length; i++) {
		tableCellsElems[i].onclick = false;
	}
}

function enableChoicesOnGameBoard() {
	for (var i = 0; i < tableCellsElems.length; i++) {
		tableCellsElems[i].onclick = true;
	}
}


function pallete(e) {
	e.preventDefault();

	var fontColor, backgroundColor;

	if (e.target.innerText === "light") {
		fontColor = "#000099";
		backgroundColor = "#E3FEED";
	}
	else {
		fontColor = "#66ffcc";
		backgroundColor = "#0F73EB";
	}

	var bodyTagWithAllContent = document.getElementsByTagName("body")[0];
	var gameBoardCells = document.getElementsByClassName("table-cell");
	var winnerNameDisplayElem = document.getElementById("winner");
	var pageTitleElem = document.getElementsByClassName("page-title");

	for (var i = 0; i < gameBoardCells.length; i++) {
		gameBoardCells[i].style.border = "8px solid" + fontColor;
		gameBoardCells[i].style.color = fontColor;
	}

	winnerNameDisplayElem.style.color = fontColor;
	pageTitleElem[0].style.color = fontColor;
	bodyTagWithAllContent.style.backgroundColor = backgroundColor;
} 


// https://github.com/DavidLev1/Tic-Tac-Toe-game

//  https://tic-tac-toe-game-by-david-lev.herokuapp.com