var boardCellsArr;
var isFirstPlayerTurn = true;
var clicksCount = 0;

var firstPlayerNameElem = document.getElementById("first-player-name");
var secondPlayerNameElem = document.getElementById("second-player-name");

var playersNamesErrorElem = document.getElementById("players-names-error");
playersNamesErrorElem.style.visibility = "hidden";

var tableCellsElems = document.getElementsByClassName("table-cell");
var displayWinnerElem = document.getElementById("winner");
displayWinnerElem.style.visibility = "hidden";


function startNewGame() {
	getEmptyGameTable();
	document.getElementById('stop-game-button').disabled = false;
	document.getElementById('stop-game-button').innerText = "Stop Game";
	
	displayWinnerElem.style.visibility = "hidden";
	displayWinnerElem.innerText = '';

	if (firstPlayerNameElem.value === '' && secondPlayerNameElem.value === '')  {
		playersNamesErrorElem.style.visibility = "visible";
		playersNamesErrorElem.innerHTML = 'Enter players names';
		return;
	}

	if (firstPlayerNameElem.value === '')  {
		playersNamesErrorElem.style.visibility = "visible";
		playersNamesErrorElem.innerHTML = 'Enter player 1 name';
		return;
	}

	if (secondPlayerNameElem.value === '')  {
		playersNamesErrorElem.style.visibility = "visible";
		playersNamesErrorElem.innerHTML = 'Enter player 2 name';
		return;
	}

	firstPlayerNameElem.disabled = true;
	secondPlayerNameElem.disabled = true;

	playersNamesErrorElem.style.visibility = "hidden";
	playersNamesErrorElem.innerHTML = '';

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


function stopGame() {
	getEmptyGameTable();
	firstPlayerNameElem.disabled = false;
	secondPlayerNameElem.disabled = false;
	firstPlayerNameElem.value = '';
	secondPlayerNameElem.value = '';
	disableChoicesOnGameBoard();
	playersNamesErrorElem.style.visibility = "hidden";
	playersNamesErrorElem.innerHTML = '';
	displayWinnerElem.style.visibility = "hidden";
	displayWinnerElem.innerText = '';
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
		boardCellsArr[rowIndex][columnIndex] = 'X';
	}
	else {
		thisTableCellElem.innerText = 'O';
		boardCellsArr[rowIndex][columnIndex] = 'O';
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
		displayWinnerElem.innerText = `Winner: ${winnerName}`;
		isWon = true;
	}
	// If there is vertical winning
	else if(boardCellsArr[0][colID] === boardCellsArr[1][colID] && boardCellsArr[1][colID] === boardCellsArr[2][colID]) {
		displayWinnerElem.style.visibility = "visible";
		displayWinnerElem.innerText = `Winner:  ${winnerName}`;
		isWon = true;
	}
	// If there is left diagonal winning
	else if(boardCellsArr[0][0] === boardCellsArr[1][1] && boardCellsArr[1][1] === boardCellsArr[2][2]) {
		displayWinnerElem.style.visibility = "visible";
		displayWinnerElem.innerText = `Winner:  ${winnerName}`;
		isWon = true;
	}
	// If there is right diagonal winning
	else if(boardCellsArr[2][0] === boardCellsArr[1][1] && boardCellsArr[1][1] === boardCellsArr[0][2]) {
		displayWinnerElem.style.visibility = "visible";
		displayWinnerElem.innerText = `Winner:  ${winnerName}`;
		isWon = true;
	}
	// If there is no winning but the game board is full
	else if (clicksCount === 9) {
		displayWinnerElem.style.visibility = "visible";
		displayWinnerElem.innerText = "A Tie";
	}

	//if(isWon) gameContainer.style.display = "none";	
	if(isWon || clicksCount === 9) {
		firstPlayerNameElem.disabled = false;
		secondPlayerNameElem.disabled = false;
		firstPlayerNameElem.value = '';
		secondPlayerNameElem.value = '';
		disableChoicesOnGameBoard();
		document.getElementById('stop-game-button').disabled = true;
		document.getElementById('stop-game-button').innerText = "Disabled";
	} 
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

	if (e.target.innerText === "Light Pallet") {
		fontColor = "#9900ff";
		backgroundColor = "#BFD9FF";
		document.getElementById('players-names-error').style.color = 'red';
	}
	else {
		fontColor = "#ffcc00";
		backgroundColor = "#0F73EB";
		document.getElementById('players-names-error').style.color = '#ffff00';
	}

	var bodyContent = document.getElementsByTagName("body")[0];
	
	var winnerNameDisplayElem = document.getElementById("winner");
	var pageTitleElem = document.getElementById("page-title");

	winnerNameDisplayElem.style.color = fontColor;
	pageTitleElem.style.color = fontColor;
	bodyContent.style.backgroundColor = backgroundColor;
} 
