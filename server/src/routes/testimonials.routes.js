const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Try multiple potential paths for the data file
const possiblePaths = [
  path.join(__dirname, "../services/data/testimonials.json"), // Production (compiled)
  path.join(__dirname, "../data/testimonials.json"),          // Development
  path.join(__dirname, "../../src/data/testimonials.json"),   // Alternative dev path
];

function findDataFile() {
  for (const dataPath of possiblePaths) {
    if (fs.existsSync(dataPath)) {
      console.log(`📁 Found testimonials data at: ${dataPath}`);
      return dataPath;
    }
  }
  console.error("❌ Could not find testimonials.json in any of these paths:", possiblePaths);
  return null;
}

router.get("/", async (req, res) => {
  try {
    const dataPath = findDataFile();
    if (!dataPath) {
      return res.json({ success: true, data: [], source: "error - file not found" });
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    console.log(`✅ Loaded ${data.testimonials?.length || 0} testimonials from JSON`);
    res.json({ success: true, data: data.testimonials || [], source: "json", path: dataPath });
  } catch (error) {
    console.error("❌ Error reading testimonials:", error.message);
    res.json({ success: true, data: [], source: "fallback", error: error.message });
  }
});

module.exports = router;
