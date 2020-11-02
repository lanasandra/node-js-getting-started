console.log('Client-side code running');

const url = 'https://still-stream-63740.herokuapp.com/';
var emailRegisterInput = document.getElementById('inputEmail');
var passwordRegisterInput = document.getElementById('inputPasswordRegister');
const registerButton = document.getElementById('registerButton');
const getAccountNumbers = document.getElementById('getAccountNumbers');

var emailInput;
var passwordCreated;

registerButton.addEventListener('click', function(e) {
  e.preventDefault();

  emailInput = emailRegisterInput.value;
  passwordCreated = passwordRegisterInput.value;
  
  console.log(emailInput, passwordCreated)
   //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getContatName', true);
  xhr.onload = function () {
      // do something to response
      response = JSON.parse(xhr.response);
      alert(response.message);
    };
  xhr.send();
});





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


//setInterval(function() {
  //fetch('/clicks', {method: 'GET'})
    //.then(function(response) {
    //  if(response.ok) return response.json();
    //  throw new Error('Request failed.');
    //})
   // .then(function(data) {
    //  document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
    //})
    //.catch(function(error) {
    //  console.log(error);
    //});
//}, 1000);