const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

var maxSize = 1024 * 1024;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    if (!extension) {
      //console.log('extension '+extension)
      callback(null,'');
    }
    else {
      callback(null, name + Date.now() + '.' + extension);
    }
  }
});

module.exports = multer({storage: storage, limits:{ fileSize: maxSize }}).single('image');
