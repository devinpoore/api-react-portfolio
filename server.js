require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const client = require("twilio")(process.env.accountSid, process.env.authToken);

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 4500;

// app.get("/test", (req, res) => {
//     res.json("portfolio server sending back a response test test test");
// });

app.post("/email", (req, res) => {
    // console.log(req.body);

    if (req.body) {
        sendEmail(req.body)
    }

    res.json("Data received, email sent");
});

app.post("/sms", (req, res) => {
    // console.log(req.body);

    const {name, sms, body} = req.body;

    client.messages.create({
        body: name + " at '" + sms + "' has sent you the following message via your portfolio:\n\n" + body,
        from: process.env.twilioNum,
        to: process.env.devin
    }).then(message => console.log(message));

    res.end()

});

app.listen(PORT, () => {
    console.log("\nPortfolio Server Listening on PORT " + PORT);
});


async function sendEmail(emailObj) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.ethAddress,
            pass: process.env.ethPW
        }
    });

    let info = await transporter.sendMail({
        from: emailObj.name + ' <' + emailObj.email + '>',
        to: process.env.devinEmail,
        subject: 'Portfolio Correspondence',
        text: emailObj.body,
        html: ''
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

sendEmail().catch(console.error);