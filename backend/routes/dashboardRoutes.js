import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

let tasks = []; // Simple in-memory store (replace with MongoDB if needed)

// Get all tasks
router.get("/", authMiddleware, (req, res) => {
  res.json({ success: true, data: tasks });
});

// Add task
router.post("/add", authMiddleware, (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: "Title required" });

  const task = { _id: Date.now().toString(), title, description };
  tasks.push(task);
  res.status(201).json({ success: true, task });
});

// Delete task
router.delete("/:id", authMiddleware, (req, res) => {
  tasks = tasks.filter((t) => t._id !== req.params.id);
  res.json({ success: true, message: "Deleted" });
});

export default router;
