'use strict';

var spawn = require('child_process').spawn,
    spawnSync = require('child_process').spawnSync,
    log = require('./log'),
    chalk = require('chalk');

exports.emberCli = EmberCli;

function EmberCli() {
  this.logData = '';
}

EmberCli.prototype.setCwd = function(cwd) {
  this.cwd = cwd;
};

EmberCli.prototype.ls = function(){
  console.log('run ls');
  return this.runCommand('grep', ['app/templates/application.hbs', 'log2.log', '--color=always']);
};

EmberCli.prototype.createProject = function(name) {
  return this.runCommand('ember', ['new', name]);
};

/**
 * Installing packages
 * @param {[object]} packages
 * @param {[object]} options
 */
EmberCli.prototype.installPackages = function(packages, options) {
  options = options || {};
  options.cwd = this.cwd;

  return new Promise(function(resolve, reject){

    if (Object.keys(packages).length === 0) {
      resolve();
    }

    return Promise.all(packages.map(function(packageName){
      return this.runCommand('ember', ['install', packageName], options);
    }.bind(this)))
    .then(function() {
      log.genReport('Packages installed:', packages.toString());
      resolve();
    });
  }.bind(this));
};

EmberCli.prototype.generate = function(objectType, objectsList, options) {
  options = options || {};
  options.cwd = this.cwd;

  return Promise.all(objectsList.map(function(objectName){
    return this.runCommand('ember', ['generate', objectType, objectName], options);
  }.bind(this)));
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
      return this.runCommand('ember', ['generate', objectType, objectName], options);
    }.bind(this)))
    .then(function(){
      log.message(message + objectList.toString());
      resolve();
    });
  }.bind(this));
};

EmberCli.prototype.runCommand = function(command, args, options) {
  options = options || {};
  return new Promise(function(resolve, reject){
    var runCommand = spawn(command, args, options);
    this.logData = '------------------';

    runCommand.stdout.on('data', function (data) {
      this.logData = this.logData + String(data) + "\n";
    }.bind(this));

    runCommand.stderr.on('data', function (data) {
      this.logData = this.logData + String(data) + "\n";
    }.bind(this));

    runCommand.on('exit', function (code) {
      this.logData = this.logData + "Process finished\n\n";
      resolve();
    }.bind(this));

  }.bind(this));
};

