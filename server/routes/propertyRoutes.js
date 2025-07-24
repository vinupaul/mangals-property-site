const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// POST a new property
router.post('/', async (req, res) => {
  try {
    console.log('Received POST:', req.body);

    const newProperty = new Property(req.body);
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    console.error('Error saving property:', err);
    res.status(400).json({ error: 'Failed to add property' });
  }
});

// DELETE a property
router.delete('/:id', async (req, res) => {
    try {
      await Property.findByIdAndDelete(req.params.id);
      res.json({ message: 'Property deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete property' });
    }
  });
  
  // UPDATE a property
  router.put('/:id', async (req, res) => {
    try {
      const updated = await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update property' });
    }
  });

  const multer = require('multer');  
  // Configure multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage });
  
  // Route to create a new property with image upload
  router.post('/', upload.single('image'), async (req, res) => {
    const { title, location, price, type, description } = req.body;
  
    // ✅ Required field check
    if (!title || !location || !price || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
    const newProperty = new Property({
      title,
      location,
      price,
      type,
      description,
      imageUrl,
    });
  
    try {
      await newProperty.save();
      res.status(201).json(newProperty);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
