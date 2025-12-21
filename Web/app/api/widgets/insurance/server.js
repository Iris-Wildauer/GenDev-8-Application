require('dotenv').config();
console.log(process.env)
const insurance =  require("./insurance.js");
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors())

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
    const insuranceInfo = insurance.getInsuranceWidgets()
    res.json(insuranceInfo)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
