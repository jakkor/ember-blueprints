#!/usr/bin/env node
'use strict';

// Provide a title to the process in `ps`
process.title = 'ember-blueprints';

//Start the module
var EmberBlueprintsCLI = require('../lib/cli/cli.js');
var cli = new EmberBlueprintsCLI({
  cliArgs: process.argv,
  inputStream: process.stdin,
  outputStream: process.stdout
});
