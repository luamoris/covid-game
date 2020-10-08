/*========================================================
Тест
=========================================================*/

// Количество больних
var scoreSick = 0;
// Элемент в который нужно записывать количество больных
var quantitySickEl = null;

// Количество здоровых
var scoreHealthy = 0;
// Элемент в который нужно записывать количество здоровых
var quantityHealthyEl = null;

// Количество здоровых
var scoreDead = 0;
// Элемент в который нужно записывать количество здоровых
var quantityDeadEl = null;

// Создание элемента для счета количества больних 
function createScoreSick() 
{
	var scoreSickEl = document.createElement("div");
	scoreSickEl.id = "score-sick";

	var colorEl = document.createElement("div");

	var img = document.createElement("img");
	img.src = "img/sick.png";

	quantitySickEl = document.createElement("h5");
	quantitySickEl.innerText = scoreSick;

	colorEl.appendChild(img);
	scoreSickEl.appendChild(colorEl);
	scoreSickEl.appendChild(quantitySickEl);
	infoBlock.appendChild(scoreSickEl);
}

// Создание элемента для счета количества здоровых 
function createScoreHealthy() 
{
	var scoreHealthyEl = document.createElement("div");
	scoreHealthyEl.id = "score-healthy";

	var colorEl = document.createElement("div");

	var img = document.createElement("img");
	img.src = "img/healthy.png";

	quantityHealthyEl = document.createElement("h5");
	quantityHealthyEl.innerText = scoreHealthy;

	colorEl.appendChild(img);
	scoreHealthyEl.appendChild(colorEl);
	scoreHealthyEl.appendChild(quantityHealthyEl);
	infoBlock.appendChild(scoreHealthyEl);
}

// Создание элемента для счета количества смертей 
function createScoreDead() 
{
	var scoreDeadEl = document.createElement("div");
	scoreDeadEl.id = "score-dead";

	var colorEl = document.createElement("div");

	var img = document.createElement("img");
	img.src = "img/tomb.png";

	quantityDeadEl = document.createElement("h5");
	quantityDeadEl.innerText = scoreDead;

	colorEl.appendChild(img);
	scoreDeadEl.appendChild(colorEl);
	scoreDeadEl.appendChild(quantityDeadEl);
	infoBlock.appendChild(scoreDeadEl);
}

// Определяем где именно был клик по мячу
function scoring(person)
{
	var left = person.offsetLeft;
	var typePerson = "people healthy";
	if(person.className == "people sick")
	{
		typePerson = "people sick";
	}

	if( (left >= 100 && left <= 210) || (left >= 540 && left <= 650) )
	{
		// hospital
		if(typePerson == "people healthy")
		{
			scoreSick++;
			quantitySickEl.innerText = scoreSick;
		} else
		{
			scoreHealthy++;
			quantityHealthyEl.innerText = scoreHealthy;
		}
	}
	else if( (left >= 320 && left <= 430) || (left >= 760 && left <= 870) )
	{
		// house
		if(typePerson == "people healthy")
		{
			scoreHealthy++;
			quantityHealthyEl.innerText = scoreHealthy;
		} else
		{
			scoreSick += (scoreHealthy + 1);
			scoreHealthy = 0;
			quantitySickEl.innerText = scoreSick;
			quantityHealthyEl.innerText = scoreHealthy;
		}
	}
	else
	{
		scoreDead++;
		quantityDeadEl.innerText = scoreDead;
	}
}




/*========================================================
Обработка элементов игры
=========================================================*/

// Создание элемента человек и задание ему скорости
function randomMovement() 
{
    var people = createPeople();
    var dottedLine = people.querySelector(".vl")
    var speed = random(2); // 4
    var opacity = 1;

    var running = setInterval(function() 
    {
        people.style.left = people.offsetLeft + speed + "px";
        if(people.offsetLeft > 1000)
        {
			scoreDead++;
			quantityDeadEl.innerText = scoreDead;
            clearInterval(running);
            people.remove();
        }
    }, 20);

    people.onmousemove = function() 
    {
        dottedLine.style.display = "block";
    }

    people.onmouseleave = function() 
    {
        dottedLine.style.display = "none";
    }

    people.onclick = function() 
    {
    	scoring(people);
        clearInterval(running);
        dottedLine.style.display = "none";
        people.onclick = null;
        people.onmousemove = null;
        people.onmouseleave = null;

        var timer = setInterval(function() 
        {
            people.style.top = people.offsetTop - 4 + 'px';
            people.style.opacity = opacity;
            opacity = (opacity - 0.02).toFixed(2);
            if(opacity == 0.0) 
            {
                clearInterval(timer);
                people.remove();
            }
        }, 20);
    }

}

// Генерация людей 
function peopleSpawner() 
{
    spawn = setInterval(function () 
    {
        randomMovement();
    }, 2000)
}






createHouse(120, "hospital");
createHouse(340, "house");
createHouse(560, "hospital");
createHouse(780, "house");

// сreateLifes(quantityLifes);

createScoreDead();
createScoreSick();
createScoreHealthy();

createTimer();

peopleSpawner();
