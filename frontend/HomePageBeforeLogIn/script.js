async function signUp(event) {
  event.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const newUser = {
    email,
    password
  };

  try {
    const createdUser = await fetch('/users/signup', {  // Full URL
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });

    // Check response type
    if (createdUser.headers.get('content-type')?.includes('application/json')) {
      const createdUserJSON = await createdUser.json();
      if (createdUserJSON) {
        alert(createdUserJSON.message);
      }
    } else {
      console.error('Unexpected response:', await createdUser.text());
      alert('Received unexpected response from the server.');
    }
  } catch (error) {
    console.error('Error during signup:', error);  // Detailed logging
    alert('There was an error!');
  }
}

async function logIn(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userSigninData = {
    email,
    password
  };

  try {
    const loggedInUser = await fetch('/users/login', {  // Full URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userSigninData)
    });

    if (loggedInUser.headers.get('content-type')?.includes('application/json')) {
      const loggedInUserJSON = await loggedInUser.json();
      if (loggedInUserJSON) {
        localStorage.setItem('token', loggedInUserJSON.data.token);
        alert(loggedInUserJSON.message);
        window.location.href = '../HomePage/index.html';
      }
    } else {
      console.error('Unexpected response:', await loggedInUser.text());
      alert('Received unexpected response from the server.');
    }
  } catch (error) {
    console.error('Error during login:', error);  // Detailed logging
    alert('There was an error!');
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
