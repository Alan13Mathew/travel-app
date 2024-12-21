const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  star: {
    type: Number,
    min: 0,
    max: 5
  },
  price: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  },
  amenities: [{
    type: String
  }],
  reviews: [{
    user: String,
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('Hotel', hotelSchema);

