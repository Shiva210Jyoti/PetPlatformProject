const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { postPetRequest, approveRequest, deletePost, allPets } = require('../Controller/PetController');
const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/requests', authMiddleware, (req, res) => allPets('Pending', req, res));
router.get('/approvedPets', (req, res) => allPets('Approved', req, res));
router.get('/adoptedPets', (req, res) => allPets('Adopted', req, res));
router.post('/services', upload.single('picture'), postPetRequest);
router.put('/approving/:id', authMiddleware, approveRequest);
router.delete('/delete/:id', authMiddleware, deletePost);

module.exports = router;
