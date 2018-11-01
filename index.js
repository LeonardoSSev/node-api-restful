const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const Joi = require('joi')

let group = require('./store');

app.get('/',  (req, res) => {
   res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
