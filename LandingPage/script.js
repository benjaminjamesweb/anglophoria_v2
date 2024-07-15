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
    }

    // Move to the next message or reset to no message if reached the end
    currentMessageIndex = (currentMessageIndex + 1) % (messages.length + 1);

    // Show the next message if it exists
    if (currentMessageIndex < messages.length) {
        messages[currentMessageIndex].style.display = "block";
    } else {
        // Reset to no message displayed
        currentMessageIndex = -1;
    }
}
