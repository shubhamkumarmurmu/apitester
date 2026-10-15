const chalk = require('chalk').default;
const { parseCommonArgs } = require('../utils/args');
const { runRequest }      = require('../utils/request-runner');

const HELP = `
${chalk.bold('USAGE')}
  apitester delete <url> [options]

${chalk.bold('OPTIONS')}
  --header,  -H  <header>   Add a request header (repeatable)
  --timeout, -t  <ms>       Timeout in milliseconds
  --verbose, -v             Show request/response headers

${chalk.bold('EXAMPLES')}
  apitester delete https://api.example.com/users/1
  apitester delete /users/42
`;

module.exports = async function del(argv) {
  const opts = parseCommonArgs(argv);
  if (opts.help || !opts.url) { console.log(HELP); return; }
  await runRequest('DELETE', opts);
};
