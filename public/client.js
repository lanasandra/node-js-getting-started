

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
var informationsPage = document.getElementById("informationsPage")
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
  registerButton.style.display="block";
  registerButton.style.margin="auto";
  loginTitle.style.display= "none";
  footerRegister.style.display= "none";
  loginButton.style.display= "none";
}
// display login page
function displayLoginPage() {
  blocRegister.style.display = "none";
  createAccountTitle.style.display= "none";
  footerLogin.style.display = "none";
  registerButton.style.display="none";
  loginTitle.style.display= "block";
  footerRegister.style.display= "block";
  loginButton.style.display= "block";
  loginButton.style.margin="auto";
}

/*-----------------------------------------------------------------------*/

// Action on Login Button

loginButton.addEventListener('click', function(e) {
  e.preventDefault();
 
  console.log('button was clicked');
  console.log(passwordInput.value);
  //console.log("'"+passwordInput.value+"'");
  //On appelle notre route créée sur le serveur
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getContacts', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = function () {
      // do something to response
      //console.log("xhr.response", xhr.response);
      response = JSON.parse(xhr.response);
      console.log("response", response.firstname);

      // Call function to display contract details
        displayContractDetails(response.sfid);

      
        // display contact informations 
        welcomePage.style.display="none";
        informationsPage.style.display="block";
       
        document.getElementById("salesFirstName").innerHTML   = response.firstname
        document.getElementById("salesLastName").innerHTML    = response.lastname
        document.getElementById("salesEmail").innerHTML       = response.email
        document.getElementById("salesPhoneNumber").innerHTML = response.phone
        document.getElementById("salesStreet").innerHTML      = response.mailingstreet
        document.getElementById("salesCity").innerHTML        = response.mailingcity
        document.getElementById("salesCountry").innerHTML     = response.mailingcountry
       
  

    };
  xhr.send(JSON.stringify({
    password: passwordInput.value}));
});




function displayContractDetails(salesforceId){

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/getContract', true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onload = function () {
      // do something to response
      //console.log("xhr.response", xhr.response);
      response = JSON.parse(xhr.response);
      console.log("response", response);
      
        // display contract informations 
        
        document.getElementById("contactContractNumber").innerHTML    = "Contract Number: "+response.contractnumber;
        document.getElementById("contactContractStartDate").innerHTML = "Contract Start Date: "+(response.startdate).toISOString().slice(0,10);
        document.getElementById("contactContractEndDate").innerHTML   = "Contract End Date: "+(response.enddate).toISOString().slice(0,10);
        document.getElementById("contactContractTerm").innerHTML      = "Contract Term (months): "+response.contractterm;
       
  

    };
  xhr.send(JSON.stringify({
    sfid: salesforceId}));
};

 
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
