const db = require("mongoose")
require("dotenv").config();
console.log(process.env.MONGO_DB)

try {
    db.connect("mongodb+srv://vishnu:Vishnu%401234@nodebe.p6ohiqs.mongodb.net/?appName=NodeBE");
    console.log("successfully connected")
    db.use.employee;
}
catch {
    console.log("error")
}