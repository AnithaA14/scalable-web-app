import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;
