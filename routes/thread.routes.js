const express = require("express");
const router = express.Router();
const {
  createThread,
  getThreads,
  getThreadById,
  getCompanyStats,
  getDifficultyStats,
  getYearStats
} = require("../controllers/thread.controller");

router.post("/", createThread);
router.get("/", getThreads);
router.get("/stats/company", getCompanyStats);
router.get("/stats/difficulty", getDifficultyStats);
router.get("/stats/year", getYearStats);
router.get("/:id", getThreadById);

module.exports = router;
