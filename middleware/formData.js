const multer = require('multer')

module.exports = async (req, res, next) => {
  const upload = multer({
    limits: {
      fileSize: 1000000,
    },
    fileFilter(request, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('Please upload an image'))
      }

      cb(undefined, true)
    },
  }).array('image', 1)

  upload(req, res, err => {
    if (err) {
      console.error(err)
      return res.status(400).json({ errors: [{ msg: err.message }] })
    }

    next()
  })
}
