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

app.post('/api/group', (req, res) => {
    const person = {
        id: group.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        isProgrammer: JSON.parse(req.body.isProgrammer)
    };

    group.push(person);

    res.status(200).send(person);
});

app.put('/api/group/:id', (req, res) => {
    const person = group.find(person => {
        return person.id === parseInt(req.params.id);
    });

    person.name = req.body.name;
    person.age = parseInt(req.body.age);
    person.isProgrammer = JSON.parse(req.body.isProgrammer);

    res.status(200).send(person);
});

app.delete('/api/group/:id', (req, res) => {
    const person = group.find(person => {
        return person.id === parseInt(req.params.id);
    });

    const personIndex = group.indexOf(req.params.id);

    group.splice(personIndex, 1);

    res.status(200).send(person);
});

function validatePerson(person) {
    const schema = {
        name: Joi.string().min(3).max(30).required(),
        age: Joi.number().integer().min(0).required(),
        isProgrammer: Joi.boolean().required()
    };

    return Joi.validate(person, schema);
}
