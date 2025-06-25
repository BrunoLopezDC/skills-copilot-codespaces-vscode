// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// In-memory database
let comments = [];
// Routes
app.get('/comments', (req, res) => {
    res.json(comments);
});
app.post('/comments', (req, res) => {
    const comment = req.body;
    if (!comment.name || !comment.text) {
        return res.status(400).json({ error: 'Name and text are required' });
    }
    comment.id = comments.length + 1; // Simple ID generation
    comments.push(comment);
    res.status(201).json(comment);
});
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    comments = comments.filter(comment => comment.id !== id);
    res.status(204).send();
});
app.put('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedComment = req.body;
    if (!updatedComment.name || !updatedComment.text) {
        return res.status(400).json({ error: 'Name and text are required' });
    }
    const index = comments.findIndex(comment => comment.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Comment not found' });
    }
    updatedComment.id = id; // Maintain the same ID
    comments[index] = updatedComment;
    res.json(updatedComment);
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
// Export the app for testing
module.exports = app;
// Export the comments array for testing