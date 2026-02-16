const express = require("express");
const router = express.Router();
const { firebaseLogin } = require("../controllers/auth.controller");
const { register, login} = require("../controllers/auth.controller");

router.post("/register", register);
router.post("/login", login);
router.post("/firebase-login", firebaseLogin);


module.exports = router;
