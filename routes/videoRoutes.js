const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");
const { authenticate, isAdmin } = require("../middlewares/authMiddleware");

// Video metadata routes
router.post("/videos", authenticate, isAdmin, videoController.createVideo);
router.get("/videos", authenticate, videoController.getVideos);
router.put("/videos/:id", authenticate, isAdmin, videoController.updateVideo);
router.delete(
  "/videos/:id",
  authenticate,
  isAdmin,
  videoController.deleteVideo
);

module.exports = router;
