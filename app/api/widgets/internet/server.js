const internet =  require("./internet.js");
const express = require('express')
const app = express();
const port = 8081;
const cors = require('cors');
const path = require("path");

app.use(cors())

app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
    const internetInfo = internet.getInternetWidgets()
    res.json(internetInfo)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});