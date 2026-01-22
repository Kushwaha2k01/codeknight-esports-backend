const Application = require('../models/Application');
const { validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

exports.submitApplication = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, location, language, experience, portfolio } = req.body;
    const resume = req.file ? req.file.path : null;

    if (!resume) {
      return res.status(400).json({ message: 'Resume file is required' });
    }

    const application = new Application({
      name,
      email,
      phone,
      location,
      language,
      experience,
      portfolio,
      resume
    });

    await application.save();

    res.status(201).json({
      message: 'Application submitted successfully',
      application: {
        id: application._id,
        name: application.name,
        email: application.email
      }
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
