const chalk=require('chalk').default;
const {version}=require('../../package.json')

const HELP_TEXT = `
${chalk.bold.cyan("apitester")} — Lightweight HTTP API testing CLI
${chalk.dim("Version: " + version)}

${chalk.bold("USAGE")}
  apitester <command> [url] [options]

${chalk.bold("COMMANDS")}
  ${chalk.green("get")}     <url>              Send a GET request
  ${chalk.green("post")}    <url>              Send a POST request
  ${chalk.green("put")}     <url>              Send a PUT request
  ${chalk.green("delete")}  <url>              Send a DELETE request
  ${chalk.green("run")}     <collection>       Run a saved request collection
  ${chalk.green("save")}    <name>             Save the last request as a collection

${chalk.bold("OPTIONS")}
  --data,    -d  <json>      Request body (JSON string)
  --header,  -H  <header>    Add a request header (can be used multiple times)
  --env,     -e  <env>       Environment to use from config
  --timeout, -t  <ms>        Request timeout in milliseconds
  --verbose, -v              Show verbose output including request details
  --output,  -o  <file>      Save response body to a file
  --help,    -h              Show this help message
  --version                  Show version number

${chalk.bold("EXAMPLES")}
  apitester get  https://jsonplaceholder.typicode.com/posts/1
  apitester post https://api.example.com/users --data '{"name":"John"}'
  apitester put  https://api.example.com/users/1 --data '{"name":"Updated"}'
  apitester delete https://api.example.com/users/1

  # With headers
  apitester get /users --header "Authorization: Bearer token" --header "X-API-Key: abc123"

  # With environment
  apitester get /users --env prod

  # Save and run collections
  apitester save my-request
  apitester run  my-request
`;

module.exports = function help() {
    console.log(HELP_TEXT);
};
