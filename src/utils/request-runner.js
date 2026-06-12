const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { sendRequest } = require("../services/http");
const { formatResponse } = require("../utils/formatter");
const logger = require("../logger");

async function runRequest(method, cliOptions) {

  let result;
  try {
    result = await sendRequest({
      method,
      url: cliOptions.url ,
      headers: cliOptions.headers,
      data: cliOptions.data,
      timeout: cliOptions.timeout,
      verbose: cliOptions.verbose,
    });
  } catch (err) {
    logger.error(err.message);
    process.exit(1);
  }

  const { status, statusText, headers, data, timeTaken } = result;
  const isSuccess = status >= 200 && status < 300;

  const output = formatResponse({
    status,
    statusText,
    headers,
    data,
    timeTaken,
    verbose: cliOptions.verbose,
  });

  logger.print(output);

  if (cliOptions.output) {
    const outPath = path.resolve(cliOptions.output);
    const body =
      typeof data === "object" ? JSON.stringify(data, null, 2) : String(data);
    fs.writeFileSync(outPath, body, "utf8");
    logger.success(`Response body saved to ${outPath}`);
  }

  if (status >= 400) process.exit(1);

  return result;
}

module.exports = { runRequest };
