const express = require("express");
const userServes = require("../services/user.service");
const middlewares = require("../services/middlewares")
const router = express.Router();
const jwt = require("jsonwebtoken");


router.all("*", (req, res, next) => {
  console.log("All request go passes here");
  next();
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const errorList = await userServes.validateUser(req.body);
    if (errorList.length) res.status(404).send(errorList);

    const token = await userServes.authenticateUser(req.body);
    res.send({
      accessToken: token
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

//REFRESH
router.post("/refresh", async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    const refreshToken = await userServes.refreshToken(accessToken)
    res.send({ refresh: refreshToken });
  } catch (err) {
    res.status(400).send(err);
  }
});

// LOGOUT
router.post("/logout", middlewares.authentication, async (req, res) => {
  try {
    const accessToken = req.body.accessToken;
    const userId = req.user._id;
    const tokenDeleted = await userServes.deleteToken(userId, accessToken);
    res.send(tokenDeleted);
  } catch (err) {
    res.status(400).send(err);
  }
});


//GET ALL USERS
router.get("/", async (req, res) => {
  const data = await userServes.getAllUser();
  res.send(data);
});

//GET ONE USER
router.get("/user", middlewares.authentication, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});




//UPDATE USER
router.put("/user", middlewares.authentication, async (req, res) => {
  try {
    const updateMe = await userServes.updateUser(req.user._id, req.body);
    res.send(updateMe);
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

//DELETE USER
router.delete("/user", middlewares.authentication, async (req, res) => {
  console.log(req.user);
  try {
    const delUser = userServes.deleteUser(req.user._id);
    res.status(200).send(delUser);
  } catch (err) {
    res.status(400).send(err);
  }
});
 
//ADD NEW USER
router.post("/user", async (req, res) => {
  try {
    const user = await userServes.addUser(req.body);
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = router;
