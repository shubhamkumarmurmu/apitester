#!/usr/bin/env node

const argv = require("arg");
const helpCmd = require("../src/commands/help");
const { version } = require("../package.json");
const getCmd=require('../src/commands/get');
const postCmd=require('../src/commands/post');
const putCmd=require('../src/commands/put');
const deleteCmd=require('../src/commands/delete');
const saveCmd=require('../src/commands/save');
const runCmd=require('../src/commands/run');
const collectionCmd=require('../src/commands/collection')
const log=require('../src/logger');

const args = process.argv.slice(2);

if (args[0]==='--help' || args[0]==='-h') {
  helpCmd();
  process.exit();
}
if (args.includes("--version")) {
  console.log(`apitester v${version}`);
  process.exit(0);
}

const command=args[0];
const commandArgs=args.slice(1);

const commands={
    get: getCmd,
    post:postCmd,
    delete:deleteCmd,
    put:putCmd,
    run:runCmd,
    save:saveCmd,
    collection:collectionCmd
}

if(!command){
    helpCmd();
    process.exit(0);
}

if(!commands[command]){
    log.error(` Unknown command: "${command}"`);
    process.exit(1);
}

try {
  commands[command](commandArgs);
} catch (err) {
  log.error(`\n Fatal error: ${err.message}`);
  process.exit(1);
}
