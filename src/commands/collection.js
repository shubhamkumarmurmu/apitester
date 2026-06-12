const fs = require("fs");
const path = require("path");
const chalk = require("chalk").default;
const logger = require("../logger");

const COLLECTIONS_DIR = path.resolve(process.cwd(), "collections");

module.exports = async function collections() {
  if (!fs.existsSync(COLLECTIONS_DIR)) {
    logger.warn("No collections directory found.");
    return;
  }

  const files = fs
    .readdirSync(COLLECTIONS_DIR)
    .filter((file) => file.endsWith(".json"));

  if (files.length === 0) {
    logger.warn("No collections found.");
    return;
  }

  console.log(chalk.bold("\nSaved Collections:\n"));

  files.forEach((file, index) => {
    try {
      const filePath = path.join(COLLECTIONS_DIR, file);
      const collection = JSON.parse(
        fs.readFileSync(filePath, "utf8"),
      );

      console.log(
        `${chalk.cyan(`${index + 1}. ${collection.name}`)}`
      );
      console.log(chalk.dim(JSON.stringify(collection, null, 2)));
      console.log("");
    } catch (err) {
      logger.error(`Failed to read ${file}: ${err.message}`);
    }
  });
};