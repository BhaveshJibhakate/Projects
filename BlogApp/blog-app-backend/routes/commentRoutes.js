// routes/commentRoutes.js
const express = require("express");
const Comment = require("../models/Comment");
const ensureAuth = require("../middleware/auth");
const router = express.Router();

// Add comment to post
router.post("/:postId", ensureAuth, async (req, res) => {
  try {
    const { text } = req.body;
    const post = req.params.postId;
    const user = req.session.userId;

    const newComment = await Comment.create({ text, post, user });
    await newComment.populate("user", "-password");
    await newComment.populate("post");

    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "-password")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
