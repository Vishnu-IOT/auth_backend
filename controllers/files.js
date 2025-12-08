const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, "./assets");
        }
        else {
            cb(new Error("Invalid File extension"), false);
        }
    },
    filename: (req, file, cb) => {
        cb(null, `good-${file.originalname}`);
    }
});

const uploads = multer({ storage, limits: { fileSize: 1000 } });

function errorhandle(req, res) {
    uploads.single("document")
        (req, res, (err) => {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).send("File Size is TOO Large");
                }
                return res.status(400).send("MulterError");
            }
            if (err) {
                return res.status(400).send("Invalid File Type Uploaded")
            }
            const data = req.file;
            if (!data) {
                return res.status(400).send("No File Uploaded")
            }
            return res.status(200).send(data);
        });
}

module.exports = errorhandle;