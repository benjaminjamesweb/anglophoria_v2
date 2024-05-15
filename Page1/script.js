const numSnowflakes = 100;

for (let i = 0; i < numSnowflakes; i++) {
    createSnowflake();
}

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 3}s`;
    snowflake.style.animationDelay = `${Math.random() * 3}s`;
    document.querySelector('.snowflakes').appendChild(snowflake);
}

var currentMessageIndex = -1; // Start with no message displayed

function showNextMessage() {
    var messages = document.querySelectorAll(".message");

    // Hide the current message (if any)
    if (currentMessageIndex >= 0) {
        messages[currentMessageIndex].style.display = "none";

        // If the current message is message 3, hide the map image
        if (currentMessageIndex === 2) {
            document.querySelector(".map").style.display = "none";
        }
    }

    // Move to the next message or reset to no message if reached the end
    currentMessageIndex = (currentMessageIndex + 1) % (messages.length + 1);

    // Show the next message if it exists
    if (currentMessageIndex < messages.length) {
        messages[currentMessageIndex].style.display = "block";

        // If the next message is message 3, show the map image
        if (currentMessageIndex === 2) {
            document.querySelector(".map").style.display = "block";
        }
    } else {
        // Reset to no message displayed
        currentMessageIndex = -1;
    }
}


var chosenDifficulty = ""; // Global variable to store the chosen difficulty

function saveDifficulty(difficulty) {
    // Update the global variable with the chosen difficulty
    chosenDifficulty = difficulty;

    // Update the displayed level in message 4
    document.getElementById("chosenLevel").textContent = chosenDifficulty;

    // Here you can perform any additional actions related to saving the difficulty
    document.getElementById("message3").style.display = "none";
    document.getElementById("message4").style.display = "block";
}

function goBack() {
    // Go back to message 3 (assuming message 3 is the previous message)
    document.getElementById("message3").style.display = "block";
    document.getElementById("message4").style.display = "none";
}

function goToNextMessage() {
    // Go to the next message (assuming message 5 is the next message)
    document.getElementById("message5").style.display = "block";
    document.getElementById("message4").style.display = "none";
}

var username = ""; // Global variable to store the username

function saveUsername() {
    // Get the value entered in the username input field
    var usernameInput = document.getElementById("usernameInput").value;

    // Save the username as a global variable
    username = usernameInput;

    document.getElementById("displayedUsername").textContent = usernameInput;

    document.getElementById("message5").style.display = "none";
    document.getElementById("message6").style.display = "block";
}

function enterAnglophoria() {
    // Redirect the user to page1.html
    window.location.href = "../Page1/page1.html";
}

function restart() {
    // Take the user back to message 1 (assuming message 1 is the first message)
    document.getElementById("message6").style.display = "none";
    document.getElementById("message1").style.display = "block";
}