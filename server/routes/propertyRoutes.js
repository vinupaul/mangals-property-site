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

  
module.exports = router;
