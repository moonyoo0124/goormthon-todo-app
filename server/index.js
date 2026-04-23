const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = { 
    _id: Date.now().toString(), 
    content: req.body.content, 
    isComplete: false,
    createdAt: new Date()
  };
  tasks.unshift(newTask);
  res.json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  tasks = tasks.map(t => t._id === req.params.id ? { ...t, ...req.body } : t);
  res.json({ success: true });
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t._id !== req.params.id);
  res.json({ message: 'Deleted' });
});

app.delete('/api/tasks/clear/completed', (req, res) => {
  tasks = tasks.filter(t => !t.isComplete);
  res.json({ success: true });
});

app.listen(5001, () => console.log('Server running on port 5001'));