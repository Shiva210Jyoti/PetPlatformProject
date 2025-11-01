const express = require('express');
const router = express.Router();
const { saveForm, getAdoptForms, deleteForm, deleteAllRequests } = require('../Controller/AdoptFormController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/save', saveForm);
router.get('/getForms', authMiddleware, getAdoptForms);
router.delete('/reject/:id', authMiddleware, deleteForm);
router.delete('/delete/many/:id', authMiddleware, deleteAllRequests);

module.exports = router;
