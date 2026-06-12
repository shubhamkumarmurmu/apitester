const arg = require("arg");
const { parseHeaders } = require("./formatter");

const COMMON_SPEC = {
  "--data": String,
  "--header": [String],
  "--env": String,
  "--timeout": Number,
  "--verbose": Boolean,
  "--output": String,
  "--help": Boolean,

  "-d": String,
  "-H": [String],
  "-e": String,
  "-t": Number,
  "-v": Boolean,
  "-o": String,
  "-h": Boolean,
};

function parseCommonArgs(argv) {
  const args = arg(COMMON_SPEC, { argv, permissive: false });

  const url = args._[0];
  const headers = parseHeaders(args["--header"] || []);

  return {
    url,
    data: args["--data"],
    headers,
    env: args["--env"],
    timeout: args["--timeout"],
    verbose: args["--verbose"] || false,
    output: args["--output"],
    help: args["--help"] || false,
  };
}

module.exports = { parseCommonArgs };
