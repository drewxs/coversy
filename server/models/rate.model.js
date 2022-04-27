const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  site: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Site',
    required: true,
  },
  ratelog: [
    {
      date: {
        type: Date,
        required: true,
      },
      hourlyRate: {
        type: Number,
        required: true,
      },
      taxRate: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Rate', RateSchema);
