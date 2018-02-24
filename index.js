const express = require('express')
const path = require("path");
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('port', (process.env.PORT || 8000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at http://localhost:" + app.get('port'));
})

app.get('/hello', (req, res) => {
  res.send({greeting: 'hello!'});
});
