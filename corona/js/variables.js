/*=================================================
Переменные
===================================================*/

// Время игры в секундах
var time = 30;
// Количество людей 
var peopleCount = 0;
// Таймер, который отвечает за появление людей
var spawn = null;
// Максимально возможная скорость движение людей
var speedMax = 4;


// Количество больних
var scoreSick = 0;
// Элемент в который нужно записывать количество больных людей
var quantitySickEl = null;


// Количество здоровых
var scoreHealthy = 0;
// Элемент в который нужно записывать количество здоровых людей
var quantityHealthyEl = null;


// Количество тех, которые умерли
var scoreDead = 0;
// Элемент в который нужно записывать количество людей, которые умерли
var quantityDeadEl = null;




/*=================================================
Игровые элементы HTML
===================================================*/

// Игровое поле
var gameBlock = document.querySelector("#gameBlock");
// Информационный блок
var infoBlock = document.querySelector("#infoBlock");
// Блок старта
var startBlock =  null;
// Кнопка старта
var startButton = null;
// Название игры
var gameName = null;
// Блок конца игры
var endGameBlock = null;
// Кнопка рестарта
var restartButton = null;