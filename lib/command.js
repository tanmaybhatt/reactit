#! /usr/bin/env node
const chalk = require('chalk');
const log = console.log;

process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

console.log(chalk.red("Under Development"));