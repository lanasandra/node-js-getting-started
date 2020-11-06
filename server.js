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


// connexion à postgres
client.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })


// Creation d'une route POST 
// https://still-stream-63740.herokuapp.com/api/getAccounts
app.post('/api/getContacts', (req, res) => {
    client.query('SELECT * FROM salesforce.Contact').then(response => {
        console.log('***** response', response);
        res.status(200).json({ "message": "Il y a " + response.rows.length + " contacts"});
    }).catch(err => {
        res.status(500).json({ "message": err});

    })
});



app.post('/api/getContracts', (req,res)=> {
  
  const query = {
    text: 'SELECT firstname FROM salesforce.Contact WHERE lastname = $1',
    values: ['Grey'],
    rowMode: 'array'
  }

  client.query(query, (err, res) => {
    if (err) {
      res.status(500).json({ "message": err});
    } else {
      res.status(200)
      res.format ({
        'text/plain': function() {
        res.send('Bienvenue '+res.rows[0]+' dans votre espace personnel');
        }   
      })
    }
  });
})
  


  const query = {
    text: 'SELECT firstname FROM salesforce.Contact WHERE lastname = $1',
    values: ['Grey'],
    rowMode: 'array'
  }

  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log('Bienvenue '+res.rows[0]+' dans votre espace personnel')
    }
  })

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
