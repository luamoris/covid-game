/*========================================================
Запуск игры
=========================================================*/

createStartBlock();



function gameStart(argument) {
gameName.remove();
startBlock.remove();

createHouse(120, "hospital");
createHouse(340, "house");
createHouse(560, "hospital");
createHouse(780, "house");


createScoreDead();
createScoreSick();
createScoreHealthy();

createTimer();
}