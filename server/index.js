require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const controller = require('./controller');
const axios = require('axios');
const app = express();
// heroku databasename: dry-eyrie-84545

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`));

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
    console.log('database is workingggg');
}).catch(error => {
    console.log('-------------- database issue', error);
});

app.use(session ({
    secret: "session",
    resave: false,
   saveUninitialized: false 
}))

app.get('/', function(req,res) {
    if (!req.session.userName && !req.session.visitCount){
    req.session.userName = "ais"
    req.session.visitCount = 1;
    res.status(201).send(req.session)
    }else {
        req.session.visitCount += 1;
        res.status(200).send(req.session);
    }
})

app.post('/api/posts', (req, res) => {
    let { post } = req.body;
    req.session.post = post;
    res.send(req.session)
})


app.post('/api/register-user', controller.postUser);
app.post('/api/logging-in-user', controller.postLogin);
//app.get('/api/posts', controller.)

const PORT = 4123;
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT} `);
});
