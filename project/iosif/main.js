// Игра про вирус

/*=================================================
Переменные
===================================================*/

// Скорость блока в пикселях
let speed = 3;
// Свойство прозрачности блока
let opacity = 1;
// Таймер для блока
let timer = null;



/*=================================================
HTML элементы 
===================================================*/

// Игровое поле
const field = document.querySelector("#field");
// Блок который движется (человек)
const block = document.querySelector("#people");


/*========================
Создание HTML элементов 
==========================*/

function createBlock() {
	let block = document.createElement("div");
	block.id = "people";
	field.appendChild(block);
}

/*=================================================
Функции
===================================================*/

// Движение блока вправо 
function moveBlockRight() {
	timer = setInterval(function() {
		block.style.left = block.offsetLeft + speed + 'px';
	}, 20);
}

// Движение блока вверх 
function moveBlockTop() {
	clearInterval(timer);
	block.onclick = null;

	timer = setInterval(function() {
		block.style.top = block.offsetTop - speed + 'px';
		block.style.opacity = opacity;
		opacity = (opacity - 0.01).toFixed(2);
		if(opacity == 0.0) {
			clearInterval(timer);
		}
	}, 20);
}



/*=================================================
События
===================================================*/

// Клик по блоку
block.onclick = moveBlockTop;



/*=================================================
Старт
===================================================*/

moveBlockRight();