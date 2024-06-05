// models/Trend.js
const mongoose = require('../db');

const trendSchema = new mongoose.Schema({
    id: { type: String, required: true },
    nameoftrend1: String,
    nameoftrend2: String,
    nameoftrend3: String,
    nameoftrend4: String,
    nameoftrend5: String,
    ip_address: String
});

const Trend = mongoose.model('Trend', trendSchema);

module.exports = Trend;
