const db = require("mysql2")
require("dotenv").config();

const crt = db.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQLPORT
});

crt.connect(
    (err) => {
        if (err) { throw err; } console.log("connected");
    });

async function createUser(data) {
    const { id, name, email, username, password } = data;
    await crt.query(`INSERT INTO demouser (id,name,email,username,password) VALUES
         (?,?,?,?,?)`, [id, name, email, username, password],
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



