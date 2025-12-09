const db = require("mysql2")
require("dotenv").config();

const crt = db.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
    port: process.env.PORT
});

crt.connect(
    (err) => {
        if (err) { throw err; } console.log("connected");
    });

async function createUser(data) {
    const { name, email, username, password } = data;
    await crt.query(`insert into demouser (name,email,username,password) values
         (?,?,?,?)`, [name, email, username, password],
        (err) => { if (err) { throw err; } console.log("table update") });
}

async function dupilcateEntry(emailcheck, callback) {
    await crt.query("select * from demouser where email=?", [emailcheck.email], callback);
}

async function checkUser(logcheck, callback) {
    const sql = "SELECT * FROM demouser WHERE username=? AND password=?";

    crt.query(sql, [logcheck.username, logcheck.password], callback);
}

function valuesdb(borns, callback) {
    crt.query("select * from demouser", callback);
}

function passupdate(pass, email, callback) {
    crt.query("UPDATE demouser SET password = ? WHERE email=?", [pass.password,email],callback)
}

module.exports = { createUser, dupilcateEntry, checkUser, valuesdb, passupdate };