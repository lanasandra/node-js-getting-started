
console.log('Client-side code running');

// Variables

var emailInput = document.getElementById('inputEmail');
var passwordInput = document.getElementById('inputPassword');
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById("validateButton");
var firstNameInput = document.getElementById("inputFirstName");
var lastNameInput = document.getElementById("inputLastName");
var footerLogin = document.getElementById("footerLogin");
var footerRegister = document.getElementById("footerRegister");
var createAccountTitle = document.getElementById("createAccountLogin");
var loginTitle = document.getElementById("loginTitle");
var loginLink = document.getElementById("loginLink");
var registerLink = document.getElementById("signInLink");
var blocRegister = document.getElementById("blocRegister");
var blocLogin = document.getElementById("blocLogin");
const updateButton = document.getElementById("updateButton");


// For test
const getContactNumbers = document.getElementById("getContactNumbers");
const  getContractNumbers = document.getElementById("getContractNumbers");


// Display resister page Fields

registerLink.addEventListener('click', displayRegisterPage);

// Back to login page

loginLink.addEventListener('click', displayLoginPage);

// display register page

function displayRegisterPage() {
  blocRegister.style.display = "block";
  createAccountTitle.style.display= "block";
  footerLogin.style.display = "block";
  registerButton.style.display-"block";
  loginTitle.style.display= "none";
  footerRegister.style.display= "none";
  loginButton.style.display= "none";
}

function displayLoginPage() {
  blocRegister.style.display = "none";
  createAccountTitle.style.display= "none";
  footerLogin.style.display = "none";
  registerButton.style.display-"none";
  loginTitle.style.display= "block";
  footerRegister.style.display= "block";
  loginButton.style.display= "block";
}



// Http Requests

getContactNumbers.addEventListener('click', function(e) {
  e.preventDefault();
 
  console.log('button was clicked');

  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getContacts', true);
  xhr.onload = function () {
      // do something to response
      response = JSON.parse(xhr.response);
      alert(response.message);
    };
  xhr.send();
});

getContractNumbers.addEventListener('click', function(e) {
  e.preventDefault();
 
  console.log('button was clicked');

  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getContracts', true);
  xhr.responseType = "text"
  xhr.onload = function () {
      // do something to response
      response = xhr.response;
      console.log(response);
  };
  xhr.send();
});


  