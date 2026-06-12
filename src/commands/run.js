const fs   = require('fs');
const path = require('path');
const arg  = require('arg');
const chalk = require('chalk').default;
const { parseCommonArgs }  = require('../utils/args');
const { runRequest }       = require('../utils/request-runner');
const logger               = require('../logger');

const COLLECTIONS_DIR = path.resolve(process.cwd(), 'collections');

const HELP = `
${chalk.bold('USAGE')}
  apitester run <name> [options]

${chalk.bold('DESCRIPTION')}
  Runs a saved request collection. CLI options override the saved values.

${chalk.bold('OPTIONS')}
  --env,     -e  <env>      Environment override
  --timeout, -t  <ms>       Timeout override
  --verbose, -v             Show request/response headers
  --output,  -o  <file>     Save response body to file

${chalk.bold('EXAMPLES')}
  apitester run get-user
  apitester run get-user --env prod
  apitester run get-user --verbose
`;

module.exports = async function run(argv) {
  const topArgs = arg({ '--help': Boolean, '-h': '--help' }, {
    argv,
    permissive: true,
  });

  if (topArgs['--help']) { console.log(HELP); return; }

  const name = topArgs._[0];
  if (!name) {
    logger.error('Collection name is required.  Usage: apitest run <name>');
    process.exit(1);
  }

  const filePath = path.join(COLLECTIONS_DIR, `${name}.json`);

  if (!fs.existsSync(filePath)) {
    logger.error(`Collection "${name}" not found at ${filePath}`);
    logger.info(`Save one with: apitest save ${name} --method GET --url <url>`);
    process.exit(1);
  }

  let collection;
  try {
    collection = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    logger.error(`Failed to parse collection file: ${err.message}`);
    process.exit(1);
  }

  const overrides = parseCommonArgs(argv.slice(1));

  const merged = {
    method:  collection.method  || 'GET',
    url:     overrides.url      || collection.url,
    data:    overrides.data     || collection.data,
    headers: Object.assign({}, collection.headers || {}, overrides.headers || {}),
    env:     overrides.env      || collection.env,
    timeout: overrides.timeout  || collection.timeout,
    verbose: overrides.verbose  || false,
    output:  overrides.output,
  };

  logger.info(`Running collection: ${chalk.bold(name)}`);
  console.log(chalk.dim(`  ${merged.method} ${merged.url}`));

  await runRequest(merged.method, merged);
};
