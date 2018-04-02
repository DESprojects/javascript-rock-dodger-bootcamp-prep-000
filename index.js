const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null


//Check for collision
function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)
  console.log(top)
  if (top > 360) {

    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;

    //If rock position is the same as dodger, return true, else return false
    if ((rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
        (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) ||
        (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge))
        {

      return true;
    } else {
      return false;
    }
  }
}

// Create new rock at position x
function createRock(x) {
  const rock = document.createElement('div')
  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  //Add rock to DOM
  GAME.appendChild(rock);

  //Move rock down the screen
  function moveRock() {
    //Check for collision
    if(checkCollision(rock)){
       endGame();
     }//If no collision, change the position;
     else if(top < 400) {
           top += 2;
           rock.style.top = top + 'px';
           window.requestAnimationFrame(moveRock);
      }//Remove rock at bottom of screen
      else if(top >= 400){
        rock.remove();
      }
    }
  window.requestAnimationFrame(moveRock);

  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval);
  START.style.display = "block";
  window.removeEventListener('keydown', moveDodger);
  ROCKS.forEach(function(rock){
    rock.remove();
  })
  ROCKS.splice(0);
  console.log(ROCKS)
  alert('YOU LOSE');
}

function moveDodger(e) {

   if(e.which === LEFT_ARROW){
     window.requestAnimationFrame(moveDodgerLeft);
     e.preventDefault();
     e.stopPropagation();
   } else if (e.which === RIGHT_ARROW) {
     moveDodgerRight();
     e.preventDefault();
     e.stopPropagation();
   }
}

function moveDodgerLeft() {
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10);

     if(left > 0){
     DODGER.style.left = `${left - 8}px`
     }
}

function moveDodgerRight() {
   var leftNumbers = DODGER.style.left.replace('px', '')
   var left = parseInt(leftNumbers, 10);
   window.requestAnimationFrame(function(){
   if(left < 360){
   DODGER.style.left = `${left + 8}px`
   }
 });
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
