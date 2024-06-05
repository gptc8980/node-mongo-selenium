// server.js
const express = require('express');
const bodyParser = require('body-parser');
const Trend = require('./models/Trend');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Display data from MongoDB
app.get('/', async (req, res) => {
    try {
        const trends = await Trend.find();
        res.render('index', { trends });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Endpoint to handle data sent to MongoDB
app.post('/trends', async (req, res) => {
    const trendData = req.body;
    try {
        const newTrend = new Trend(trendData);
        await newTrend.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
// server.js (Add this part in the server.js file)
app.post('/fetch-trends', (req, res) => {
    require('child_process').fork('scrape.js');
    res.status(200).send('Scraping started');
});
