

function toggleMenu() {
  var menu = document.getElementById("side-menu");
  var gameDetails = document.getElementById("game-details");
  var mainContent = document.querySelector(".main-content");

  if (menu.style.width === "250px") {
      hideAllSections();
      menu.style.width = "0";
  } else {
      menu.style.width = "250px";
      menu.style.zIndex = 10; // Ensure side menu is on top
      mainContent.style.zIndex = 5; // Ensure main content is behind
  }

  // If game details are open, ensure they're on top
  if (gameDetails.style.display === 'flex') {
      gameDetails.style.zIndex = 20;
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
                <button class="playButton" onclick="window.location.href='../DiceOrDie/index.html'">Play</button>
              `;
              detailsSection.querySelector('.inner').insertAdjacentHTML('beforeend', newContent);
          }

          detailsSection.style.display = 'flex';
      }
  });
});

function editPaymentInfo() {
  // Enable editing for payment info fields
  document.getElementById('credit-card-number').removeAttribute('readonly');
  document.getElementById('expiry-date').removeAttribute('readonly');
  document.getElementById('cvv').removeAttribute('readonly');
  document.getElementById('payments').removeAttribute('disabled');

  // Change background and text color to indicate editable fields
  document.getElementById('credit-card-number').style.backgroundColor = 'rgb(240, 240, 240)';
  document.getElementById('payment-info-section').style.backgroundColor = 'rgb(60, 60, 60)';
  document.getElementById('buttons-div').style.backgroundColor = 'rgb(60, 60, 60)';
  document.getElementById('credit-card-number').style.color = 'rgb(0, 0, 0)';
  document.getElementById('expiry-date').style.backgroundColor = 'rgb(240, 240, 240)';
  document.getElementById('expiry-date').style.color = 'rgb(0, 0, 0)';
  document.getElementById('cvv').style.backgroundColor = 'rgb(240, 240, 240)';
  document.getElementById('cvv').style.color = 'rgb(0, 0, 0)';

  // Show save and cancel buttons, hide edit button
  document.getElementById('editPaymentBtn').style.display = 'none';
  document.getElementById('savePaymentBtn').style.display = 'inline-block';
  document.getElementById('cancelPaymentBtn').style.display = 'inline-block';
}

function savePaymentInfo() {
  // Save changes logic here (e.g., send data to the server)

  // Reset to view-only mode
  resetPaymentInfoView();
}

function cancelPaymentEdit() {
  // Reset to view-only mode without saving
  resetPaymentInfoView();
}

function resetPaymentInfoView() {
  // Disable editing for payment info fields
  document.getElementById('credit-card-number').setAttribute('readonly', true);
  document.getElementById('expiry-date').setAttribute('readonly', true);
  document.getElementById('cvv').setAttribute('readonly', true);
  document.getElementById('payments').setAttribute('disabled', true);

  // Revert background and text color
  document.getElementById('credit-card-number').style.backgroundColor = 'rgb(173, 173, 173)';
  document.getElementById('credit-card-number').style.color = '#353535';
  document.getElementById('expiry-date').style.backgroundColor = 'rgb(173, 173, 173)';
  document.getElementById('expiry-date').style.color = '#353535';
  document.getElementById('cvv').style.backgroundColor = 'rgb(173, 173, 173)';
  document.getElementById('cvv').style.color = '#353535';
  document.getElementById('payment-info-section').style.backgroundColor = 'rgb(39, 39, 39)';
  document.getElementById('buttons-div').style.backgroundColor = 'rgb(39, 39, 39)';

  // Show edit button, hide save and cancel buttons
  document.getElementById('editPaymentBtn').style.display = 'inline-block';
  document.getElementById('savePaymentBtn').style.display = 'none';
  document.getElementById('cancelPaymentBtn').style.display = 'none';
}

function hideAllSections() {
  // Hide all sections
  document.getElementById('parameters').style.display = 'none';
  document.getElementById('logout').style.display = 'none';
  document.getElementById('contact').style.display = 'none';
  document.getElementById('my-account').style.display = 'none';
}

function showSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
      hideAllSections(); // Ensure all other sections are hidden
      section.style.display = 'block'; // Show the requested section

      // Optional: Scroll to the section smoothly
      if (section.offsetTop) {
          window.scrollTo({
              top: section.offsetTop,
              behavior: 'smooth'
          });
      }
  } else {
      console.error(`No element found with ID: ${sectionId}`);
  }
}


function toggleParameters() {
  const sideMenu = document.querySelector('.side-menu');
  const parametersSection = document.getElementById('parameters');
  
  if (parametersSection.style.display === 'block') {
      hideAllSections();
      sideMenu.style.width = '250px'; // Reset to original width
  } else {
      showSection('parameters');
      sideMenu.style.width = '600px'; // Set the width to 500px
  }
}


function toggleLogout() {
  const sideMenu = document.querySelector('.side-menu');
  const logoutSection = document.getElementById('logout');
  
  if (logoutSection.style.display === 'block') {
      hideAllSections();
      sideMenu.style.width = '250px'; // Reset to original width
  } else {
      showSection('logout');
      sideMenu.style.width = '350px'; // Set the width to 350px
  }
}


function toggleContact() {
  const sideMenu = document.querySelector('.side-menu');
  const contactSection = document.getElementById('contact');
  
  if (contactSection.style.display === 'block') {
      // Hide the contact section and reset the side menu width
      contactSection.style.display = 'none';
      sideMenu.style.width = '250px'; // Reset to original width
  } else {
      // Reset the contact section to its initial state
      resetContactForm();
      showSection('contact');
      sideMenu.style.width = '500px'; // Set the width to 500px
  }
}

function resetContact() {
  // Hide the submitted query message
  var submittedQuery = document.querySelector('.submitted-query');
  submittedQuery.style.display = 'none';

  // Show the contact section (the form)
  var contactSection = document.querySelector('.contact-section');
  contactSection.style.display = 'flex';

  // Optionally, you can clear the form fields if desired
  document.getElementById('subject').value = '';
  document.getElementById('query').value = '';
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
  const sideMenu = document.querySelector('.side-menu');
  const myAccountSection = document.getElementById('my-account');
  
  if (myAccountSection) {
      if (myAccountSection.style.display === 'block') {
          myAccountSection.style.display = 'none';
          sideMenu.style.width = '250'; // Reset to original width
      } else {
          showSection('my-account');
          sideMenu.style.width = '560px'; // Set the width to 500px
      }
  } else {
      console.error('My Account section not found in the DOM.');
  }
}



function toggleSignUp() {
  if (document.getElementById('signup').style.display === 'block') {
      hideAllSections();
  } else {
      showSection('signup');
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



function editAccount() {
  // Enable editing
  document.getElementById('nickname').removeAttribute('readonly');
  document.getElementById('email').removeAttribute('readonly');
  document.getElementById('account-type').removeAttribute('disabled');
  document.getElementById('first-language').removeAttribute('disabled');
  document.getElementById('payments').removeAttribute('disabled');

  document.getElementById('email').style.backgroundColor = 'rgb(240, 240, 240)';
  document.getElementById('email').style.color = 'rgb(0, 0, 0)';
  document.getElementById('nickname').style.backgroundColor = 'rgb(240, 240, 240)';
  document.getElementById('nickname').style.color = 'rgb(0, 0, 0)';
  document.getElementById('personal-info-section').style.backgroundColor = 'rgb(60, 60, 60)';
  document.getElementById('personal-buttons-div').style.backgroundColor = 'rgb(60, 60, 60)';

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
  document.getElementById('first-language').setAttribute('disabled', true);
  document.getElementById('nickname').setAttribute('readonly', true);

  document.getElementById('email').style.backgroundColor = 'rgb(173, 173, 173)';
  document.getElementById('email').style.color = '#353535';
  document.getElementById('nickname').style.backgroundColor = 'rgb(173, 173, 173)';
  document.getElementById('nickname').style.color = '#353535';
  document.getElementById('personal-info-section').style.backgroundColor = 'rgb(39, 39, 39)';
  document.getElementById('personal-buttons-div').style.backgroundColor = 'rgb(39, 39, 39)';


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


document.querySelectorAll('.level-box').forEach(function(box) {
  box.addEventListener('click', function() {
      // Remove the selected class from all boxes
      document.querySelectorAll('.level-box').forEach(function(box) {
          box.classList.remove('selected');
      });

      // Add the selected class to the clicked box
      this.classList.add('selected');

      // Optionally, update a hidden input field or perform an action
      const selectedLevel = this.getAttribute('data-value');
      console.log('Selected level:', selectedLevel);
      // You can use this value in a form submission or other logic
  });
});


document.querySelectorAll('.category-box').forEach(function(box) {
  box.addEventListener('click', function() {
      // Toggle the selected class on the clicked box
      this.classList.toggle('selected');

      // Get selected categories
      const selectedCategories = Array.from(document.querySelectorAll('.category-box.selected'))
          .map(box => box.getAttribute('data-value'));

      console.log('Selected categories:', selectedCategories);
      // You can use this array in form submission or other logic
  });
});
