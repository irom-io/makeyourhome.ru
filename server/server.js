const path = require('path');
const fs = require('fs');
var express = require('express');
var app = express();
var port = 8081;
var routes = require('./routes');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

routes(app);
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', (req, res) => {
    var indexContent = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');

    res.send(indexContent);
});

app.listen(port);
console.log(`Server start on port ${port}`);