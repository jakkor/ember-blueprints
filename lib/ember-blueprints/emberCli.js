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
  //this.ember = '/Users/editor/Programowanie/nodejs/ember-blueprints-test-cli/cli-test/ember-cli/bin/ember';
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
        return specialTool.run(toolName, options);
      }
      return this.runCommand(this.ember, ['install', toolName], options);
    }.bind(this)))
    .then(function() {
      log.genReport('Tools installed:', tools.toString());
      resolve();
    })
    .catch(console.log.bind(console));
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
      var args = ['generate', objectType];

      if (typeof objectName === 'string'){
        args.push(objectName);
      } else if (typeof objectName === 'object') {
        if (!objectName.name) {
          console.log(objectType + ' is an object, but it doesn\'t have any name');
          reject();
        }
        args.push(objectName.name);
        if (objectName.options && Object.keys(objectName.options).length > 0) {
          args = args.concat(Object.keys(objectName.options).map(function(optionKey){
            return objectName.options[optionKey];
          }));
        }
      }
      else {
        console.log(objectType + ' is invalid. Check your yaml file');
        reject();
      }
      return this.runCommand(this.ember, args, options);
    }.bind(this)))
    .then(function(){
      resolve();
    })
    .catch(console.log.bind(console));
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

  }.bind(this))
  .catch(console.log.bind(console));
};

