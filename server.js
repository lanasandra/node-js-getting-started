const express = require('express');
var bodyParser = require('body-parser');
const pg = require('pg');
const app = express();

app.set('port', process.env.PORT || 5432);

app.use(express.static('public'));
app.use(bodyParser.json());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  const { Pool } = require('pg'); 
  const env = process.env.NODE_ENV || 'development';
 
  
const connectionString = {
    user: "fssmfnipgcsobv",
    database: "d47lq5l2er5rkb",
    host: "ec2-54-196-89-124.compute-1.amazonaws.com",  
    connectionString: process.env.DATABASE_URL,
    ssl: true
      };

  const pool = new Pool(connectionString);
  pool.on('connect', () => console.log('connected to db'));

// Example
app.post('/save', (request, response) => {
    const client = new pg.Client(connectionString);
    client.connect();
    const query = client.query('UPDATE salesforce.Contact SET Password__c ='+request.body.passwordCreated+'WHERE Email='+request.body.emailInput);
    query.on('end', () => { 
        client.end(); 
    });
    
    console.log(request.body)
    console.log('I got a request')
    console.log('Email: '+request.body.emailInput,'Password: '+request.body.passwordCreated)
    response.json({
       status: 'success',
       Email : emailInput,
       Password : passwordCreated 
    })
})

app.get('/getContact', (request, response) => {
    const client = new pg.Client(connectionString);
    client.connect();
    const query = client.query('SELECT sfid FROM salesforce.Contact WHERE Email ='+request.body.emailInput);
    query.on('end', () => { 
        client.end(); 
    });
    
    console.log(request.body)
    console.log('I got a request')
    console.log('Email: '+request.body.emailInput,'Id: '+json(result))
    response.json({
       status: 'success',
       result : result,
      
    })
})


// Access the parse results as request.body
app.post('/', function(req, res){
    pg.connect(connectionString, function (err, client, done) {
        //watch for any connect issues
        if (err) console.log(err);
        var query = 'UPDATE salesforce.Contact SET Password__c ='+req.body.user.password+'WHERE Email='+req.body.user.email;
        pool.query(query);
   

});

})
        


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
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
