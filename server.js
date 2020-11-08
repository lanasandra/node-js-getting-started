const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();

app.set('port', process.env.PORT || 5432);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))

// Creation de ta connexion postgres
const { Client } = require('pg');
const { parse } = require('path');
const { REFUSED } = require('dns');
const client = new Client({
  host: 'ec2-54-196-89-124.compute-1.amazonaws.com',
  port: 5432,
  user: 'fssmfnipgcsobv',
  password: '93036b8a23651dd59b8dd659b0a6af82d8e72992a2c0296212e87e9b2a46d80e',
  database: 'd47lq5l2er5rkb',
  ssl: {
    rejectUnauthorized: false
  }
})

var salesforcId;


// connexion à postgres
client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })


// Creation d'une route POST pour récupérer mon contact
app.post('/api/getContacts', (req, res) => {
  
  const query = {
    text: 'SELECT * FROM salesforce.Contact where password__c=$1',
    values: [req.body.password]
    }
  client.query(query).then(response => {
     
    res.status(200).json(response.rows[0]);
    console.log(response.rows);
  }).catch(err => {
    res.status(500).json({ "message": err});
   console.log({ "message": err});
  
  })
});

// Creation d'une route POST pour récupérer mon contrat
app.post('/api/getContract', (req, res) => {
  
  const query = {
    text: 'SELECT contractnumber, startdate, enddate, contractterm from salesforce.Contract where customersignedid=$1',
    values: [req.body.sfid]
    }
  client.query(query).then(response => {
     
    res.status(200).json(response.rows[0]);
    console.log(response.rows);
  }).catch(err => {
    res.status(500).json({ "message": err});
   console.log({ "message": err});
  
  })
});

// Creation d'une route POST pour récupérer mes produits
app.post('/api/getProducts', (req, res) => {

  // Query to retreive the products details where pricebook is Legarant pricebook
const query = {
  text: 'SELECT productcode, name, unitprice from Salesforce.PriceBookEntry where pricebook2id=$1 order by name',
  values: ['01s09000001emDjAAI']

}
  client.query(query).then(response => {
     
    res.status(200).json(response.rows);
    console.log(response.rows);
  }).catch(err => {
    res.status(500).json({ "message": err});
   console.log({ "message": err});
  
  })
});


// Création d'une route pour récupérer le contact et sauvegarder son password
app.post('/api/register', (req, res) => {
  
  const query = {
    text: 'UPDATE salesforce.Contact SET password__c = $1 WHERE firstname = $2 AND lastname=$3 AND email=$4 RETURNING *',
    values: [req.body.password, req.body.firstName, req.body.lastName, req.body.email]
    }
  client.query(query).then(response => {
     
    res.status(200).json(response.rows[0]);
    console.log(response.rows);
  }).catch(err => {
    res.status(500).json({ "message": err});
   console.log({ "message": err});
  
  })
});



  
  


  


// Query to set the password of the contact when registering
/*const query2 = {
  text: 'UPDATE salesforce.Contact SET password__c = $1 WHERE email = $2 RETURNING sfid',
  values: ['lana2006','jane_gray@uoa.edu'],
  rowMode: 'array'
}

client.query(query2, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log('Votre compte a été bien enregistré')
    salesforceId= res.rows[0]
    console.log(salesforceId)
  }
  
})*/


// Query to retrieve the contact details of the contact when logging
/*const query3 = {
  text: 'SELECT firstname, lastname, email, phone, mailingstreet, mailingcity, mailingcountry from salesforce.Contact where sfid=$1',
  values: ['00309000003IhHuAAK'],
  rowMode: 'array'
}
client.query(query3, (err, res)=> {
  if(err) console.log(err.stack)
  console.log(res.rows[0])
})*/

// Query to retreive the contract details of the contact based on sfid
const query4 = {
  text: 'SELECT contractnumber, startdate, enddate, contractterm from salesforce.Contract where customersignedid=$1',
  values: ['00309000001jdcsAAA']
}
client.query(query4, (err, res) => {
  if(err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})

// Query to retreive the products details where pricebook is Legarant pricebook
const query5 = {
  text: 'SELECT productcode, name, unitprice from Salesforce.PriceBookEntry where pricebook2id=$1 order by name',
  values: ['01s09000001emDjAAI']

}
client.query(query5, (err, res) => {
  if(err) {
    console.log(err.stack)
  }else {
    console.log(res.rows)
  }
})

// Query to retreive a contact from database after his login
const query6 = {
  text: 'SELECT sfid, firstname, lastname, email, phone, mailingstreet, mailingcity, mailingcountry from salesforce.Contact where email=$1 AND password__c=$2',
  values: ['jane_gray@uoa.edu', 'lana2006']
}
client.query(query6, (err, res)=> {
  if(err) {
    console.log("Nous sommes désolés mais nous ne retrouvons aucun compte associé à ces données.")
  }else {
    console.log(res.rows)
  }
    
})

// Query when the contact has updated his contact details
/*const query7 = {
  text: 'UPDATE salesforce.Contact SET firstname=$1, lastname=$2, email=$3, phone= $4, mailingstreet=$5, mailingcity=$6, mailingcountry=$7 where sfid = $8',
  values: ['Jane', 'Grey','jane_gray@uoa.edu','(520) 773-9050','888 N Euclid - Hallis Center, Room 501','Tucson','United States','00309000003IhHuAAK']  
}

client.query(query7, (err, res) => {
  if(err) {
    console.log("Nous sommes désolés mais nous n'avons pas pu mettre à jour vos informations.")
    console.log(err)
  }else {
    console.log("Vos informations ont bien été mises à jour !")
  }
})/*


// Creation d'une route POST 
// https://still-stream-63740.herokuapp.com/api/getAccounts
/*app.post("/clicked", (req, res) => {
 
  client.query('SELECT firstname, lastname FROM salesforce.contact where id=1')
  .then(response => {
    console.log('***** response', response.values);
    res.status(200).json(
      { "firstname": "Il y'a " + response.firstname + " Accounts",
        "lastname": "Il y'a " + response.lastname + " Accounts"
    });
  })
  .catch(err => {
    res.status(500).json({ "message": err});

})
})

// Creation d'une route POST 
// https://still-stream-63740.herokuapp.com/api/getAccounts
app.post('/api/getAccounts2', (req, res) => {
  var email = "jane_gray@uoa.edu"
  var doubleQuotes = "'";
  client.query = 'SELECT * FROM salesforce.Contact where email='+doubleQuotes+email+doubleQuotes
  .then(response => {
      console.log('***** response', response);
      res.status(200).json({ "message": "Il y'a " + response.rows.length + " Contacts"});
  }).catch(err => {
      res.status(500).json({ "message": err});

  })
});





// Creation d'une route POST 
// https://still-stream-63740.herokuapp.com/api/getContactName
app.post('registerPage/api/getContatName', (req, res) => {
  client.query('UPDATE salesforce.contact set password__c ='+req.params.password+'FROM salesforce.contact AS c where c.email ='+req.params.email)
  .then(response => {
      console.log('***** response', response);
      res.status(200).json({ "message": "Bienvenue" + res.firstName + " sur votre espace personnel"});
  }).catch(err => {
      res.status(500).json({ "message": err});

  })
  res.end();
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
      
// Access the parse results as request.body
app.post('/', function(req, res){
    
    var query = 'UPDATE salesforce.Contact SET Password__c ='+req.body.user.password+'WHERE Email='+req.body.user.email;
    pool.query(query);
    console.log(req.body.user.password);
    console.log(req.body.user.email);

    res.json(result);

});
        


app.post('/', function(req, res) {
  pg.connect(connectionString, function (err, client, done) {
        //watch for any connect issues
        if (err) console.log(err);
     
       client.query('INSERT INTO Contact (Email) VALUES ($4) WHERE LOWER(email) = LOWER($3)',
           [req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
           function(err, result) {
           if (err != null || result.rowCount == 0) {
              client.query('INSERT INTO salesforce.Contact (Phone, MobilePhone, FirstName, LastName, Email) VALUES ($1, $2, $3, $4, $5)',
                 [req.body.phone.trim(), req.body.phone.trim(), req.body.firstName.trim(), req.body.lastName.trim(), req.body.email.trim()],
                function(err, result) {
                 done();
              if (err) {
                 res.status(400).json({error: err.message});
                 }
               else {
                      //this will still cause jquery to display 'Record updated!'
                         //eventhough it was inserted
                      res.json(result);
                 }
                  });
             }
               else {
                   done();
                   res.json(result);
                }
           }
        );
    });
});*/



app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
