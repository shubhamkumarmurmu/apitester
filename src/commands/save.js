const fs = require("fs");
const path = require("path");
const arg = require("arg");
const chalk = require("chalk").default;
const { parseCommonArgs } = require("../utils/args");
const logger = require("../logger");

const COLLECTIONS_DIR = path.resolve(process.cwd(), "collections");

const HELP = `
${chalk.bold("USAGE")}
  apitester save <name> --method <method> --url <url> [options]

${chalk.bold("OPTIONS")}
  --method   <method>      HTTP method (default: GET)
  --url      <url>         Request URL
  --data,    -d  <json>    Request body
  --header,  -H  <header>  Headers to include
  --env,     -e  <env>     Environment override

${chalk.bold("EXAMPLES")}
  apitester save get-user    --method GET    --url /users/1
  apitester save create-user --method POST   --url /users --data '{"name":"John"}'
  apitester save update-user --method PUT    --url /users/1 --data '{"name":"Jane"}'
  apitester save delete-user --method DELETE --url /users/1
`;

module.exports = async function save(argv) {
  const topArgs = arg(
    {
      "--method": String,
      "--url": String,
      "--help": Boolean,
      "--data": String,
      "--header": [String],
      "--env": String,
      "--timeout": Number,
      "--verbose": Boolean,
      "-d": "--data",
      "-H": "--header",
      "-e": "--env",
      "-t": "--timeout",
      "-v": "--verbose",
      "-h": "--help",
    },
    { argv, permissive: false },
  );

  if (topArgs["--help"]) {
    console.log(HELP);
    return;
  }

  const name = topArgs._[0];
  if (!name) {
    logger.error(
      "Collection name is required.  Usage: apitest save <name> --method GET --url <url>",
    );
    process.exit(1);
  }

  const { parseHeaders } = require("../utils/formatter");
  const commonOpts = {
    data: topArgs["--data"],
    headers: parseHeaders(topArgs["--header"] || []),
    env: topArgs["--env"],
    timeout: topArgs["--timeout"],
  };

  const method = (topArgs["--method"] || "GET").toUpperCase();
  const url = topArgs["--url"] || topArgs._[1];

  if (!url) {
    logger.error("URL is required. Use --url <url>");
    process.exit(1);
  }

  const collection = {
    name,
    method,
    url,
    ...(commonOpts.data && { data: commonOpts.data }),
    ...(Object.keys(commonOpts.headers || {}).length && {
      headers: commonOpts.headers,
    }),
    ...(commonOpts.env && { env: commonOpts.env }),
    ...(commonOpts.timeout && { timeout: commonOpts.timeout }),
    savedAt: new Date().toISOString(),
  };

  if (!fs.existsSync(COLLECTIONS_DIR)) {
    fs.mkdirSync(COLLECTIONS_DIR, { recursive: true });
  }

  const filePath = path.join(COLLECTIONS_DIR, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(collection, null, 2), "utf8");

  logger.success(`Collection "${name}" saved to ${filePath}`);
  console.log(chalk.dim(JSON.stringify(collection, null, 2)));
};
