'use strict';

var spawn = require('child_process').spawn,
    spawnSync = require('child_process').spawnSync,
    log = require('./log'),
    chalk = require('chalk');

exports.emberCli = EmberCli;

function EmberCli() {
  this.logData = '';
}

EmberCli.prototype.ls = function(){
  console.log('run ls');
  return this.runCommand('grep', ['app/templates/application.hbs', 'log2.log', '--color=always']);
};

EmberCli.prototype.createProject = function(name) {
  return this.runCommand('ember', ['new', name]);
};

EmberCli.prototype.createModels = function(models, options) {
  /*return Promise.all(models.map(function(modelName){
    return this.runCommand('ember', ['generate','model', modelName], options);
  }.bind(this)));*/
  return this.generate('model', models, options);
};

EmberCli.prototype.createControllers = function(controllers, options) {
  return this.generate('controller', controllers, options);
};

EmberCli.prototype.createViews = function(views, options) {
  return this.generate('view', views, options);
};

EmberCli.prototype.generate = function(objectType, objectsList, options) {
  return Promise.all(objectsList.map(function(objectName){
    return this.runCommand('ember', ['generate', objectType, objectName], options);
  }.bind(this)));
};

EmberCli.prototype.runCommand = function(command, args, options) {
  options = options || {};
  //options.stdio = 'inherit';
  return new Promise(function(resolve, reject){
    var runCommand = spawn(command, args, options);
    this.logData = '------------------';

    runCommand.stdout.on('data', function (data) {
      this.logData = this.logData + String(data) + "\n";
      //log.message(String(data));
    }.bind(this));

    runCommand.stderr.on('data', function (data) {
      this.logData = this.logData + String(data) + "\n";
      //log.message(String(data));
    }.bind(this));

    runCommand.on('exit', function (code) {
      this.logData = this.logData + "Process finished\n\n";
      //log.message("Code: " + code);
      //console.log(this.logData);
      resolve();
    }.bind(this));

  }.bind(this));
};

