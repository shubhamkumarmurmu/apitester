const fs = require("fs");
const path = require("path");
const chalk = require("chalk").default;
const logger = require("../logger");

const COLLECTIONS_DIR = path.resolve(process.cwd(), "collections");
const HELP = `
${chalk.bold("USAGE")}
  apitester collection
  apitester collection access <name|id>

${chalk.bold("OPTIONS")}
  access <name|id>  View a saved collection by name or its numbered ID
`;

module.exports = async function collections(argv = []) {
  const [action, identifier, ...extraArgs] = argv;

  if (action === "--help" || action === "-h") {
    console.log(HELP);
    return;
  }

  if (action && action !== "access") {
    logger.error(`Unknown collection option "${action}".\n${HELP}`);
    process.exitCode = 1;
    return;
  }

  if (action === "access" && (!identifier || extraArgs.length)) {
    logger.error(
      "Provide exactly one collection name or ID. Usage: apitester collection access <name|id>",
    );
    process.exitCode = 1;
    return;
  }

  if (!fs.existsSync(COLLECTIONS_DIR)) {
    if (action === "access") {
      logger.error("No collections directory found.");
      process.exitCode = 1;
      return;
    }
    logger.warn("No collections directory found.");
    return;
  }

  const files = fs
    .readdirSync(COLLECTIONS_DIR)
    .filter((file) => file.endsWith(".json"));

  if (files.length === 0) {
    if (action === "access") {
      logger.error("No collections found.");
      process.exitCode = 1;
      return;
    }
    logger.warn("No collections found.");
    return;
  }

  if (action === "access") {
    const fileIndex = /^\d+$/.test(identifier) ? Number(identifier) - 1 : -1;
    const file =
      fileIndex >= 0 && fileIndex < files.length
        ? files[fileIndex]
        : files.find(
            (candidate) =>
              path.basename(candidate, ".json") === identifier,
          );

    if (!file) {
      logger.error(
        `Collection "${identifier}" not found. Use "apitester collection" to list saved collections.`,
      );
      process.exitCode = 1;
      return;
    }

    const filePath = path.join(COLLECTIONS_DIR, file);
    let collection;
    try {
      collection = JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      logger.error(`Failed to read collection "${identifier}": ${err.message}`);
      process.exitCode = 1;
      return;
    }

    console.log(
      chalk.bold(
        `\nCollection: ${collection.name || path.basename(file, ".json")}\n`,
      ),
    );
    console.log(chalk.dim(JSON.stringify(collection, null, 2)));
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