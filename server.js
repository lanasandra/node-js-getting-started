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
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const connectionString = "postgres://fssmfnipgcsobv:93036b8a23651dd59b8dd659b0a6af82d8e72992a2c0296212e87e9b2a46d80e@ec2-54-196-89-124.compute-1.amazonaws.com:5432/d47lq5l2er5rkb"

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

app.post('/', function(req, res){
    var query = 'UPDATE salesforce.Contact SET Password__c ='+req.body.user.password+'WHERE Email='+req.body.user.email;
    client.query(query, (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
    client.end();
    });
});


// Access the parse results as request.body
app.post('/', function(req, res){
    pg.connect(connectionString, function (err, client, done) {
        //watch for any connect issues
        if (err) console.log(err);
        
        var query = 'UPDATE salesforce.Contact SET Password__c ='+req.body.user.password+'WHERE Email='+req.body.user.email;
        client.query(query);
        console.log(req.body.user.password);
        console.log(req.body.user.email);
});
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
