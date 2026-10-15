const chalk = require('chalk').default;
const { parseCommonArgs } = require('../utils/args');
const { runRequest } = require('../utils/request-runner');

const HELP = `
${chalk.bold('USAGE')}
  apitester patch <url> [options]

${chalk.bold('OPTIONS')}
  --data,    -d  <json>     JSON request body
  --header,  -H  <header>   Add a request header (repeatable)
  --timeout, -t  <ms>       Timeout in milliseconds
  --verbose, -v             Show request/response headers
  --output,  -o  <file>     Save response body to file

${chalk.bold('EXAMPLES')}
  apitester patch https://api.example.com/users/1 --data '{"name":"Updated Name"}'
  apitester patch /users/42 --data '{"active":false}'
`;

module.exports = async function patch(argv) {
  const opts = parseCommonArgs(argv);
  if (opts.help || !opts.url) {
    console.log(HELP);
    return;
  }
  await runRequest('PATCH', opts);
};
