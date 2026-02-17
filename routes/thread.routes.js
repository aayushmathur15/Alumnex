const express = require("express");
const router = express.Router();
const {
  createThread,
  getThreads,
  getThreadById,
} = require("../controllers/thread.controller");

router.post("/", createThread);
router.get("/", getThreads);
router.get("/:id", getThreadById);

module.exports = router;
