const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// GET all notes for current user
router.get("/", async (req, res) => {
  const userId = req.header("x-user-id");
  if (!userId) return res.status(400).send("User ID missing");

  const notes = await Note.find({ user: userId });
  res.json(notes);
});

// POST a new note for current user
router.post("/", async (req, res) => {
  const userId = req.header("x-user-id");
  if (!userId) return res.status(400).send("User ID missing");

  const note = new Note({ ...req.body, user: userId });
  await note.save();
  res.json(note);
});

module.exports = router;