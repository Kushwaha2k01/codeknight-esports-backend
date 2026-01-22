const express = require('express');
const { body } = require('express-validator');
const applicationController = require('../controllers/applicationController');
const upload = require('../middleware/upload');

const router = express.Router();

// POST /api/apply
router.post('/', upload.single('resume'), [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').trim().isLength({ min: 1 }).withMessage('Phone is required'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('experience').trim().isLength({ min: 1 }).withMessage('Experience is required')
], applicationController.submitApplication);

module.exports = router;
