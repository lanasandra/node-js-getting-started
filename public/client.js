console.log('Client-side code running');

var emailRegisterInput = document.getElementById('inputEmail');
var passwordRegisterInput = document.getElementById('inputPasswordRegister');
const registerButton = document.getElementById('registerButton');

var emailInput;
var passwordCreated;
registerButton.addEventListener('click', function(e) {

  console.log('button was clicked');

  fetch('/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: {
            password: passwordRegisterInput.value,
            email: emailInput.value
        }
    })
})
  
    .then(function(response) {
      if(response.ok) {
        console.log('password saved');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
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