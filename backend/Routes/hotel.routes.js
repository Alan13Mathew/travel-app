const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.Controller');

router.get('/', hotelController.getAllHotels);
router.get('/:id', hotelController.getHotelById);
// router.post('/hotels', hotelController.createHotel);
// router.put('/hotels/:id', hotelController.updateHotel);
// router.delete('/hotels/:id', hotelController.deleteHotel);

module.exports = router;
