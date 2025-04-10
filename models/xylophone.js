const mongoose = require("mongoose");

const xylophoneSchema = new mongoose.Schema({
    material: String,
    keys: Number,
    tuning: String,
});

// Export the model
module.exports = mongoose.model("xylophone", xylophoneSchema);