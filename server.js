const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const loveSchema = new mongoose.Schema({
    yourName: String,
    loverName: String,
    lovePercentage: Number,
    date: { type: Date, default: Date.now }
});

const Love = mongoose.model('Love', loveSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

const getLovePercentage = (yourName, loverName) => {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < yourName.length; i++) {
        hash += yourName.charCodeAt(i);
    }
    for (let j = 0; j < loverName.length; j++) {
        hash += loverName.charCodeAt(j);
    }

    // Map the hash to a percentage value between 0 and 100
    const lovePercentage = hash % 101;
    return lovePercentage;
};

app.post('/calculate-love', async (req, res) => {
    const yourName = req.body.yourName;
    const loverName = req.body.loverName;

    // Calculate the love percentage
    const lovePercentage = getLovePercentage(yourName, loverName);

    const loveData = new Love({ yourName, loverName, lovePercentage });
    await loveData.save();

    res.json({ result: `${lovePercentage}` });


});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
