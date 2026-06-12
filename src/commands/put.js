const chalk = require('chalk').default;
const { parseCommonArgs } = require('../utils/args');
const { runRequest }      = require('../utils/request-runner');

const HELP = `
${chalk.bold('USAGE')}
  apitester put <url> [options]

${chalk.bold('OPTIONS')}
  --data,    -d  <json>     JSON request body
  --header,  -H  <header>   Add a request header (repeatable)
  --env,     -e  <env>      Environment to use from config
  --timeout, -t  <ms>       Timeout in milliseconds
  --verbose, -v             Show request/response headers
  --output,  -o  <file>     Save response body to file

${chalk.bold('EXAMPLES')}
  apitester put https://api.example.com/users/1 --data '{"name":"Updated Name"}'
  apitester put /users/42 --env prod --data '{"active":false}'
`;

module.exports = async function put(argv) {
  console.log('work');
  const opts = parseCommonArgs(argv);
  if (opts.help || !opts.url) { console.log(HELP); return; }
  await runRequest('PUT', opts);
};
