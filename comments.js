//Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

//Parse data from json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Read json file
const jsonFilePath = path.join(__dirname, 'comments.json');
const comments = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

//Create a route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

//Create a route to add a comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFileSync(jsonFilePath, JSON.stringify(comments, null, 2));
    res.json({message: 'Comment added'});
});

//Create a route to delete a comment
app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === id);
    comments.splice(index, 1);
    fs.writeFileSync(jsonFilePath, JSON.stringify(comments, null, 2));
    res.json({message: 'Comment deleted'});
});

//Create a route to edit a comment
app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === id);
    const comment = req.body;
    comments[index] = comment;
    fs.writeFileSync(jsonFilePath, JSON.stringify(comments, null, 2));
    res.json({message: 'Comment updated'});
});

//Create a route to get a comment by id
app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === id);
    res.json(comment);
});

//Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});