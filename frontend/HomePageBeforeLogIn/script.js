const apiBaseUrl = 'http://localhost:5000';

async function signUp() {
  const username = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const response = await fetch(`${apiBaseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Sign up successful');
    } else {
      alert(`Failed to sign up: ${data.error}`);
    }
  } catch (error) {
    alert(`Failed to sign up: ${error.message}`);
  }
}

async function logIn() {
  const username = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful');
    } else {
      alert(`Failed to log in: ${data.error}`);
    }
  } catch (error) {
    alert(`Failed to log in: ${error.message}`);
  }
}
  

document.querySelectorAll('.game-tile').forEach(tile => {
  tile.addEventListener('click', function(event) {
      event.preventDefault();
      
      const detailsSection = document.getElementById('game-details');
      const title = this.dataset.title;
      const imgSrc = this.dataset.img;
      const level = this.dataset.header;
      const category = this.dataset.description;

      if (detailsSection.style.display === 'flex' &&
          document.getElementById('game-title').textContent === title) {
          detailsSection.style.display = 'none';
      } else {
          document.getElementById('game-title').textContent = title;
          document.getElementById('game-image').src = imgSrc;
          document.getElementById('game-level').textContent = level;
          document.getElementById('game-category').innerHTML = category;

          if (!document.getElementById('levelsDropdown')) {
              const newContent = `
              <div class="confirm-level">
              <p> Confirm your level: </p>
                  <select id="levelsDropdown">
                      <option value="a1" selected>A1</option>
                      <option value="a2">A2</option>
                      <option value="b1">B1</option>
                      <option value="b2">B2</option>
                      <option value="c1">C1</option>
                      <option value="c2">C2</option>
                  </select>
                  </div>
                  <div class="button-div"> 
                  <p>Log in to play! Or, play a demo: </p>
                <button class="playButton" onclick="window.location.href='../DiceOrDieDemo/index.html'">Demo Game</button></div>
              `;
              detailsSection.querySelector('.inner').insertAdjacentHTML('beforeend', newContent);
          }

          detailsSection.style.display = 'flex';
      }
  });
});

function closeGameDetails() {
  var gameDetails = document.getElementById("game-details");
  if (gameDetails) {
      // Hide the game details by setting display to 'none'
      gameDetails.style.display = "none";
  }
}

function toggleMenu() {
  var menu = document.getElementById("side-menu");
  if (menu.style.width === "250px") {
    hideAllSections();
      menu.style.width = "0";
  } else {
      menu.style.width = "250px";
  }
}

function hideAllSections() {
  // Hide all sections
  document.getElementById('login').style.display = 'none';
  document.getElementById('signup').style.display = 'none';
}

function showSection(sectionId) {
  hideAllSections(); // Ensure all sections are hidden before showing the new one

  var sectionDiv = document.getElementById(sectionId);
  sectionDiv.style.display = 'block';

  // Adjust the position of the section
  var links = document.querySelector('.links');
  var linkElement = links.querySelector(`a[onclick="toggle${capitalizeFirstLetter(sectionId)}()"]`);

  sectionDiv.style.top = linkElement.offsetTop + 'px';
}

function toggleParameters() {
  if (document.getElementById('parameters').style.display === 'block') {
      hideAllSections();
  } else {
      showSection('parameters');
  }
}

function toggleLogin() {
  var loginSection = document.getElementById("login");
  var signupSection = document.getElementById("signup");
  var welcomeSection = document.querySelector(".welcome-section");
  var loginLink = document.querySelector("a[onclick='toggleLogin()']");
  var signupLink = document.querySelector("a[onclick='toggleSignUp()']");

  // Hide signup section and signup link if it's visible
  if (signupSection.style.display === "block") {
      signupSection.style.display = "none";
      signupLink.style.display = "block";
  }

  // Toggle login section
  if (loginSection.style.display === "none" || loginSection.style.display === "") {
      loginSection.style.display = "block";
      welcomeSection.style.display = "none";  // Hide welcome section
      loginLink.style.display = "none"; // Hide login link
      signupLink.style.display = "none";
  } else {
      loginSection.style.display = "none";
      welcomeSection.style.display = "block"; // Show welcome section
      loginLink.style.display = "block"; // Show login link
  }
}

function toggleSignUp() {
  var signupSection = document.getElementById("signup");
  var loginSection = document.getElementById("login");
  var welcomeSection = document.querySelector(".welcome-section");
  var signupLink = document.querySelector("a[onclick='toggleSignUp()']");
  var loginLink = document.querySelector("a[onclick='toggleLogin()']");

  // Hide login section and login link if it's visible
  if (loginSection.style.display === "block") {
      loginSection.style.display = "none";
      loginLink.style.display = "block";
  }

  // Toggle signup section
  if (signupSection.style.display === "none" || signupSection.style.display === "") {
      signupSection.style.display = "block";
      welcomeSection.style.display = "none";  // Hide welcome section
      signupLink.style.display = "none"; // Hide signup link
      loginLink.style.display = "none";
  } else {
      signupSection.style.display = "none";
      welcomeSection.style.display = "block"; // Show welcome section
      signupLink.style.display = "block"; // Show signup link
  }
}


function toggleContact() {
  if (document.getElementById('contact').style.display === 'block') {
      hideAllSections();
  } else {
      // Reset the contact section to its initial state
      resetContactForm();
      showSection('contact');
  }
}

function resetContactForm() {
  // Show the contact section
  var contactSection = document.querySelector('.contact-section');
  contactSection.style.display = 'block';

  // Hide the submitted query message
  var submittedQuery = document.querySelector('.submitted-query');
  submittedQuery.style.display = 'none';

  // Optional: You can also clear the form fields if desired
  document.getElementById('subject').value = '';
  document.getElementById('query').value = '';
}

function toggleMyAccount() {
  if (document.getElementById('my-account').style.display === 'block') {
      hideAllSections();
  } else {
      showSection('my-account');
  }
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function editAccount() {
  // Enable editing
  document.getElementById('email').removeAttribute('readonly');
  document.getElementById('account-type').removeAttribute('disabled');
  document.getElementById('payments').removeAttribute('disabled');

  // Show save and cancel buttons
  document.getElementById('saveBtn').style.display = 'inline-block';
  document.getElementById('cancelBtn').style.display = 'inline-block';

  // Hide edit button
  document.getElementById('editBtn').style.display = 'none';
}

function saveChanges() {
  // Save changes logic here (e.g., send data to the server)

  // Reset to view-only mode
  resetAccountView();
}

function cancelChanges() {
  // Reset to view-only mode without saving
  resetAccountView();
}

function resetAccountView() {
  // Disable editing
  document.getElementById('email').setAttribute('readonly', true);
  document.getElementById('account-type').setAttribute('disabled', true);
  document.getElementById('payments').setAttribute('disabled', true);

  // Show edit button
  document.getElementById('editBtn').style.display = 'inline-block';

  // Hide save and cancel buttons
  document.getElementById('saveBtn').style.display = 'none';
  document.getElementById('cancelBtn').style.display = 'none';
}

function submitQuery() {
  // Hide the contact section
  var contactSection = document.querySelector('.contact-section');
  contactSection.style.display = 'none';

  // Show the submitted query message
  var submittedQuery = document.querySelector('.submitted-query');
  submittedQuery.style.display = 'block';
}