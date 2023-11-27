const mongoose = require('mongoose');

const taxpayerSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    occupation: String,
    gender: String,
    phone: String,
    email: String,
    income: Number,
    
});

const TaxPayer = mongoose.model('TaxPayer', taxpayerSchema);

const assetSchema = new mongoose.Schema({
    assetName: String,
    estimatedCost: Number,
    tin: String,
    type: String,
    
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = { TaxPayer, Asset };
