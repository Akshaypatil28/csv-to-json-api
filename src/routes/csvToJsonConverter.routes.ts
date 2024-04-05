import express from "express";

const router = express.Router();

router.get("/upload", (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
});