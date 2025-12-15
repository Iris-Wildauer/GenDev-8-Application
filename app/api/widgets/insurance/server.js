const insurance =  require("./insurance.js");
const express = require('express');
const path = require('path');
const app = express();
const port = 8080;

app.use('/images',
    express.static(path.join(__dirname, 'images')) //http://localhost:8080/images/cat.jpg
);

app.get('/', (req, res) => {
    const insuranceInfo = insurance.getInsuranceWidgets()
    res.json(insuranceInfo)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
