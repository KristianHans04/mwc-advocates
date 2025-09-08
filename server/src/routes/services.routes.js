const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Try multiple potential paths for the data file
const possiblePaths = [
  path.join(__dirname, "../services/data/services.json"), // Production (compiled)
  path.join(__dirname, "../data/services.json"),          // Development
  path.join(__dirname, "../../src/data/services.json"),   // Alternative dev path
];

function findDataFile() {
  for (const dataPath of possiblePaths) {
    if (fs.existsSync(dataPath)) {
      console.log(`📁 Found services data at: ${dataPath}`);
      return dataPath;
    }
  }
  console.error("❌ Could not find services.json in any of these paths:", possiblePaths);
  return null;
}

router.get("/", async (req, res) => {
  try {
    const dataPath = findDataFile();
    if (!dataPath) {
      return res.json({ success: true, data: [], source: "error - file not found" });
    }
    
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    console.log(`✅ Loaded ${data.services?.length || 0} services from JSON`);
    res.json({ success: true, data: data.services || [], source: "json", path: dataPath });
  } catch (error) {
    console.error("❌ Error reading services:", error.message);
    res.json({ success: true, data: [], source: "fallback", error: error.message });
  }
});

module.exports = router;
