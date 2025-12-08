// routes/postRoutes.js
const express = require("express");
const Post = require("../models/Post");
const Comment=require('../models/Comment')
const ensureAuth = require("../middleware/auth");
const router = express.Router();

// Create a post (auth)
router.post("/", ensureAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    const author = req.session.userId;
    const newPost = await Post.create({ title, content, author });
    // populate author for response
    await newPost.populate("author", "-password");
    res.json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all posts (populate author)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "-password").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "-password");
    if (!post) return res.status(404).json({ message: "Not found" });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
