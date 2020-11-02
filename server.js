var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

app.set('port', process.env.PORT || 5432);

app.use(express.static('public'));
app.use(bodyParser.json());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))

// Creation de ta connexion postgres
const { Client } = require('pg')
const client = new Client({
  host: 'ec2-54-196-89-124.compute-1.amazonaws.com',
  port: 5432,
  user: 'fssmfnipgcsobv',
  password: '93036b8a23651dd59b8dd659b0a6af82d8e72992a2c0296212e87e9b2a46d80e',
  database: 'd47lq5l2er5rkb'
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
app.post('/api/getAccounts', (req, res) => {
    client.query('SELECT * FROM salesforce.Account').then(response => {
        console.log('***** response', response);
        res.status(200).json({ "message": "Il y'a " + response.rows.length + " Accounts"});
    }).catch(err => {
        res.status(500).json({ "message": err});

    })
});

// Creation d'une route POST 
// https://still-stream-63740.herokuapp.com/api/getContactName
app.post('/api/getContatName', (req, res) => {
  client.query('SELECT * FROM salesforce.Contact WHERE Email ='+emailInput).then(response => {
      console.log('***** response', response);
      res.status(200).json({ "message": "Bienvenue" + response.rows.firstName + " sur votre espace personnel"});
  }).catch(err => {
      res.status(500).json({ "message": err});

  })
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
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
