const { execSync } = require("child_process");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const reportDir = path.join("cypress", "results", "mochawesome");
const combinedDir = path.join("cypress", "results", "combined");
const outputJson = path.join(combinedDir, "combined-report.json");

const files = glob.sync(`${reportDir}/*.json`);

if (files.length === 0) {
  console.error("No JSON reports found to merge.");
  process.exit(1);
}

if (!fs.existsSync(combinedDir)) {
  fs.mkdirSync(combinedDir, { recursive: true });
}

const mergeCmd = `npx mochawesome-merge ${files.join(" ")} > "${outputJson}"`;
const htmlCmd = `npx marge "${outputJson}" -o "${combinedDir}"`;

try {
  console.log("Merging JSON files...");
  execSync(mergeCmd, { stdio: "inherit", shell: true });

  console.log("Generating HTML report...");
  execSync(htmlCmd, { stdio: "inherit", shell: true });

  console.log("Report generated successfully in", combinedDir);
} catch (err) {
  console.error("Error generating report:", err.message);
  process.exit(1);
}
