const Hotel = require('../models/Hotel.model');

exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

// exports.createHotel = async (req, res) => {
//     try {
//         const hotel = await Hotel.create(req.body);
//         res.status(201).json(hotel);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// exports.updateHotel = async (req, res) => {
//     try {
//         const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(hotel);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// exports.deleteHotel = async (req, res) => {
//     try {
//         const hotel = await Hotel.findByIdAndDelete(req.params.id);
//         res.status(200).json(hotel);
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }
