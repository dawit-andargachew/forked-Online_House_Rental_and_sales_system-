const multer = require('multer')

const storage = (folder) => multer.diskStorage({
  destination: `./uploads/${folder}`,
  filename: (req, file, cb) => {
    return cb(null, Date.now() + '_' + file.originalname)
  }
})

const upload = (folder) => multer({
  storage: storage(folder),
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}); 

module.exports = upload
