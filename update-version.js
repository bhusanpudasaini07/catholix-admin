// update-version.js
const fs = require("fs");

const fileName = "version.js";
const fileContent = `module.exports = {
  "version": "1.0.0"
}
`;

// Check if the file exists
if (!fs.existsSync(fileName)) {
  // File doesn't exist, create it synchronously

  try {
    console.log("asdfasdfasdfasdfdsf");
    fs.writeFileSync(fileName, fileContent);
    console.log("File created successfully!");
  } catch (error) {
    console.error("Error creating file:", error);
  }
} else {
  console.log("File already exists.");
}

const versionFile = "./version.js";
const versionData = require(versionFile);

const versionParts = versionData.version.split(".");

let breaking = parseInt(versionParts[0]);
let feature = parseInt(versionParts[1]);
let fix = parseInt(versionParts[2]) + 1;

if (fix > 9) {
  fix = 0;
  ++feature;
}

if (feature > 10) {
  feature = 0;
  ++breaking;
}
versionData.version = `${breaking}.${feature}.${fix}`;

fs.writeFileSync(
  versionFile,
  `module.exports = ${JSON.stringify(versionData, null, 2)};\n`
);
