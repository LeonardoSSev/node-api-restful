const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const Joi = require('joi');

let group = require('./store');

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

app.get('/',  (req, res) => {
   res.send('Hello World');
});

app.get('/api/group', (req, res) => {
   res.status(200).send(group);
});

app.get('/api/group/:id', (req, res) => {
    const person = group.find(person => {
        return person.id === parseInt(req.params.id);
    });

    res.status(200).send(JSON.stringify(person));
});

