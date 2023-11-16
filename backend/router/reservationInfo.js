const express = require("express");
const router = express.Router();
const ReservationInfo = require("../models/reservationInfo");

// Create a new reservation
router.post("/", async (req, res) => {
  const { description, Montant, dated, datef, userId, Title } = req.body;

  const maxReservationInfoId = await ReservationInfo.findOne(
    {},
    {},
    { sort: { reservationinfoId: -1 }, reservationinfoId: 1 }
  );

  // Generate the new userId by incrementing the maximum value by 1
  const newReservationId = maxReservationInfoId
    ? maxReservationInfoId.reservationinfoId + 1
    : 1;

  const newReservation = new ReservationInfo({
    reservationinfoId: newReservationId,
    Title,
    dated: dated,
    datef: datef,
    userId,
    description,
    Montant,
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
  ReservationInfo.find()
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

  ReservationInfo.find({ userId })
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

  ReservationInfo.find({ serviceId })
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
    const reservations = await ReservationInfo.find({ accepted: true });
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
  ReservationInfo.findOne({ reservationId })
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

  ReservationInfo.findOneAndUpdate(
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
  ReservationInfo.findOneAndDelete({ reservationId })
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
  const reservationinfoId = req.params.reservationId;

  ReservationInfo.findOneAndUpdate(
    { reservationinfoId },
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
  const reservationinfoId = req.params.reservationId;

  ReservationInfo.findOneAndDelete({ reservationinfoId })
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
