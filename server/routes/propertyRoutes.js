// routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const Property = require('../models/Property');

// Configure multer to store files in /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ Create new property with image upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, location, price, type, description } = req.body;

    if (!title || !location || !price || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProperty = new Property({
      title,
      location,
      price,
      type,
      description,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    console.error('Error saving property:', err);
    res.status(500).json({ error: 'Failed to save property' });
  }
});

// Other CRUD routes
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update property' });
  }
});

module.exports = router;