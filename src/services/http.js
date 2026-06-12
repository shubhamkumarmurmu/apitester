const axios = require("axios");
const logger =require('../logger')

const DEFAULT_TIMEOUT = 10000;

async function sendRequest(options) {
  const {
    method,
    url,
    headers = {},
    data,
    timeout = DEFAULT_TIMEOUT,
    verbose = false,
  } = options;

  validateUrl(url);

  let parseData;
  if (data !== undefined) parseData = parseBody(data);

  const axiosConfig = {
    method: method.toUpperCase(),
    url: url,
    headers,
    timeout,
    validateStatus: () => true,
  };

  if (parseData !== undefined) axiosConfig.data = parseData;

  if (verbose) {
    logger.debug(`→ ${axiosConfig.method} ${resolvedUrl}`);
    if (Object.keys(headers).length > 0) {
      logger.debug("Request headers:", JSON.stringify(headers, null, 2));
    }
    if (parsedData !== undefined) {
      logger.debug("Request body:", JSON.stringify(parsedData, null, 2));
    }
  }

  const start = Date.now();
  let response;
  try {
    response = await axios(axiosConfig);
  } catch (e) {
    handleAxiosError(e, url, timeout);
  }
  const timeTaken = Date.now() - start;
  return {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    data: response.data,
    timeTaken,
  };
}

function parseBody(data) {
  if (typeof data === "object") return data;
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch {
      throw new Error(
        `Invalid JSON payload: ${data}\n  Hint: wrap the value in single quotes if using a shell.`,
      );
    }
  }
  return data;
}

function handleAxiosError(err, url, timeout) {
  if (err.code === "ECONNABORTED" || err.message.includes("timeout")) {
    throw new Error(`Request timed out after ${timeout}ms. (${url})`);
  }
  if (err.code === "ENOTFOUND") {
    throw new Error(
      `Could not resolve host: "${new URL(url).hostname}". Check your URL or internet connection.`,
    );
  }
  if (err.code === "ECONNREFUSED") {
    throw new Error(`Connection refused at ${url}. Is the server running?`);
  }
  throw new Error(`Network error: ${err.message}`);
}

function validateUrl(url) {
  try {
    new URL(url);
  } catch (error) {
    throw new Error(`Invalid URL : ${url}`);
  }
}

module.exports = { sendRequest };
