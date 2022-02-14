var express = require('express');

var app = express();

app.get('/', function (req, res) {
  res.send('Working!');
});

app.get('/validate', function (req, res) {
    res.send('To be implemented');
});

app.listen(3000, function () {
  console.log('Barcody app listening on port 3000!');
});
