
/*========================================================
Дополнительные функции
=========================================================*/

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

    var colorEl = document.createElement("div");
    colorEl.id = "img-block";
    var img = document.createElement("img");
    colorEl.appendChild(img);

    var choiceOfClass = random(100);
    if(choiceOfClass % 2 == 0) 
    { 
        people.className = "people healthy";  
        img.src = "img/healthy1.png";
    }
    else 
    { 
        people.className = "people sick"; 
        if(choiceOfClass >= 50) { img.src = "img/sick1.png"; }
        else { img.src = "img/sick2.png"; }
    }

    var dottedLine = document.createElement("div");
    dottedLine.className = "vl";

    people.appendChild(dottedLine);
    people.appendChild(colorEl);
    gameBlock.appendChild(people);
    return people;
}

// Создание таймера игры
function createTimer()
{
    var h2 = document.createElement("h2");
    h2.id = "game-time";
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
            var isEnd = setInterval(function() 
            {
                if(document.querySelector(".people") == null)
                {
                    clearInterval(isEnd);
                    gameover();
                }
            }, 100);
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
    scoreSick = 0;
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
    scoreHealthy = 0;
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
    scoreDead = 0;
    quantityDeadEl.innerText = scoreDead;

    colorEl.appendChild(img);
    scoreDeadEl.appendChild(colorEl);
    scoreDeadEl.appendChild(quantityDeadEl);
    infoBlock.appendChild(scoreDeadEl);
}

//Создание старт блока
function createStartBlock() 
{
    gameName();
    startBlock = document.createElement("div");
    startBlock.id = "start-block";

    startButton = document.createElement("button");
    startButton.id = "start-button";
    startButton.innerText = "Начать";

    startBlock.appendChild(startButton);
    gameBlock.appendChild(startBlock);

    // return startButton;
} 

// Создание блока с названием игры
function gameName()
{
    gameName = document.createElement("h2");
    gameName.id = "game-name";
    gameName.innerText = "COVID GAME";
    infoBlock.appendChild(gameName);
}

// Блок конца игры
function createEndGameBlock()
{
    endGameBlock = document.createElement("div");
    endGameBlock.id = "end-game-block";

    var result = document.createElement("h2");
    result.id = "result";

    if(scoreDead + scoreSick >= scoreHealthy) 
    {
        result.innerText = "Вы допустили распространение эпидемии COVID-19 до появления вакцины";
        endGameBlock.style.color = "#c96b74";
    } 
    else 
    {
        result.innerText = "Вам удалось остановить расспростронение эпидемии Covid-19 до появления вакцины";
        endGameBlock.style.color = "#6ca452";
    }

    var statistic = document.createElement("div");
    statistic.id = "statistic";

    var stat = document.createElement("h3")
    stat.innerText = "Статистика:";
    statistic.appendChild(stat);
    
    var healthy = document.createElement("h3")
    healthy.innerText = "Количество здоровых: " + scoreHealthy;
    statistic.appendChild(healthy);

    var sick = document.createElement("h3")
    sick.innerText = "Количество больных: " + scoreSick;
    statistic.appendChild(sick);

    var dead = document.createElement("h3")
    dead.innerText = "Количество смертей: " + scoreDead;
    statistic.appendChild(dead);

    restartButton = document.createElement("button");
    restartButton.id = "restart-button";
    restartButton.innerText = "Попробовать снова";

    endGameBlock.appendChild(result);
    endGameBlock.appendChild(statistic);
    endGameBlock.appendChild(restartButton);
    gameBlock.appendChild(endGameBlock);
}

// Создание вакцины
function createVaccine()
{
    var vaccineBlock = document.createElement("div");
    vaccineBlock.id = "vaccine-block";

    var vaccine = document.createElement("div");
    vaccine.id = "vaccine";

    var loader = document.createElement("div");
    loader.id = "loader";

    var colorEl = document.createElement("div");
    var img = document.createElement("img");
    img.src = "img/vaccine.png";

    colorEl.appendChild(img);
    vaccine.appendChild(loader);

    vaccineBlock.appendChild(colorEl);
    vaccineBlock.appendChild(vaccine);

    infoBlock.appendChild(vaccineBlock);
}

// Создание всех элементов для игры 
function createGameElements()
{
    setTimeout(function() 
    {
        createHouse(120, "hospital");
        createHouse(340, "house");
        createHouse(560, "hospital");
        createHouse(780, "house");

        createScoreDead();
        createScoreSick();
        createScoreHealthy();

        createTimer();

        createVaccine();
        loading(time);

    }, 200);
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

    if( (left >= 95 && left <= 210) || (left >= 535 && left <= 650) )
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
    else if( (left >= 315 && left <= 430) || (left >= 755 && left <= 870) )
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

    people.onmouseover = function() 
    {
        dottedLine.style.display = "block";
        people.style.boxShadow = "0 0 2px white";
    }

    people.onmouseleave = function() 
    {
        dottedLine.style.display = "none";
        people.style.boxShadow = "none";
    }

    people.onclick = function() 
    {
        scoring(people);
        clearInterval(running);
        dottedLine.style.display = "none";
        people.onclick = null;
        people.onmouseover = null;
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
    }, 1000)
}

// Анимация вакцины 
function loading(seconds) 
{
    let load = document.querySelector("#loader");
    let line = 0.0;
    load.style.width = line + "px";

    let speedLoading = Math.floor(((seconds / 146) * 0.1) * 1000);

    let tim = setInterval(function() {
        line += 0.1;
        load.style.width = line + "px";
        if(Math.floor(line) == 146) 
        { 
            clearInterval(tim); 
        }
    }, speedLoading);
}

/*================================================
Удаление элиментов игры:
=================================================*/

// Удаление домов
function removeBuilding()
{
    var building = document.querySelector(".hospital");
    while (building != null)
    {
        building.remove();
        building = document.querySelector(".hospital");
    }

    building = document.querySelector(".house");
    while (building != null)
    {
        building.remove();
        building = document.querySelector(".house");
    }
}

// Удаление людей
function removePeople()
{
    var person = document.querySelector(".people");
    while(person != null)
    {
        person.remove();
        person = document.querySelector(".people");
    }
}
 
// Удаление таймера
function removeTimer()
{
    var timer = document.querySelector("#game-time");
    timer.remove();
}

// Удаление блоков счета
function removeScore()
{
    var scoreSick = document.querySelector("#score-sick");  
    scoreSick.remove();

    var scoreHealthy = document.querySelector("#score-healthy");  
    scoreHealthy.remove();

    var scoreDead = document.querySelector("#score-dead");  
    scoreDead.remove();
}

// Удаление вакцины
function removeVaccine()
{
    var vaccineBlock = document.querySelector("#vaccine-block");
    vaccineBlock.remove();
}

/*=================================================THE END=================================================*/