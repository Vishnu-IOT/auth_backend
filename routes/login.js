const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getValues, verifycred } = require("../controllers/controller")
const errorhandle = require("../controllers/files");
const { otpverify } = require("../controllers/otpgen");
const { sendemail, updatepass } = require("../controllers/mailverify");

router.post('/login', registerUser);
router.post('/log', loginUser);
router.get('/values', verifycred, getValues);
router.post('/fileup', errorhandle);
router.get("/verify", verifycred);
router.post("/verifyotp", verifycred, otpverify);
router.post("/emailverify", sendemail)
router.post("/savepass", updatepass)


console.log("passed login");

module.exports = router;