function toggleMenu() {
    var menu = document.getElementById("side-menu");
    if (menu.style.width === "250px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "250px";
    }
}


document.querySelectorAll('.game-tile').forEach(tile => {
    tile.addEventListener('click', function(event) {
        event.preventDefault();
        
        const detailsSection = document.getElementById('game-details');
        const title = this.dataset.title;
        const imgSrc = this.dataset.img;
        const level = this.dataset.level;
        const category = this.dataset.category;

        if (detailsSection.style.display === 'flex' &&
            document.getElementById('game-title').textContent === title) {
            detailsSection.style.display = 'none';
        } else {
            document.getElementById('game-title').textContent = title;
            document.getElementById('game-image').src = imgSrc;
            document.getElementById('game-level').textContent = level;
            document.getElementById('game-category').textContent = category;

            if (!document.getElementById('levelsDropdown')) {
                const newContent = `
                    <select id="levelsDropdown">
                        <option value="a1" selected>A1</option>
                        <option value="a2">A2</option>
                        <option value="b1">B1</option>
                        <option value="b2">B2</option>
                        <option value="c1">C1</option>
                        <option value="c2">C2</option>
                    </select>
                `;
                detailsSection.querySelector('.inner').insertAdjacentHTML('beforeend', newContent);
            }

            detailsSection.style.display = 'flex';
        }
    });
});const ingredients = [
    'apple', 'banana', 'carrot', 'grape', 'lettuce', 'mango', 'onion', 'orange', 
    'pear', 'pepper', 'potato', 'pumpkin', 'strawberry', 'tomato', 'watermelon'
    // Add more as needed
];

const pointsPerTurn = 10;
const pointsDeducted = 5;

let gamePoints = 0;
let gameTime = 60;
let turnTime = 5;

let currentIngredient = '';
let turnInterval;
let gameInterval;
let pauseInterval;

const pointsEarnedElement = document.querySelector('.points-earned');
const gameCountdownElement = document.querySelector('.game-countdown');
const turnCountdownElement = document.querySelector('.turn-countdown');
const ingredientsDisplayElement = document.querySelector('.ingredients-display');
const speechBubbleElement = document.getElementById('speech-bubble');
const hornSound = document.getElementById('horn-sound');
const mainContentElement = document.querySelector('.main-content');
const startOverlayElement = document.getElementById('start-overlay');
const startGameButton = document.getElementById('start-game-button');
const instructionsButton = document.getElementById('instructions-button');
const instructionsOverlayElement = document.getElementById('instructions-overlay');
const closeInstructionsButton = document.getElementById('close-instructions-button');

startGameButton.addEventListener('click', () => {
    startOverlayElement.style.display = 'none';
    mainContentElement.style.display = 'block';
    startGame();
});

instructionsButton.addEventListener('click', () => {
    instructionsOverlayElement.style.display = 'flex';
});

closeInstructionsButton.addEventListener('click', () => {
    instructionsOverlayElement.style.display = 'none';
});

function startGame() {
    displayIngredients();
    startGameCountdown();
    startTurn();
}

function displayIngredients() {
    ingredients.forEach(ingredient => {
        const img = document.createElement('img');
        img.src = `${ingredient}.jpg`;
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
    currentIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    speechBubbleElement.textContent = `Find the ${currentIngredient}!`;
    turnTime = 5;
    updateTurnCountdown();

    turnInterval = setInterval(() => {
        turnTime--;
        updateTurnCountdown();
        if (turnTime < 0) {
            clearInterval(turnInterval);
            indicateTurnLoss();
        }
    }, 1000);
}

function updateTurnCountdown() {
    turnCountdownElement.textContent = `Turn Time: ${turnTime}`;
    turnCountdownElement.style.color = 'white';
}

function checkIngredient(ingredient) {
    if (ingredient === currentIngredient) {
        gamePoints += pointsPerTurn;
        pointsEarnedElement.textContent = `Points: ${gamePoints}`;
        clearInterval(turnInterval);
        startTurn();
    } else {
        gamePoints -= pointsDeducted;
        pointsEarnedElement.textContent = `Points: ${gamePoints}`;
        pointsEarnedElement.style.color = 'red';
        setTimeout(() => {
            pointsEarnedElement.style.color = 'white';
        }, 500);
    }
}
function indicateTurnLoss() {
    turnCountdownElement.textContent = `Turn Time: 0`;
    turnCountdownElement.style.color = 'red';
    hornSound.play();
    setTimeout(() => {
        turnCountdownElement.style.color = 'white';
        startTurn();
    }, 2000);
}
const replayGameButton = document.getElementById('replay-game-button');

replayGameButton.addEventListener('click', () => {
    gamePoints = 0;
    gameTime = 60;
    pointsEarnedElement.textContent = `Points: ${gamePoints}`;
    gameCountdownElement.textContent = `Game Time: ${gameTime}`;
    startOverlayElement.style.display = 'none';
    replayGameButton.style.display = 'none';
    mainContentElement.style.display = 'block';
    startGame();
});

function endGame() {
    clearInterval(turnInterval);
    speechBubbleElement.textContent = `Game over! You scored ${gamePoints} points.`;
    hornSound.play();
    replayGameButton.style.display = 'block';
}