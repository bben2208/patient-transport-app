const express = require('express');
const router = express.Router();
const transportController = require('../controllers/transportController');

// Ensure functions are imported correctly
if (!transportController.getAllTransports) {
  console.error("getAllTransports function is not defined in transportController.");
  process.exit(1);
}

// Define routes
router.get('/', transportController.getAllTransports);
router.get('/create', transportController.getCreateForm);
router.post('/create', transportController.createTransport);
router.get('/edit/:id', transportController.getEditForm);
router.post('/update/:id', transportController.updateTransport);
router.post('/delete/:id', transportController.deleteTransport);

module.exports = router;
