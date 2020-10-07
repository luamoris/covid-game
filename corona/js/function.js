var gameBlock = document.querySelector("#gameBlock");
var infoBlock = document.querySelector("#infoBlock");
// Счет в игре:
var i = 0;




/*========================================================
Cоздание Элиментов Игры:
=========================================================*/


// Создание домов 
function createBuildings()
{

var buildings = document.createElement("div");
buildings.id = "buildings";
gameBlock.appendChild(buildings);

var t = random(2);
if (t == 1) 
{
	// Жилые дома
	buildings.className = " buildings resedential1 ";
	// Больницы
	buildings.className = " buildings treatment1";

	buildings.className = " buildings resedential2 ";
    
    buildings.className = " buildings treatment2";
}else
{
	buildings.className = " buildings resedential1 ";

	buildings.className = " buildings treatment1";

	buildings.className = " buildings resedential2 ";
    
    buildings.cclassName = " buildings treatment2";
}

}
createBuildings();





// Создание людей:
var peopleNum = 0;
function createPeople()
{
  peopleNum++;
var people = document.createElement("div");
    people.id = "people" +peopleNum;
    gameBlock.appendChild(people);
var y = random(2) ;   
if ( y == 1 )
{
	people.className = "people healthy";
}else

   people.className = "people sick";
}







// Создание жизней:

function сreateLifes()
{
var lifes = document.createElement("div");
lifes.id = "lifes";
gameBlock.appendChild(lifes);

// Желаемое кол-во жизней:
var e = 5 ;
// Текущее кол-во жизней:
var r = 0;

// Цикл,создающий жизни:
while (r < e)
{
span = document.createElement("span");
span.id = "lfs";
lifes.appendChild(span);
r++;
}
}

сreateLifes();


// Создание очков:

 function createPoints()
{
var points = document.createElement("div");
points.id = "points";
points.innerText = i ;
gameBlock.appendChild(points);

}
createPoints();



// Создание таймера игры:

function createTimer()

{
var h2 = document.createElement("h2");
       h2.id = "h2";
       h2.innerText = "Время:";
       infoBlock.appendChild(h2);
       
var timer = document.createElement("span");
     
     h2.appendChild(timer);
     timer.innerText = 10;



// Функция отсчета таймера:
 var timeOut = setInterval (function() 
 {
  timer.innerText = timer.innerText - 1;
  // Условие при выполнении которого,таймер завершается,игра прекращается:
  if (timer.innerText == 0)
{ 
    clearInterval(timeOut);
       
}

 }, 1000);
}

createTimer();






// Рандом:
function random(max)
{
	var rand = 1 + Math.random() * (max + 1);
	rand = Math.floor(rand);
	return rand;
}

function RandomMovement() {
      createPeople();
      var speed = random(5);
      console.log(speed);
      var people = document.querySelector("#people" + peopleNum);  
  var running = setInterval(function() {

        people.style.left = people.offsetLeft + speed + "px";
if(people.offsetLeft > 1000){
    clearInterval(running);
    clearInterval(spawn);
  }

  }, 20)
  
  setTimeout(function() {
    

  }, 10000)
}
        

var spawn;
function peopleSpawner() {
  spawn = setInterval(function () {
    RandomMovement();
  }, 1000)
 
}
peopleSpawner();






















