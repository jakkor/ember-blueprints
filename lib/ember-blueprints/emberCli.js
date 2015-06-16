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
  log.message('Creating a new project called: ' + name + ' with ember-cli');
  return this.runCommand('ember', ['new', name]);
};

EmberCli.prototype.createModels = function(models, options) {
  return Promise.all(models.map(function(modelName){
    this.runCommand('ember', ['generate','model', modelName], options);
  }.bind(this)));
};

EmberCli.prototype.createControllers = function(controllers, options) {
  return this.generate('controller', controllers, options);
};

EmberCli.prototype.createViews = function(views, options) {
  return this.generate('view', views, options);
};

EmberCli.prototype.generate = function(type, objects, options) {
  return Promise.all(objects.map(function(name){
    this.runCommand('ember', ['generate', type, name], options);
  }.bind(this)));
};

EmberCli.prototype.runCommand = function(command, args, options) {
  options = options || {};
  //options.stdio = 'inherit';
  console.log(options);
  return new Promise(function(resolve, reject){
    var runCommand = spawn(command, args, options);
    this.logData = '';

    runCommand.stdout.on('data', function (data) {
      this.logData = String(data) + "/n";
    });

    runCommand.stderr.on('data', function (data) {
      this.logData = String(data) + "/n";
    });

    runCommand.on('exit', function (code) {
      this.logData = "Process finished/n/n";
      resolve();
    });

  });
};

