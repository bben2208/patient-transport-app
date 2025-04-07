const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const transportController = require('../controllers/transport-controller');

router.get('/', ensureAuthenticated, transportController.getAllTransports);
router.get('/create', ensureAuthenticated, transportController.getCreateForm);
router.post('/create', ensureAuthenticated, transportController.createTransport);
router.get('/edit/:id', ensureAuthenticated, transportController.getEditForm);
router.post('/update/:id', ensureAuthenticated, transportController.updateTransport);
router.post('/delete/:id', ensureAuthenticated, transportController.deleteTransport);

module.exports = router;
