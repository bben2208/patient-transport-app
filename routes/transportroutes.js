const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');

router.get('/', transportController.getAllTransports);
router.get('/create', transportController.getCreateForm);
router.post('/create', transportController.createTransport);
router.get('/edit/:id', transportController.getEditForm);
router.post('/edit/:id', transportController.updateTransport);
router.post('/delete/:id', transportController.deleteTransport);

module.exports = router;
