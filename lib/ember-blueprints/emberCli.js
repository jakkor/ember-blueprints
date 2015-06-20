'use strict';

var spawn = require('child_process').spawn,
    log = require('./log'),
    chalk = require('chalk'),
    output = require('./emberCli/output'),
    specialToolsList = require('./emberCli/tools').list;

module.exports = EmberCli;

function EmberCli(options) {
  this.projectConfig = options || {};
  this.logData = '';
  this.ember = 'ember';
  this.newCliErrorAlreadyShown = false;
  this.output = new output(log);
}

EmberCli.prototype.setCwd = function(cwd) {
  this.cwd = cwd;
};

EmberCli.prototype.createProject = function(name) {
  return this.runCommand(this.ember, ['new', name]);
};

/**
 * Installing tools like sass or coffee script
 *
 * @param {[object]} tools
 * @param {[object]} options
 */
EmberCli.prototype.installTools = function(tools, options) {
  options = options || {};
  options.cwd = this.cwd;
  this.projectConfig.process.cwd = this.cwd;

  return new Promise(function(resolve, reject){
    if (Object.keys(tools).length === 0) {
      resolve();
    }

    return Promise.all(tools.map(function(toolName) {

      if (specialToolsList.indexOf(toolName) !== -1) {
        var specialTools = require('./emberCli/tools');
        var specialTool = new specialTools[toolName](this, this.ember, this.projectConfig);
        return specialTool.run();
      }
      return this.runCommand(this.ember, ['install', toolName], options);
    }.bind(this)))
    .then(function() {
      log.genReport('Tools installed:', tools.toString());
      resolve();
    });
  }.bind(this));
};

EmberCli.prototype.generateDefault = function(message, objectType, objectsList, options) {
  options = options || {};
  options.cwd = this.cwd;

  return new Promise(function(resolve, reject){
    var objectList = objectsList || {};

    if (Object.keys(objectList).length === 0) {
      resolve();
    }

    Promise.all(objectsList.map(function(objectName){
      return this.runCommand(this.ember, ['generate', objectType, objectName], options);
    }.bind(this)))
    .then(function(){
      resolve();
    });
  }.bind(this));
};

EmberCli.prototype.runCommand = function(command, args, options) {
  options = options || {};
  options.env = process.env;
  options.env.FORCE_COLOR = true;

  //options.stdio = 'inherit';
  return new Promise(function(resolve, reject){
    var runCommand = spawn(command, args, options);
    this.logData = '------------------';

    runCommand.stdout.on('data', function (data) {
      this.output.message(data, runCommand);
    }.bind(this));

    runCommand.stderr.on('data', function (data) {
      console.log(data.toString().trim());
      this.logData = this.logData + String(data) + "\n";
    }.bind(this));

    runCommand.on('exit', function (code) {
      this.logData = this.logData + "Process finished\n\n";
      //console.log(this.logData);
       resolve();
    }.bind(this));

  }.bind(this));
};

