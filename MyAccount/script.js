
document.addEventListener('DOMContentLoaded', function() {
    const languageMap = {
        "en": "English",
        "en-US": "English (US)",
        "en-GB": "English (UK)",
        "es": "Spanish",
        "fr": "French",
        "de": "German",
        "zh": "Chinese",
        "zh-CN": "Chinese (Simplified)",
        "zh-TW": "Chinese (Traditional)",
        "ja": "Japanese",
        "ko": "Korean",
        "it": "Italian",
        "pt": "Portuguese",
        "pt-BR": "Portuguese (Brazil)",
        "pt-PT": "Portuguese (Portugal)",
        "ru": "Russian"
        // Add more mappings as needed
    };

    const detectedLanguageCode = navigator.language || navigator.userLanguage;
    const detectedLanguage = languageMap[detectedLanguageCode] || languageMap[detectedLanguageCode.split('-')[0]] || detectedLanguageCode;
    document.getElementById('detected-language').innerText = `Detected language: ${detectedLanguage}`;
});

document.getElementById('language-dropdown').addEventListener('change', function() {
    user_chosen_language = this.value;
    let nextButton = document.getElementById('next');
    nextButton.disabled = false;
    nextButton.classList.add('enabled');
});


function handleLevelClick(level, element) {
    user_chosen_level = level;

    // Update the message
    document.getElementById('selected-message').innerText = `You've selected ${level}`;

    // Remove the 'selected' class from all levels
    document.querySelectorAll('.levels p').forEach(p => p.classList.remove('selected'));

    // Add the 'selected' class to the clicked element
    element.classList.add('selected');

    console.log('User chosen level:', user_chosen_level);

    // Enable the Next button and trigger animation
    let nextButton = document.getElementById('next');
    nextButton.disabled = false;
    nextButton.classList.add('enabled');
}

// Add event listeners to the level buttons
document.getElementById('beginner').addEventListener('click', function() {
    handleLevelClick('Beginner', this);
});

document.getElementById('intermediate').addEventListener('click', function() {
    handleLevelClick('Intermediate', this);
});

document.getElementById('advanced').addEventListener('click', function() {
    handleLevelClick('Advanced', this);
});


document.getElementById('next').addEventListener('click', function() {
    if (user_chosen_level !== null && document.querySelector('.slide1').style.display !== 'none') {
        document.querySelector('.slide1').style.display = 'none';
        document.querySelector('.slide2').style.display = 'block';
        document.getElementById('selected-message').style.display = 'none';
        document.getElementById('next').disabled = true;
        document.getElementById('next').classList.remove('enabled');
    } else if (user_chosen_language !== null && document.querySelector('.slide2').style.display !== 'none') {
        document.querySelector('.slide2').style.display = 'none';
        document.querySelector('.slide3').style.display = 'block';
        document.getElementById('next').disabled = true;
        document.getElementById('next').classList.remove('enabled');
    } else if (user_chosen_version !== null && document.querySelector('.slide3').style.display !== 'none') {
        document.querySelector('.slide3').style.display = 'none';
        document.querySelector('.slide4').style.display = 'block';
        document.getElementById('selected-message2').style.display = 'none';
        document.getElementById('next').style.display = 'none';
        document.getElementById('finish').style.display = 'block';
    }
});

document.getElementById('language-dropdown').addEventListener('change', function() {
    user_chosen_language = this.value;
    let nextButton = document.getElementById('next');
    nextButton.disabled = false;
    nextButton.classList.add('enabled');
});

function handleVersionClick(version, element) {
    user_chosen_version = version;

    // Update the message
    document.getElementById('selected-message2').innerText = `You've selected the ${version} version`;

    // Remove the 'selected' class from all versions
    document.querySelectorAll('.versions div').forEach(div => div.classList.remove('selected'));

    // Add the 'selected' class to the clicked element
    element.classList.add('selected');

    console.log('User chosen version:', user_chosen_version);

    // Enable the Next button and trigger animation
    let nextButton = document.getElementById('next');
    nextButton.disabled = false;
    nextButton.classList.add('enabled');
}

// Add event listeners to the version divs
document.getElementById('free-version').addEventListener('click', function() {
    handleVersionClick('Free', this);
});

document.getElementById('premium-version').addEventListener('click', function() {
    handleVersionClick('Premium', this);
});

// Handle the checkbox clicks
document.getElementById('terms-checkbox').addEventListener('change', function() {
    checkFinishConditions();
});

document.getElementById('cookies-checkbox').addEventListener('change', function() {
    checkFinishConditions();
});

function checkFinishConditions() {
    const termsChecked = document.getElementById('terms-checkbox').checked;
    const cookiesChecked = document.getElementById('cookies-checkbox').checked;

    let finishButton = document.getElementById('finish');
    if (termsChecked && cookiesChecked) {
        finishButton.disabled = false;
        finishButton.classList.add('enabled');
    } else {
        finishButton.disabled = true;
        finishButton.classList.remove('enabled');
    }
}


document.getElementById('toggle-help').addEventListener('click', function() {
    var helpMessage = document.getElementById('help-message');
    if (helpMessage.style.display === 'none' || helpMessage.style.display === '') {
        helpMessage.style.display = 'block';
    } else {
        helpMessage.style.display = 'none';
    }
});