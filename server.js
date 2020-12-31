const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const port = process.env.port || 5000;

app.use('/api', routes);
app.use(bodyParser.json())

app.listen(port, () => {
    const datetime = new Date();
    console.log('Server started on port ' + port + ' at ' + datetime);
    console.log('Listening to requests!');
});
