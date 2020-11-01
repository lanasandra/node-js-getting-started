console.log('Client-side code running');

const registerButton = document.getElementById('registerButton');
registerButton.addEventListener('click', function(e) {
  console.log('button was clicked');

  fetch('/register', {method: 'POST'})
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