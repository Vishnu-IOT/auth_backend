const { createUser, dupilcateEntry, checkUser, valuesdb } = require("../models/dbfile")
const jwt = require("jsonwebtoken");
const { twiliootp } = require("./otpgen");

async function registerUser(req, res) {
    const fdata = req.body;
    console.log(fdata);

    dupilcateEntry(fdata, (err, result) => {
        if (err) {
            console.log("not working");
            return res.status(400).send("Search error");
        }
        else if (result.length > 0) {
            console.log(result.length);
            return res.status(400).send("Email Already Exists");
        }
        else{
        createUser(fdata);
        return res.status(200).send({ success: "User Info Saved Successfully", bool: true });
        }
    });

    console.log("Passed Controller");
}

async function loginUser(req, res) {

    const datalog = req.body;
    console.log(datalog);
    await checkUser(datalog, (err, result) => {
        if (err) {
            return res.status(500).send({ success: false, message: "Database error" });
        }
        if (result.length > 0) {
            console.log(result);
            const token = jwt.sign(datalog, process.env.SECRET_KEY);
            twiliootp(datalog.ph_no);
            return res.status(200).send({ success: true, Token: token });
        } else {
            return res.status(402).send({ success: "falses" });
        }
    });
}

function verifycred(req, res, next) {
    const head = req.headers.authorization;
    jwt.verify(head, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(503).send("Invalid Token");
        }
        user.req = user;
        console.log(user.req);
        next();
    })
}

async function getValues(req, res) {
    const born = req.query;
    await valuesdb(born, (err, result) => {
        if (err) {
            return res.status(500).send({ success: false })
        }
        if (result.length > 0) {
            console.log(result)
            return res.status(200).send(result);
        }
        return res.status(402).send({ success: false });
    })
}

module.exports = { registerUser, loginUser, getValues, verifycred };




