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

function createUser(data) {
    const { id, name, email, username, password } = data;
    crt.query(`INSERT INTO demouser (id,name,email,username,password) VALUES
         (?,?,?,?,?)`, [data.id, data.name, data.email, data.username, data.password],
        (err) => { if (err) { throw err; } console.log("table update") });
}

function dupilcateEntry(emailcheck, callback) {
    crt.query("select * from demouser where email=?", [emailcheck.email], callback);
}

function checkUser(logcheck, callback) {
    const sql = "SELECT * FROM demouser WHERE username=? AND password=?";

    crt.query(sql, [logcheck.username, logcheck.password], callback);
}

function valuesdb(borns, callback) {
    crt.query("select * from demouser", callback);
}

function passupdate(pass, email, callback) {
    crt.query("UPDATE demouser SET password = ? WHERE email=?", [pass.password,email],callback)
}

function createTable(){
    crt.query("create table newtable (id INT AUTO_INCREMENT not null unique, name VARCHAR(100) NOT NULL, email VARCHAR(150) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL);");
}


module.exports = { createUser, dupilcateEntry, checkUser, valuesdb, passupdate };






