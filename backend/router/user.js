const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");

// POST route for user registration
router.post("/register", async (req, res) => {
  try {
    const { cin, nom, pernom, num_tel, addresse, email, password, type } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const maxUserId = await userModel.findOne(
      {},
      {},
      { sort: { userId: -1 }, limit: 1 }
    );

    // Generate the new userId by incrementing the maximum value by 1
    const newUserId = maxUserId ? maxUserId.userId + 1 : 1;
    const newUser = new userModel({
      userId: newUserId,
      type: type,
      cin: cin,
      nom: nom,
      pernom,
      num_tel,
      addresse,
      email,
      mdp: hashedPassword,
    });
    console.log(newUser);

    await newUser.save();

    res.status(200).send({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// POST route for user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).send("Invalid username or password");
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.mdp);

    if (!passwordMatch) {
      res.status(401).send("Invalid username or password");
      return;
    }

    res.status(200).send(user.toJSON());
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit-profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { cin, nom, prenom, num_tel, adresse, email } = req.body;

    // Find the user by userId
    const user = await userModel.findOne({ userId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Update the user profile
    user.cin = cin ? cin : user.cin;
    user.nom = nom ? nom : user.nom;
    user.pernom = prenom ? prenom : user.pernom;
    user.num_tel = num_tel ? num_tel : user.num_tel;
    user.addresse = adresse ? adresse : user.addresse;
    user.email = email ? email : user.email;

    // Save the updated user

    await user.save();

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (err) {
    console.error("Error occurred while retrieving users:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving users." });
  }
});
router.get("/:userid", async (req, res) => {
  try {
    const userid = req.params.userid;
    const user = await userModel.findOne({ userId: userid });
    res.status(200).json(user);
  } catch (err) {
    console.error("Error occurred while retrieving users:", err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving users." });
  }
});

router.delete("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await userModel
      .findOneAndDelete({ userId: userId })
      .exec();
    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.error("Error occurred while deleting user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
