const mongoose = require('mongoose');

// Video Metadata Schema
const videoMetadataSchema = new mongoose.Schema({
    videoId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true }, // Limit to 1000 seconds
    size: { type: Number, required: true }, // Size in MB
    resolution: { type: String },
    format: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Add indexes for efficient querying
videoMetadataSchema.index({ videoId: 1 });
videoMetadataSchema.index({ createdAt: -1 });

module.exports = mongoose.model('VideoMetadata', videoMetadataSchema);
