
/*========================================================
Дополнительные функции
=========================================================*/

//создание старт блока
function createStartBlock() 
{
    gameName();
    startBlock = document.createElement("div");
    startBlock.id = "start-block";

    var startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.innerText = "Начать";

    startBlock.appendChild(startButton);

    gameBlock.appendChild(startBlock);

    startButton.onclick = gameStart;
} 

function gameName()
{
    gameName = document.createElement("h2");
    gameName.id = "game-name";
    gameName.innerText = "Covid Game";


    infoBlock.appendChild(gameName);
}


// Блок конца игры
function endGameBlock()
{
   
   endGameBlock = document.createElement("div");
   endGameBlock.id = "endGameBlock";
   var h2 = document.createElement("h2");
       h2.id = "h2";
       if (scoreDead >= 10 || scoreSick >=20 )
       {
       endGame; 
       h2.innerText = "К сожалению вы допустили Эпидемию Covid-19 до появления вакцины";
       }else
       {
       h2.innerText = "Поздравляю!!! Вам удалось остановить расспростронение эпидемии Covid-19 до появления вакцины";
       }
   var h3 = document.createElement("h2");
       h3.innerText = "Количество здоровых:";
       h3.id = "h3";
   var spanh3 = document.createElement("span");   
       spanh3.innerText = scoreHealthy;
       h3.appendChild(spanh3);

   var h4 =  document.createElement("h2");
       h4.innerText = "Количество больных:";
       h4.id = "h4";
   var spanh4 = document.createElement("span");   
       spanh4.innerText = scoreSick;
       h4.appendChild(spanh4);

   var h5 =  document.createElement("h2"); 
       h5.innerText = "Количество смертей:";
       h5.id = "h5";
   var spanh5 = document.createElement("span");   
       spanh5.innerText = scoreDead;
       h5.appendChild(spanh5);
       gameBlock.appendChild(endGameBlock);
       endGameBlock.appendChild(h2);
       endGameBlock.appendChild(h3);
       endGameBlock.appendChild(h4);
       endGameBlock.appendChild(h5);
}











// Рандом
function random(max) 
{
    var rand = 1 + Math.random() * (max + 1);
    rand = Math.floor(rand);
    return rand;
}



/*========================================================
Создание элементов игры
=========================================================*/

// Создание элемента - дом
function createHouse(left, typeBuilding)
{
    var building = document.createElement("div");
    building.id = "building";
    building.style.left = left + "px";
    building.className = typeBuilding;

    var img = document.createElement("img");
    if(typeBuilding == "hospital") { img.src = "img/hospital.png"; }
    if(typeBuilding == "house") { img.src = "img/house.png"; }

    building.appendChild(img);
    gameBlock.appendChild(building);
}

// Создание элемента - человек
function createPeople()
{
    peopleCount++;
    var people = document.createElement("div");
    people.id = "people" + peopleCount;

    var choiceOfClass = random(100);
    if(choiceOfClass % 2 == 0) { people.className = "people healthy";  }
    else { people.className = "people sick"; }

    var dottedLine = document.createElement("div");
    dottedLine.className = "vl";

    people.appendChild(dottedLine);
    gameBlock.appendChild(people);
    return people;
}

// Создание жизней
function сreateLifes(newQuantityLifes)
{
    var lifes = document.createElement("div");
    lifes.id = "lifes";

    var count = 0;
    while (count != newQuantityLifes)
    {
        var life = document.createElement("span");
        life.id = "life";
        lifes.appendChild(life);
        count++;
    }
    gameBlock.appendChild(lifes);
}

// Создание очков
function createPoints()
{
    var points = document.createElement("div");
    points.id = "points";
    points.innerText = score;
    gameBlock.appendChild(points);
}

// Создание таймера игры
function createTimer()
{
    var h2 = document.createElement("h2");
    h2.innerText = "Время: ";

    var timer = document.createElement("span");
    timer.innerText = time;

    h2.appendChild(timer);
    infoBlock.appendChild(h2);

    peopleSpawner();

    // Функция отсчета таймера:
    var timeOut = setInterval (function() 
    {
        timer.innerText = timer.innerText - 1;
        if (timer.innerText == 0) 
        { 
            clearInterval(timeOut); 
            clearInterval(spawn);
            endGame();
        }
    }, 1000);
}

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

  

/*========================================================
Обработка элементов игры
=========================================================*/

// Обработка клику по человеку и подсчет очков
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

// Создание элемента человек и задание ему скорости
function randomMovement() 
{
    var people = createPeople();
    var dottedLine = people.querySelector(".vl")
    var speed = random(speedMax);
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
    }, 1600)
}










/*================================================
Удаление элиментов игры:
=================================================*/

function removeBuilding()
{
 var building = document.querySelector(".hospital");
 while (building != null)
 {
    building.remove();
    building = document.querySelector(".hospital");
 }
  var building = document.querySelector(".house");
  while (building != null)
  {
    building.remove();
    building = document.querySelector(".house");
  }
}
 

function removeTimer()
{
  var h2 = document.querySelector("h2");
      h2.remove();
}

 function removescoreSickEl()
 {
   var scoreSickEl = document.querySelector("div");  
       scoreSickEl.remove();
 }




























