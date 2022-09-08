var path = require('path')
//Require Express to run server and routes
const express = require('express');
//Start up an instance of app
const app = express();
//To hide my API Keys
const dotenv = require('dotenv');
dotenv.config();
// declare API credentials
const api_key = process.env.API_KEY;
console.log(`Your API key is ${process.env.API_KEY}`);

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//Initialize the main project folder
app.use(express.static('dist'))
//app.use(express.static('src/client'));

//Dependencies to call web api
const FormData = require('form-data');
const fetch = require('node-fetch');

// designates what port the app will listen to for incoming requests
const port = 8081;
const server = app.listen(port, function () {
    console.log('Example app listening on port 8081!');
});

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile('./client/views/index.html', { root: __dirname + '/..'})
});


//POST Route 
app.post('/addText', addText);
function addText(req, res) {
    
    /* To GET Web API Data */  
    const formdata = new FormData();
    console.log(req.body.text)
    formdata.append("key", api_key);
    formdata.append("txt", req.body.text);
    formdata.append("lang", "en");  // 2-letter code, like en es fr ...

    const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };
    fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            res.send(json);
        })
}

