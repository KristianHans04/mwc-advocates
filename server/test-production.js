// Quick test script for production data loading
const fs = require('fs');
const path = require('path');

console.log('📍 Current working directory:', process.cwd());
console.log('📍 __dirname:', __dirname);

// Test path resolution
const dataPath1 = path.join(__dirname, 'dist/data');
const dataPath2 = path.join(__dirname, 'dist/data/services.json');

console.log('🔍 Testing data paths:');
console.log('   Data directory:', dataPath1);
console.log('   Services file:', dataPath2);

console.log('📁 Data directory exists:', fs.existsSync(dataPath1));
console.log('📄 Services file exists:', fs.existsSync(dataPath2));

if (fs.existsSync(dataPath1)) {
  console.log('📋 Data directory contents:', fs.readdirSync(dataPath1));
}

if (fs.existsSync(dataPath2)) {
  try {
    const services = JSON.parse(fs.readFileSync(dataPath2, 'utf8'));
    console.log(`✅ Successfully loaded ${services.length} services`);
  } catch (error) {
    console.log('❌ Error reading services:', error.message);
  }
}
