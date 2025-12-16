const internet =  require("./internet.js");
const express = require('express')
const app = express();
const port = 8081;
const cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
    const internetInfo = internet.getInternetWidgets()
    res.json(internetInfo)
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});