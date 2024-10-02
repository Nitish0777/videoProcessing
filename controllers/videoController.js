const VideoMetadata = require('../models/videoMetadata');

// Create video metadata
exports.createVideo = async (req, res) => {
    const { videoId, title, description, duration, size, resolution, format } = req.body;

    if (duration > 1000) return res.status(400).json({ message: 'Video duration exceeds the 1000 seconds limit' });

    try {
        const newVideo = new VideoMetadata({ videoId, title, description, duration, size, resolution, format });
        await newVideo.save();
        res.status(201).json({ message: 'Video metadata created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Retrieve paginated video metadata
exports.getVideos = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const skip = (page - 1) * limit;
        const videos = await VideoMetadata.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));
        res.json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update video metadata
exports.updateVideo = async (req, res) => {
    try {
        const updatedVideo = await VideoMetadata.findOneAndUpdate({ videoId: req.params.id }, req.body, { new: true });
        if (!updatedVideo) return res.status(404).json({ message: 'Video not found' });
        res.status(200).json(updatedVideo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete video metadata
exports.deleteVideo = async (req, res) => {
    try {
        const deletedVideo = await VideoMetadata.findOneAndDelete({ videoId: req.params.id });
        if (!deletedVideo) return res.status(404).json({ message: 'Video not found' });
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
