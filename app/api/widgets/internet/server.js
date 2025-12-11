const internet =  require("./internet.js");
const express = require('express')
const app = express();
const port = 8081;

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
    const internetInfo = internet.getInternetWidgets()
    res.json(internetInfo)
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});