

/*
1. Для названий переменных лучше использовать полные имена, которые характеризуют вещь, 
   а не имена из нескольких букв. 
2. Зачем делать id для people с разными id? 
3. Зачем время? Игра до окончания жизней
*/




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

    // Функция отсчета таймера:
    var timeOut = setInterval (function() 
    {
        timer.innerText = timer.innerText - 1;
        if (timer.innerText == 0) { clearInterval(timeOut); }
    }, 1000);
}

  

/*========================================================
Обработка элементов игры
=========================================================*/

// Создание элемента человек и задание ему скорости
// function randomMovement() 
// {
//     var people = createPeople();
//     var dottedLine = people.querySelector(".vl")
//     var speed = random(4);
//     var opacity = 1;

//     var running = setInterval(function() 
//     {
//         people.style.left = people.offsetLeft + speed + "px";
//         if(people.offsetLeft > 1000)
//         {
//             clearInterval(running);
//             people.remove();
//         }
//     }, 20);

//     people.onmousemove = function() 
//     {
//         dottedLine.style.display = "block";
//     }

//     people.onmouseleave = function() 
//     {
//         dottedLine.style.display = "none";
//     }

//     people.onclick = function() 
//     {
//         clearInterval(running);
//         dottedLine.style.display = "none";
//         people.onclick = null;
//         people.onmousemove = null;
//         people.onmouseleave = null;

//         var timer = setInterval(function() 
//         {
//             people.style.top = people.offsetTop - 4 + 'px';
//             people.style.opacity = opacity;
//             opacity = (opacity - 0.02).toFixed(2);
//             if(opacity == 0.0) 
//             {
//                 clearInterval(timer);
//                 people.remove();
//             }
//         }, 20);
//     }

// }

// Генерация людей 
// function peopleSpawner() 
// {
//     spawn = setInterval(function () 
//     {
//         randomMovement();
//     }, 2000)
// }
