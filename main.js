const express = require("express");
const App = express();
const port = 6060;

App.get('/', (req, res) => {
    res.send(`Working.`);
})

App.listen(port, (e) => {
    console.log(`listening on ${port}`);
})
