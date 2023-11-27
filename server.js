const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://kamunwa:30090Sam@cluster0.xm2mttk.mongodb.net/URA?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error: '))
db.once('open', function () {
    console.log('Connected successfully  to  Database  URA!');
});
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    const name = req.body.name;
    const dob = req.body.dob;
    const occupation = req.body.occupation;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const email = req.body.email;
    const income = req.body.income;

    const year = new Date().getFullYear();
    const genderLetter = gender.charAt(0).toUpperCase();
    const uniqueNumber = Math.floor(100000 + Math.random() * 900000);

    const taxId = `${year}/${genderLetter}/${uniqueNumber}`;

    res.send(`Hello ${name}, your Tax Identification Number is ${taxId}`);
});

app.listen(3000, () => console.log('Server is running on port 3000'))
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
