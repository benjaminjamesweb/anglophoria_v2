// Function to check if all fields in slide0 are filled
function checkSlide0Fields() {
    const nickname = document.querySelector('input[name="nickname"]').value;
    const dob = document.querySelector('input[name="dob"]').value;
    const country = document.querySelector('select[name="country"]').value;

    let nextButton = document.getElementById('next');

    if (nickname && dob && country) {
        nextButton.disabled = false;
        nextButton.classList.add('enabled');
    } else {
        nextButton.disabled = true;
        nextButton.classList.remove('enabled');
    }
}

// Add event listeners to slide0 fields to check if all fields are filled
document.querySelector('input[name="nickname"]').addEventListener('input', checkSlide0Fields);
document.querySelector('input[name="dob"]').addEventListener('input', checkSlide0Fields);
document.querySelector('select[name="country"]').addEventListener('change', checkSlide0Fields);

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
    };

    let user_chosen_level = null;
    let user_chosen_language = "en";
    let user_chosen_version = null;
    
    const detectedLanguageCode = navigator.language || navigator.userLanguage;
    const detectedLanguage = languageMap[detectedLanguageCode] || languageMap[detectedLanguageCode.split('-')[0]] || detectedLanguageCode;
    document.getElementById('detected-language').innerText = `Detected language: ${detectedLanguage}`;

    // Initially display slide0
    document.querySelector('.slide0').style.display = 'block';

    // Handle Next button click for all slides
    document.getElementById('next').addEventListener('click', function() {
        if (document.querySelector('.slide0').style.display !== 'none') {
            // Validate slide0 inputs
            const nickname = document.querySelector('input[name="nickname"]').value;
            const dob = document.querySelector('input[name="dob"]').value;
            const country = document.querySelector('select[name="country"]').value;

            if (nickname && dob && country) {
                // Transition from slide0 to slide1
                document.querySelector('.slide0').style.display = 'none';
                document.querySelector('.slide1').style.display = 'block';
            } else {
                alert('Please fill out all fields');
            }
        } else if (user_chosen_level !== null && document.querySelector('.slide1').style.display !== 'none') {
            // Transition from slide1 to slide2
            document.querySelector('.slide1').style.display = 'none';
            document.querySelector('.slide2').style.display = 'block';
            document.getElementById('selected-message').style.display = 'none';
        } else if (user_chosen_language !== null && document.querySelector('.slide2').style.display !== 'none') {
            // Transition from slide2 to slide3
            document.querySelector('.slide2').style.display = 'none';
            document.querySelector('.slide3').style.display = 'block';
        } else if (user_chosen_version !== null && document.querySelector('.slide3').style.display !== 'none') {
            // Transition from slide3 to slide4
            document.querySelector('.slide3').style.display = 'none';
            document.querySelector('.slide4').style.display = 'block';
            document.getElementById('selected-message2').style.display = 'none';
            document.getElementById('next').style.display = 'none';
            document.getElementById('finish').style.display = 'block';
        }
    });

    function handleLevelClick(level, element) {
        user_chosen_level = level;

        // Update the message
        document.getElementById('selected-message').innerText = `You've selected: ${level}`;

        // Remove the 'selected' class from all levels
        document.querySelectorAll('.levels p').forEach(p => p.classList.remove('selected'));

        // Add the 'selected' class to the clicked element
        element.classList.add('selected');

        // Enable the Next button and trigger animation for slide 1
        let nextButton = document.getElementById('next');
        nextButton.disabled = false;
        nextButton.classList.add('enabled');
    }

    // Add event listeners to the level buttons for slide 1
    document.getElementById('a1').addEventListener('click', function() {
        handleLevelClick('A1', this);
    });

    document.getElementById('a2').addEventListener('click', function() {
        handleLevelClick('A2', this);
    });

    document.getElementById('b1').addEventListener('click', function() {
        handleLevelClick('B1', this);
    });

    document.getElementById('b2').addEventListener('click', function() {
        handleLevelClick('B2', this);
    });

    document.getElementById('c1').addEventListener('click', function() {
        handleLevelClick('C1', this);
    });

    document.getElementById('c2').addEventListener('click', function() {
        handleLevelClick('C2', this);
    });

    function handleVersionClick(version, element) {
        user_chosen_version = version;

        // Update the message
        document.getElementById('selected-message2').innerText = `You've selected the ${version} version`;

        // Remove the 'selected' class from all versions
        document.querySelectorAll('.versions div').forEach(div => div.classList.remove('selected'));

        // Add the 'selected' class to the clicked element
        element.classList.add('selected');

        // Enable the Next button and trigger animation for slide 3
        let nextButton = document.getElementById('next');
        nextButton.disabled = false;
        nextButton.classList.add('enabled');
    }

    // Add event listeners to the version divs for slide 3
    document.getElementById('free-version').addEventListener('click', function() {
        handleVersionClick('Free', this);
    });

    document.getElementById('premium-version').addEventListener('click', function() {
        handleVersionClick('Premium', this);
    });

    // Handle the checkbox clicks for slide 4
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

    document.getElementById('toggle-help-1').addEventListener('click', function() {
        var helpMessage = document.getElementById('help-message-1');
        if (helpMessage.style.display === 'none' || helpMessage.style.display === '') {
            helpMessage.style.display = 'block';
        } else {
            helpMessage.style.display = 'none';
        }
    });

    document.getElementById('toggle-help-2').addEventListener('click', function() {
        var helpMessage = document.getElementById('help-message-2');
        if (helpMessage.style.display === 'none' || helpMessage.style.display === '') {
            helpMessage.style.display = 'block';
        } else {
            helpMessage.style.display = 'none';
        }
    });

    document.getElementById('toggle-help-3').addEventListener('click', function() {
        var helpMessage = document.getElementById('help-message-3');
        if (helpMessage.style.display === 'none' || helpMessage.style.display === '') {
            helpMessage.style.display = 'block';
        } else {
            helpMessage.style.display = 'none';
        }
    });


    document.getElementById('toggle-help-0').addEventListener('click', function() {
        var helpMessage = document.getElementById('help-message-0');
        if (helpMessage.style.display === 'none' || helpMessage.style.display === '') {
            helpMessage.style.display = 'block';
        } else {
            helpMessage.style.display = 'none';
        }
    });
});
