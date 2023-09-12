const multer = require('multer');

 const uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000000 }
});

module.exports=uploader