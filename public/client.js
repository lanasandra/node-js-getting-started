
console.log('Client-side code running');

// Variables
var emailInput = document.getElementById('inputEmail');
var passwordInput = document.getElementById('inputPassword');
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById("loginButton");
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
var blocProductDetails = document.getElementById("blocProductDetails")
var welcomePage = document.getElementById("welcomePage");
var informationPage = document.getElementById("informationsPage")
/*-----------------------------------------------------------------------*/

// For test
const getContactNumbers = document.getElementById("getContactNumbers");
const  getContractNumbers = document.getElementById("getContractNumbers");

/*-----------------------------------------------------------------------*/

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
// display login page
function displayLoginPage() {
  blocRegister.style.display = "none";
  createAccountTitle.style.display= "none";
  footerLogin.style.display = "none";
  registerButton.style.display-"none";
  loginTitle.style.display= "block";
  footerRegister.style.display= "block";
  loginButton.style.display= "block";
}

/*-----------------------------------------------------------------------*/

// Action on Login Button

loginButton.addEventListener('click', function(e){

  // Get the email and password inputs before sending requests
  var emailValue = emailInput.value;
  var passwordValue = passwordInput.value;

  // Create the request to send to server
  var request = new XMLHttpRequest()
  request.open('POST', 'api/login', true)

  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    if (request.status >= 200 && request.status < 400) {
  
      welcomePage.style.display="none";
      informationPage.style.display-"block";
      
      data.forEach((contact) => {
        console.log(contact.firstname, contact.lastname, contact.email, contact.phone, contact.mailingstreet, contact.mailingcity, contact.mailingcountry)
        document.getElementById("salesFirstName").innerHTML   = contact.firstname
        document.getElementById("salesLastName").innerHTML    = contact.lastname
        document.getElementById("salesEmail").innerHTML       = contact.email
        document.getElementById("salesPhoneNumber").innerHTML = contact.phone
        document.getElementById("salesStreet").innerHTML      = contact.mailingstreet
        document.getElementById("salesCity").innerHTML        = contact.mailingcity
        document.getElementById("salesCountry").innerHTML     = contact.mailingcountry
      })
    } else {
      console.log('error')
    }
  }
  // Send request
  request.send({
    username: emailValue,
    password: passwordValue
  })
  }
)


// Http Requests

getContactNumbers.addEventListener('click', function(e) {
  e.preventDefault();
 
  console.log('button was clicked');

  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getContacts', true);
  xhr.onload = function () {
      // do something to response
      console.log("xhr.response", xhr.response);
      response = JSON.parse(xhr.response);
      console.log("response", response);
    };
  xhr.send();
});


// request to display contact details section based on Sfid
function displayContactDetails(salesforceId){

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('POST', 'api/getContact/id='+salesforceId, true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {

    
    data.forEach((contact) => {
      console.log(contact.firstname, contact.lastname, contact.email, contact.phone, contact.mailingstreet, contact.mailingcity, contact.mailingcountry)
      document.getElementById("salesFirstName").innerHTML   = contact.firstname
      document.getElementById("salesLastName").innerHTML    = contact.lastname
      document.getElementById("salesEmail").innerHTML       = contact.email
      document.getElementById("salesPhoneNumber").innerHTML = contact.phone
      document.getElementById("salesStreet").innerHTML      = contact.mailingstreet
      document.getElementById("salesCity").innerHTML        = contact.mailingcity
      document.getElementById("salesCountry").innerHTML     = contact.mailingcountry
    })
  } else {
    console.log('error')
  }
}
// Send request
request.send()
}

function displayContractDetails(salesforceId){

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest()
  
  // Open a new connection, using the POST request on the URL endpoint
  request.open('POST', 'api/getContract/id='+salesforceId, true)
  
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    if (request.status >= 200 && request.status < 400) {
      data.forEach((contract) => {
        console.log(contract.contractnumber, contract.startdate, contract.enddate, contract.contractterm)
        document.getElementById("contactContractNumber").innerHTML    = "Contract Number: "+contract.contractnumber;
        document.getElementById("contactContractStartDate").innerHTML = "Contract Start Date: "+contract.startdate;
        document.getElementById("contactContractEndDate").innerHTML   = "Contract End Date: "+contract.enddate;
        document.getElementById("contactContractTerm").innerHTML      = "Contract Term (months): "+contract.contractnumber;
    })
  } else {
        
        console.log('error')
  }
  
  // Send request
  request.send()

  }
}
 
function displayLegarantProduct() {

  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest()
  
  // Open a new connection, using the POST request on the URL endpoint
  request.open('POST', 'api/getProducts', true)
  
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    if (request.status >= 200 && request.status < 400) {
      data.forEach((product) => {
        console.log(product.productcode, product.name, product.unitprice)

        var productCode                               = product.productcode;
        var productName                               = product.name;
        var productPrice                              = product.unitprice;

        var productItem                               = document.createElement("div"); 
            productItem.className                     = "productItem";

        var productCodeItem                           = document.createElement("p");
            productCodeItem.className                 = "productCodeItem";
            productItem.appendChild(productCodeItem);
    
        var productNameItem                           = document.createElement("p");
            productNameItem.className                 = "productNameItem";
            productItem.appendChild(productNameItem);
      
        var productPriceItem                          = document.createElement("p");
            productPriceItem.className                = "productPriceItem";
            productItem.appendChild(productPriceItem);


            productCodeItem.innerHTML                 = "Product Code: "+productCode;
            productNameItem.innerHTML                 = "Product Name: "+productName;
            productPriceItem.innerHTML                = "Unit Price: "+productName+" €";           
      })
    } else {
      console.log('error')
    }
  }
  
  // Send request
  request.send()
}
