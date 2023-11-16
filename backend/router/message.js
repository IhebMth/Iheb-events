const express = require("express");
const router = express.Router();
const Message = require("../models/message");

// Send a new message
router.post("/messages", async (req, res) => {
  try {
    const { messageId, text, date, reservationId, userId } = req.body;

    const newMessage = new Message({
      messageId,
      text,
      date,
      reservationId,
      userId,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find();

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
