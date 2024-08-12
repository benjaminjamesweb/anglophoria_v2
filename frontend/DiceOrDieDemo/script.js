function toggleMenu() {
    const menu = document.getElementById("side-menu");
    menu.style.width = (menu.style.width === "250px") ? "0" : "250px";
}

document.getElementById('restart-button').addEventListener('click', function() {
    restartGame();
});

document.getElementById('start-game-button').addEventListener('click', () => {
    document.getElementById('pre-game-display').style.display = 'none';
    document.getElementById('game-display').style.display = 'block';
    startGame();
});

const ingredients = [
    'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 'apple', 
];

const pointsPerTurn = 10;
const pointsDeducted = 5;

let gamePoints = 0;
let gameTime = 60;
let turnTime = 5;

let currentIngredient = '';
let turnInterval;
let gameInterval;

const pointsEarnedElement = document.querySelector('.points-earned');
const gameCountdownElement = document.querySelector('.game-countdown');
const turnCountdownElement = document.querySelector('.turn-countdown');
const ingredientsDisplayElement = document.querySelector('.ingredients-display');
const speechBubbleElement = document.getElementById('speech-bubble');
const hornSound = document.getElementById('horn-sound');
const replayGameButton = document.getElementById('replay-game-button');
const instructionsButton = document.getElementById('instructions-button');
const instructionsOverlayElement = document.getElementById('instructions-overlay');
const closeInstructionsButton = document.getElementById('close-instructions-button');

instructionsButton.addEventListener('click', () => {
    instructionsOverlayElement.style.display = 'flex';
});

closeInstructionsButton.addEventListener('click', () => {
    instructionsOverlayElement.style.display = 'none';
});

replayGameButton.addEventListener('click', () => {
    gamePoints = 0;
    gameTime = 60;
    pointsEarnedElement.textContent = `Points: ${gamePoints}`;
    gameCountdownElement.textContent = `Game Time: ${gameTime}`;
    replayGameButton.style.display = 'none';
    startGame();
});

function startGame() {
    displayIngredients();
    startGameCountdown();
    startTurn();
}

function restartGame() {
    gamePoints = 0;
    gameTime = 60;
    turnTime = 5;
    pointsEarnedElement.textContent = `Points: ${gamePoints}`;
    gameCountdownElement.textContent = `Game Time: ${gameTime}`;
    turnCountdownElement.textContent = `Turn Time: ${turnTime}`;
    replayGameButton.style.display = 'none'; 
    startGame();
}

function displayIngredients() {
    ingredientsDisplayElement.innerHTML = ''; 
    ingredients.forEach(ingredient => {
        const img = document.createElement('img');
        img.src = `Images/${ingredient}.png`;
        img.alt = ingredient;
        img.addEventListener('click', () => checkIngredient(ingredient));
        ingredientsDisplayElement.appendChild(img);
    });
}

function startGameCountdown() {
    gameInterval = setInterval(() => {
        gameTime--;
        gameCountdownElement.textContent = `Game Time: ${gameTime}`;
        if (gameTime <= 0) {
            clearInterval(gameInterval);
            endGame();
        }
    }, 1000);
}

function startTurn() {
    clearInterval(turnInterval); 
    currentIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    speechBubbleElement.textContent = `Dice the ${currentIngredient}!`;
    speechBubbleElement.style.color = 'white';
    turnTime = 5;
    updateTurnCountdown();

    console.log("Starting new turn with ingredient:", currentIngredient);

    turnInterval = setInterval(() => {
        turnTime--;
        updateTurnCountdown();
        if (turnTime < 0) {
            clearInterval(turnInterval);
            indicateTurnLoss();
        }
    }, 1000);
}

function indicateTurnLoss() {
    turnCountdownElement.textContent = `Turn Time: 0`;
    turnCountdownElement.style.color = 'red';
    speechBubbleElement.textContent = 'Times up!';
    speechBubbleElement.style.color = 'red';
    hornSound.play();
    setTimeout(() => {
        turnCountdownElement.style.color = 'white';
        startTurn(); 
    }, 2000);
}

function updateTurnCountdown() {
    turnCountdownElement.textContent = `Turn Time: ${turnTime}`;
    turnCountdownElement.style.color = turnTime < 0 ? 'red' : 'white';
}

function checkIngredient(ingredient) {
    if (ingredient === currentIngredient) {
        gamePoints += pointsPerTurn;
        pointsEarnedElement.textContent = `Points: ${gamePoints}`;
        clearInterval(turnInterval);
        setTimeout(startTurn, 500); 
    } else {
        gamePoints -= pointsDeducted;
        pointsEarnedElement.textContent = `Points: ${gamePoints}`;
        pointsEarnedElement.style.color = 'red';
        setTimeout(() => {
            pointsEarnedElement.style.color = 'white';
        }, 500);
    }
}

function endGame() {
    clearInterval(turnInterval);
    clearInterval(gameInterval);
    speechBubbleElement.textContent = `Imbecile! You only scored ${gamePoints} points!`;
    hornSound.play();
    replayGameButton.style.display = 'block';
}
