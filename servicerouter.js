// serviceRoutes.js

const express = require('express');
const router = express.Router();
const Service = require('./models/service'); // Import your Service model

// POST /services/:serviceId/add-subcategory
router.post('/:serviceId/add-subcategory', async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const { category } = req.body; // Assuming the subcategory data is sent in the request body

    // Find the service by ID and update it to add the subcategory
    const service = await service.findByIdAndUpdate(serviceId, { $addToSet: { subcategories: category } }, { new: true });

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Send a success response with the updated service
    res.status(200).json(service);
  } catch (error) {
    console.error('Error adding subcategory:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
