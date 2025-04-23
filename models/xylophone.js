const mongoose = require("mongoose");

const xylophoneSchema = new mongoose.Schema({
  material: {
    type: String,
    required: [true, 'Material is required'],
    enum: {
      values: ['wood', 'metal', 'plastic'],
      message: '{VALUE} is not a valid material'
    }
  },
  keys: {
    type: Number,
    min: [8, 'Xylophones must have at least 8 keys'],
    max: [88, 'Xylophones cannot have more than 88 keys'],
  },
  tuning: {
    type: String
  }
});

module.exports = mongoose.model("xylophone", xylophoneSchema);
