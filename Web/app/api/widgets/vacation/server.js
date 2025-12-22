require('dotenv').config();
console.log(process.env)
const insurance =  require("./vacation.js");
const express = require('express');
const path = require('path');
const app = express();
const port = 8084;
const cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
    const vacationInfo = insurance.getVacationWidgets()
    res.json(vacationInfo)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
