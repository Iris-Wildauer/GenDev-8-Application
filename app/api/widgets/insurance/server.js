const insurance =  require("./insurance.js");
const express = require('express')
const app = express();
const port = 8080;

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
    const insuranceInfo = insurance.getInsuranceWidgets()
    res.json(insuranceInfo)
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});