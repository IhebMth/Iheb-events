const express = require("express");
const router = express.Router();
const serviceModel = require("../models/service");
const Reservation = require("../models/reservation");

router.post("/", async (req, res) => {
  const {
    nom_service,
    description,
    prix,
    valid,
    userId,
    photo,
    categoryServiceId,
  } = req.body;

  const maxServiceId = await serviceModel.findOne(
    {},
    {},
    { sort: { serviceId: -1 }, limit: 1 }
  );

  // Generate the new userId by incrementing the maximum value by 1
  const newServiceId = maxServiceId ? maxServiceId.serviceId + 1 : 1;

  const newService = new serviceModel({
    serviceId: newServiceId,
    nom_service,
    description,
    prix,
    valid,
    userId,
    photo,
    categoryServiceId,
  });

  newService
    .save()
    .then((savedService) => {
      res.status(201).json(savedService);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to create service" });
    });
});

// Get all services
router.get("/", (req, res) => {
  serviceModel
    .find()
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve services" });
    });
});

// Get all services with userId
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  serviceModel
    .find({ userId, valid: true }) // Add valid condition
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve services" });
    });
});
router.get("/myservice/:userId", (req, res) => {
  const userId = req.params.userId;
  serviceModel
    .find({ userId }) // Add valid condition
    .then((services) => {
      res.status(200).json(services);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve services" });
    });
});

router.get("/notReserve/:userId", (req, res) => {
  const userId = req.params.userId;
  const reservedServiceIds = [];

  // Retrieve reserved service IDs for the user from the reservation table
  Reservation.find({ userId })
    .then((reservations) => {
      const reservedServiceIds = [];
      reservations.map((reservation) => {
        reservedServiceIds.push(reservation.serviceId);
      });

      // Find services that are not reserved for the user
      serviceModel
        .find({ serviceId: { $nin: reservedServiceIds } })
        .then((services) => {
          res.status(200).json(services);
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to retrieve services" });
        });
    })
    .catch((error) => {
      serviceModel
        .find()
        .then((services) => {
          res.status(200).json(services);
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to retrieve services" });
        });
    });
});

// Get a service by serviceId
router.get("/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId;
  serviceModel
    .findOne({ serviceId })
    .then((service) => {
      if (service) {
        res.status(200).json(service);
      } else {
        res.status(404).json({ error: "Service not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to retrieve service" });
    });
});

// Update a service by serviceId
router.put("/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId;
  const { nom_service, description, prix, localisation, valid, userId } =
    req.body;
  serviceModel
    .findOneAndUpdate(
      { serviceId },
      { nom_service, description, prix, localisation, valid, userId },
      { new: true }
    )
    .then((updatedService) => {
      if (updatedService) {
        res.status(200).json(updatedService);
      } else {
        res.status(404).json({ error: "Service not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to update service" });
    });
});

// Delete a service by serviceId
router.delete("/:serviceId", (req, res) => {
  const serviceId = req.params.serviceId;
  serviceModel
    .findOneAndDelete({ serviceId })
    .then((deletedService) => {
      if (deletedService) {
        res.status(200).json(deletedService);
      } else {
        res.status(404).json({ error: "Service not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete service" });
    });
});

module.exports = router;
