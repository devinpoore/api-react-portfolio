const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");

const app = express();

// app.use(cors);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 4500;

app.get("/test", (req, res) => {
    res.json("portfolio server sending back a response test test test");
});

app.post("/email", (req, res) => {
    console.log(req.body);

    res.end();
});

app.listen(PORT, () => {
    console.log("\nPortfolio Server Listening on PORT " + PORT);
});