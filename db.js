// db.js
const mongoose = require('mongoose');

const username = "gptc8980";
const password = "khankhan321@";
const uri = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@cluster0.83ape2d.mongodb.net/twitter?retryWrites=true&w=majority&ssl=true`;

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;
