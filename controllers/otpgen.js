const accountSid = process.env.ACC_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

var good ="";
function twiliootp(phone) {
    const visit = `+91${phone}`
    const otps = generateOTP();
    good=`${otps}`;
    client.messages
        .create({
            from: process.env.FROM_CONTACT,
            to: visit,
            body: `The Security Code to Login into your Account is ${otps}`
        })
        .then(message => console.log(message.sid));
}

function otpverify(req, res) {
    const ftotp = req.body;
    console.log(ftotp.otp);
    console.log(good);
    if (ftotp.otp === good) {
        return res.status(200).send({ success: "Valid OTP. Procced to Login" })
    }
    return res.status(400).send({ success: "InValid OTP" })
}

module.exports = { twiliootp, otpverify };