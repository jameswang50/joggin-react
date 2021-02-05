const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positiveNumber = (distance) => distance > 0;

const EntrySchema = new Schema({
  date: {
    type: Date,
  },
  duration: {
    type: Number,
    default: 0,
    validate: [positiveNumber, 'Duration should be bigger than 00:00'],
  },
  distance: {
    type: Number,
    default: 0,
    validate: [positiveNumber, 'Distance should be bigger than 0km'],
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },
}, {
  timestamp: true,
});

module.exports = mongoose.model('Entry', EntrySchema);
