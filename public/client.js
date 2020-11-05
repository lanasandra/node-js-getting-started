

console.log('Client-side code running');

const url = 'https://still-stream-63740.herokuapp.com/';
var emailRegisterInput = document.getElementById('inputEmail');
var passwordRegisterInput = document.getElementById('inputPasswordRegister');
const registerButton = document.getElementById('registerButton');
const getAccountNumbers = document.getElementById('getAccountNumbers');
const getAccountNumbers2 = document.getElementById('getAccountNumbers2');
const loginButton = document.getElementById("validateButton");
var emailInput;
var passwordCreated;


getAccountNumbers.addEventListener('click', function(e) {
  e.preventDefault();
 
  console.log('button was clicked');

  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getAccounts', true);
  xhr.onload = function () {
      // do something to response
      response = JSON.parse(xhr.response);
      alert(response.message);
    };
  xhr.send();
});

getAccountNumbers2.addEventListener('click', function(e) {
  e.preventDefault();
 
  console.log('button was clicked');

  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getAccounts2', true);
  xhr.onload = function () {
      // do something to response
      response = JSON.parse(xhr.response);
      alert(response.message);
    };
  xhr.send();
});

loginButton.addEventListener('click', function(e) {
  e.preventDefault();
 
  console.log('button was clicked');

  var data = {
    email : "jane_gray@uoa.edu"
  }

  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/clicked', true);
  xhr.onload = function () {
    // do something to response
    response = json(xhr.response);
    console.log(response.firstname);
  };
  xhr.send()
});  
  