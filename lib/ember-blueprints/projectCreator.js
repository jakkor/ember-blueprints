'use strict';

var log = require('./log'),
    emberBlueprints = require('./index.js');

exports.projectCreator = ProjectCreator;

function ProjectCreator(yamlConfig) {
  this.packages = yamlConfig.packages || {};
  this.config = yamlConfig.config || {};
  this.app = yamlConfig.app || {};
  this.emberCli = new emberBlueprints.emberCli();

  log.title('Creator is running. Please wait.');

  this.runCreator = function(config) {

    /*this.emberCli.ls()
    .then(function(){
      console.log('tttttttttt');
      this.emberCli.ls();
    }.bind(this));*/

    this.emberCli.createProject(config.name)
    .then(function(){
      log.message('Project created: ' + config.name);

      //Set process working dir to project path
      var projectPath = config.name;
      if (projectPath.indexOf(0) !== '/') {
        projectPath = '/' + projectPath;
      }

      this.emberCli.setCwd(yamlConfig.process.cwd + projectPath);

      var packages = this.packages || {};
      return this.emberCli.installPackages(packages);
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Adapters created:', 'adapter', this.app.adapters
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Models created:', 'model', this.app.models
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Controllers created:', 'controller', this.app.controllers
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Views created:', 'view', this.app.views
      );
    }.bind(this))
    .then(function(){
      log.hr();
      log.message('Process finished');
    }.bind(this));

  };
}

ProjectCreator.prototype.run = function() {
  this.runCreator(this.config);
};
