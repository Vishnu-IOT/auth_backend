const nodemailer = require("nodemailer");
const { dupilcateEntry, passupdate } = require("../models/dbfile");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "vishnubharani153@gmail.com",
        pass: process.env.APP_PASSWORD,
    },
});


function sendemail(req, res) {
    const data = req.body

    dupilcateEntry(data, (err, result) => {
        if (err) {
            console.log("not working");
            return res.status(500).send("Search error");
        }
        else if (result.length > 0) {
            const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '3m' });
            const sent = `http://localhost:3000/resetpass?temp_token=${token}`
            const info = transporter.sendMail({
                from: "vishnubharani153@gmail.com",
                to: data.email,
                subject: "Reset Password Link",
                text: "Here your Link to reset your password.",
                html: `<button><a href=${sent}>Reset Link</a></button>`,
            });
            console.log("Message sent:", info.messageId);
            console.log(result.length);
            return res.status(200).send({ success: "Reset Link is Sent Successfully", temp_token: token });
        }
        return res.status(400).send("Email ID doen't exists")
    });

};

function updatepass(req, res) {
    const decoded = jwt.verify(req.body.token, process.env.SECRET_KEY)
    console.log(decoded.email);
    passupdate(req.body, decoded.email, (err, result) => {
        if (err) {
            return res.status(500).send({ success: false })
        }
        if (result.affectedRows > 0) {
            console.log(result)
            return res.status(200).send(result);
        }
        return res.status(402).send({ success: false });
    })

}


module.exports = { sendemail, updatepass };
