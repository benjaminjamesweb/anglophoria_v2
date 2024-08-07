

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
