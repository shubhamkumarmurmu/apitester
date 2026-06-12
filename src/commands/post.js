const chalk = require('chalk').default;
const { parseCommonArgs } = require('../utils/args');
const { runRequest }      = require('../utils/request-runner');

const HELP = `
${chalk.bold('USAGE')}
  apitester post <url> [options]

${chalk.bold('OPTIONS')}
  --data,    -d  <json>     JSON request body
  --header,  -H  <header>   Add a request header (repeatable)
  --env,     -e  <env>      Environment to use from config
  --timeout, -t  <ms>       Timeout in milliseconds
  --verbose, -v             Show request/response headers
  --output,  -o  <file>     Save response body to file

${chalk.bold('EXAMPLES')}
  apitester post https://api.example.com/users --data '{"name":"John","email":"john@example.com"}'
  apitester post /users --env dev --data '{"name":"Test"}'
`;

module.exports = async function post(argv) {
  const opts = parseCommonArgs(argv);
  if (opts.help || !opts.url) { console.log(HELP); return; }
  await runRequest('POST', opts);
};
