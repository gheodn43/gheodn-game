var doorImage1 = document.querySelector('#door1');
var doorImage2 = document.getElementById('door2');
var doorImage3 = document.getElementById('door3');
var startButton = document.getElementById('start');
var botDoorPath = "./images/robot.svg";
var beachDoorPath = "./images/beach.svg";
var spaceDoorPath = "./images/space.svg";
var current = 0;
var highscore = 0;
var numClosedDoors = 3;
var openDoor1;
var openDoor2;
var openDoor3;
var closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
var currentlyPlaying = true;
/*  https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg
    https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg
    https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg
    https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg
*/

function isBot(door) {
    if (door.src.includes(botDoorPath.replace(".", ""))) {
        return true;
    } else {
        return false;
    }
}
let isClicked = (x) => {
    if (x.src === closedDoorPath) {
        return false;
    } else {
        return true;
    }

}

function playDoor(door) {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver("win");
    } else if (isBot(door) === true) {
        gameOver();
    }

}

function randomChoreDoorGenerator() {
    choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor1 = beachDoorPath;
        openDoor2 = botDoorPath;
        openDoor3 = spaceDoorPath;
    } else {
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
        openDoor3 = botDoorPath;
    }

}

doorImage1.onclick = () => {
    if (!isClicked(doorImage1) && currentlyPlaying === true) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
    /* else {
        doorImage1.src = botDoorPath;
      }*/

}
doorImage2.onclick = () => {
    if (!isClicked(doorImage2) && currentlyPlaying === true) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
    /* else {
        doorImage2.src = botDoorPath;
      }*/

}
doorImage3.onclick = () => {
    if (!isClicked(doorImage3) && currentlyPlaying === true) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
    /*else {
       doorImage3.src = botDoorPath;
     }*/

}

function startRound() {
    doorImage1.src = closedDoorPath;
    doorImage2.src = closedDoorPath;
    doorImage3.src = closedDoorPath;
    numClosedDoors = 3;
    startButton.innerHTML = "Good Luck";
    currentlyPlaying = true;
    randomChoreDoorGenerator();
}

startButton.onclick = () => {
    startRound();
}

//xử lý game over
function gameOver(str) {
    let currentElement = document.getElementById("currentScore");
    if (str === "win") {
        startButton.innerHTML = "You win! Play again?";
        current++;
        //cập nhật high score
        if (current > highscore) {
            highscore = current;
            document.getElementById("highScore").innerHTML = highscore;
        }
        //cập nhật current
        currentElement.innerHTML = current;
    } else {
        startButton.innerHTML = "Game over! Play again?";
        current = 0;
        currentElement.innerHTML = 0;
    };
    currentlyPlaying = false;
}
//score 

startRound();
//randomChoreDoorGenerator();