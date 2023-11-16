const express = require("express");

const router = express.Router();
const userRouter = require("./user");
const serviceRouter = require("./service");
const categoryServiceRouter = require("./categoryService");
const reservationRouter = require("./reservation");
const reservationInfoRouter = require("./reservationInfo");
const avisRouter = require("./avis");
const messageRouter = require("./message");

router.use("/user", userRouter);

router.use("/service", serviceRouter);

router.use("/categoryService", categoryServiceRouter);

router.use("/reservation", reservationRouter);

router.use("/avis", avisRouter);

router.use("/reservationInfo", reservationInfoRouter);

router.get("/notifications", (req, res) => {
  // Your code to retrieve notifications goes here
  // You can query your database or any other data source to  notifications

  const notifications = [
    // Sample notifications data
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
  ];
  res.status(201).json(notifications);
});

module.exports = router;
