const chalk = require('chalk').default;
const {parseCommonArgs} = require('../utils/args');
const { runRequest }      = require('../utils/request-runner');

const HELP = `
${chalk.bold('USAGE')}
  apitester get <url> [options]

${chalk.bold('OPTIONS')}
  --header,  -H  <header>   Add a request header (repeatable)
  --env,     -e  <env>      Environment to use from config
  --timeout, -t  <ms>       Timeout in milliseconds
  --verbose, -v             Show request/response headers
  --output,  -o  <file>     Save response body to file

${chalk.bold('EXAMPLES')}
  apitester get https://jsonplaceholder.typicode.com/posts/1
  apitester get /users --env prod --verbose
  apitester get /posts --header "Authorization: Bearer token"
`;

module.exports = async function get(argv) {
  const opts = parseCommonArgs(argv);
  if (opts.help || !opts.url) { console.log(HELP); return; }
  await runRequest('GET', opts);
};
