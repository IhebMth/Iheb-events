const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const { async } = require("rxjs");

// Create a new reservation
router.post("/", async (req, res) => {
  const { serviceId, description, Montant, Temps, lieu, accepted, userId } =
    req.body;

  const maxReservationId = await Reservation.findOne(
    {},
    {},
    { sort: { reservationId: -1 }, reservationId: 1 }
  );

  // Generate the new userId by incrementing the maximum value by 1
  const newReservationId = maxReservationId
    ? maxReservationId.reservationId + 1
    : 1;

  const newReservation = new Reservation({
    reservationId: newReservationId,
    date: Date.now().toString(),
    userId,
    serviceId,
    description,
    Montant,
    Temps,
    lieu,
    accepted,
  });

  newReservation
    .save()
    .then((savedReservation) => {
      res.status(201).json(savedReservation);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create reservation" });
    });
});

// Get all reservations
router.get("/", (req, res) => {
  Reservation.find()
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve reservations" });
    });
});

// Get all user reservations
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;

  Reservation.find({ userId })
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve reservations" });
    });
});

// Get all user reservations
router.get("/service/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId;

  Reservation.find({ serviceId })
    .then((reservations) => {
      res.status(200).json(reservations);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve reservations" });
    });
});

// GET accepted reservations
router.get("/accepted", async (req, res) => {
  try {
    const reservations = await Reservation.find({ accepted: true });
    console.log(reservations);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while retrieving accepted reservations.",
    });
  }
});

// Get a reservation by reservationId
router.get("/:reservationId", (req, res) => {
  const reservationId = req.params.reservationId;
  Reservation.findOne({ reservationId })
    .then((reservation) => {
      if (reservation) {
        res.status(200).json(reservation);
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve reservation" });
    });
});

// Update a reservation by reservationId
router.put("/:reservationId", (req, res) => {
  const reservationId = req.params.reservationId;
  const {
    date,
    serviceId,
    description,
    Montant,
    Temps,
    lieu,
    accepted,
    userId,
  } = req.body;

  Reservation.findOneAndUpdate(
    { reservationId },
    {
      date,
      serviceId,
      description,
      Montant,
      Temps,
      lieu,
      accepted,
      userId,
    },
    { new: true }
  )
    .then((updatedReservation) => {
      if (updatedReservation) {
        res.status(200).json(updatedReservation);
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update reservation" });
    });
});

// Delete a reservation by reservationId
router.delete("/:reservationId", (req, res) => {
  const reservationId = req.params.reservationId;
  Reservation.findOneAndDelete({ reservationId })
    .then((deletedReservation) => {
      if (deletedReservation) {
        res.status(200).json(deletedReservation);
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete reservation" });
    });
});

// Accept a reservation
router.put("/accept/:reservationId", (req, res) => {
  const reservationId = req.params.reservationId;

  Reservation.findOneAndUpdate(
    { reservationId },
    { accepted: true },
    { new: true }
  )
    .then((updatedReservation) => {
      if (updatedReservation) {
        res.status(200).json(updatedReservation);
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to accept reservation" });
    });
});

// Refuse a reservation
router.delete("/refuse/:reservationId", (req, res) => {
  const reservationId = req.params.reservationId;

  Reservation.findOneAndDelete({ reservationId })
    .then((updatedReservation) => {
      if (updatedReservation) {
        res.status(200).json(updatedReservation);
      } else {
        res.status(404).json({ error: "Reservation not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to refuse reservation" });
    });
});

module.exports = router;
