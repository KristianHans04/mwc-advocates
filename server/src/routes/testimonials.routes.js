const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../services/data/testimonials.json");

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    res.json({ success: true, data: data.testimonials || [], source: "json" });
  } catch (error) {
    res.json({ success: true, data: [], source: "fallback" });
  }
});

module.exports = router;
