import express from "express";
import postController from "../controller/postController.js";

const router = express.Router();

// Get all posts
router.get("/", postController.getPosts);

// Get single posts
router.get("/:id", postController.getPostDetail);

// Create new post
router.post("/", postController.creatNewPost);

// Update posts
router.put("/:id", postController.updatePost);

// Delete post
router.delete("/:id", postController.deletePost);

export default router;
