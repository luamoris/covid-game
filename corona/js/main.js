/*========================================================
Запуск игры
=========================================================*/

// Запуск
createStartBlock();
startButton.onclick = gameStart;

// Функция начала игры 
function gameStart() 
{
	startButton.onclick = null;
	gameName.style.display = "none";
	startBlock.remove();
	createGameElements();
}

// Функция рестарта 
function gameRestart()
{
	restartButton.onclick = null;
	gameName.style.display = "none";
	endGameBlock.remove();
	peopleCount = 0;
	createGameElements();
}

// Функция окончания игры 
function gameover()
{
	removeTimer();
	removeVaccine();
	removePeople();
	removeBuilding();
	removeScore();

	setTimeout(function() 
	{ 
		createEndGameBlock();
		gameName.style.display = "block";
		restartButton.onclick = gameRestart;
	}, 1000);
}