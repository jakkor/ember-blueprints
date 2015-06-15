'use strict';

var spawn = require('child_process').spawn,
    log = require('./log');

exports.emberCli = EmberCli;

function EmberCli() {

}

EmberCli.prototype.createProject = function(name) {
  console.log('create a new project');
  return this.runCommand('ember', ['new', name]);
};

EmberCli.prototype.runCommand = function(command, args) {
  return new Promise(function(resolve, reject){
    var runCommand = spawn(command, args, {stdio: "inherit"});

    runCommand.stdout.on('data', function (data) {
      log.message(String(data));
    });

    runCommand.stderr.on('data', function (data) {
      log.message(String(data));
    });

    runCommand.on('exit', function (code) {
      log.message('child process exited with code ' + code);
      resolve();
    });
  });
};

