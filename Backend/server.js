const express = require("express");
const app = express();

// console.log("running")
app.use(express.json());


app.listen(3000, () => {
    console.log("Server is running on port: 3000");
});

module.exports = app;
