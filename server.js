const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const { TaxPayer, Asset } = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://kamunwa:30090Sam@cluster0.xm2mttk.mongodb.net/URA?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '))
db.once('open', function () {
    console.log('Connected successfully to Database URA!');
});


app.post('/create-taxpayer', async (req, res) => {
    try {
        const { name, dob, occupation, gender, phone, email, income } = req.body;

        const newTaxPayer = new TaxPayer({
            name,
            dob,
            occupation,
            gender,
            phone,
            email,
            income
        });

        await newTaxPayer.save();

        res.status(201).json({ message: 'Taxpayer created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.post('/create-asset', async (req, res) => {
    try {
        const { assetName, estimatedCost, tin, type } = req.body;

        const newAsset = new Asset({
            assetName,
            estimatedCost,
            tin,
            type
        });

        await newAsset.save();

        res.status(201).json({ message: 'Asset created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/get-taxpayers', async (req, res) => {
    try {
        const taxpayers = await TaxPayer.find({});
        res.status(200).json({ taxpayers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/get-assets', async (req, res) => {
    try {
        const assets = await Asset.find({});
        res.status(200).json({ assets });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
