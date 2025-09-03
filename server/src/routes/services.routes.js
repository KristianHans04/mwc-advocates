const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dataPath = path.join(__dirname, "../services/data/services.json");

router.get("/", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    res.json({ success: true, data: data.services || [], source: "json" });
  } catch (error) {
    res.json({ success: true, data: [], source: "fallback" });
  }
});

module.exports = router;
