const multer = require('multer');
const { request } = require('express');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
            return cb(new multer.MulterError('Arquivo precisa ser PNG ou JPEG'));
        }
        cb(null, './public/uploads/pictures');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

module.exports = multer({ storage: storage }).single('picture');
