'use strict';

const chalk = require('chalk').default;

const logger = {
  debug(msg, ...args) {
      console.log(chalk.gray(`[DEBUG] ${timestamp()} ${msg}`), ...args);
  },

  info(msg, ...args) {
      console.log(chalk.blue(`ℹ ${msg}`), ...args);
  },

  warn(msg, ...args) {
      console.warn(chalk.yellow(`⚠ ${msg}`), ...args);
  },

  error(msg, ...args) {
      console.error(chalk.red(`✖ ${msg}`), ...args);
  },

  success(msg, ...args) {
    console.log(chalk.green(`✔ ${msg}`), ...args);
  },

  print(msg) {
    console.log(msg);
  },
};

module.exports = logger;
