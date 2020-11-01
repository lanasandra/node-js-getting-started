console.log('Client-side code running');

const url = 'https://still-stream-63740.herokuapp.com/';
var emailRegisterInput = document.getElementById('inputEmail');
var passwordRegisterInput = document.getElementById('inputPasswordRegister');
const registerButton = document.getElementById('registerButton');

var emailInput;
var passwordCreated;

registerButton.addEventListener('click', function(e) {
   emailInput = emailRegisterInput.value;
   passwordCreated = passwordRegisterInput.value;
  
   console.log('button was clicked');
   console.log(emailInput, passwordCreated);
   

   const data = {emailInput, passwordCreated};
    
   fetch('/save', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    
    })
    
    .then(response => {

        console.log(response);


    })

   
})

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