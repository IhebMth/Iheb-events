const express = require("express");
const router = express.Router();
const Avis = require("../models/avis");

// Create a new avis
router.post("/donneAvis", async (req, res) => {
  try {
    const { avisId, text, Evaluation, reservationId, userId } = req.body;

    const maxAvisionId = await Avis.findOne(
      {},
      {},
      { sort: { avisId: -1 }, avisId: 1 }
    );

    // Generate the new userId by incrementing the maximum value by 1
    const newavisId = maxAvisionId ? maxAvisionId.avisId + 1 : 1;

    const newAvis = new Avis({
      avisId: newavisId,
      text,
      Evaluation,
      reservationId,
      userId,
    });

    const savedAvis = await newAvis.save();

    res.status(201).json(savedAvis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all aviss
router.get("/", async (req, res) => {
  try {
    const aviss = await Avis.find();

    res.json(aviss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific avis by ID
router.get("/:id", async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);

    if (!avis) {
      return res.status(404).json({ error: "Avis not found" });
    }

    res.json(avis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:rid/:id", async (req, res) => {
  try {
    const avis = await Avis.find({
      userId: req.params.id,
      reservationId: req.params.rid,
    });

    if (!avis) {
      return res.status(404).json({ error: "Avis not found" });
    }

    res.json(avis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Update a specific avis by ID
router.put("/avis/:id", async (req, res) => {
  try {
    const { avisId, text, Evaluation, reservationId, userId } = req.body;

    const updatedAvis = await Avis.findByIdAndUpdate(
      req.params.id,
      {
        avisId,
        text,
        Evaluation,
        reservationId,
        userId,
      },
      { new: true }
    );

    if (!updatedAvis) {
      return res.status(404).json({ error: "Avis not found" });
    }

    res.json(updatedAvis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific avis by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedAvis = await Avis.findByIdAndRemove(req.params.id);

    if (!deletedAvis) {
      return res.status(404).json({ error: "Avis not found" });
    }

    res.json({ message: "Avis deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
