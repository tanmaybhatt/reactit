#! /usr/bin/env node
const chalk = require('chalk');
var args = process.argv;
if(args.indexOf('new')==2)
require("../lib/new.js");

else if(args.indexOf('start')==2)
require("../lib/start.js");

else if(args.indexOf('build')==2)
require("../lib/build.js");

else 
console.log("No Arguments");