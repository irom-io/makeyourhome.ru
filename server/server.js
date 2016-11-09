const path = require('path');
const fs = require('fs');

const config = require('./data/config.json');
const express = require('express');
const app = express();
const port = config.port;
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

routes(app);
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/images', express.static(path.resolve(__dirname, './data/images')));
app.get('*', (req, res) => {
    const indexContent = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');

    res.send(indexContent);
});

app.listen(port);
console.log(`Server start on port ${port}`);