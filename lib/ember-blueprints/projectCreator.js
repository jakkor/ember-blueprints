'use strict';

var log = require('./log'),
    emberBlueprints = require('./index.js');

exports.projectCreator = ProjectCreator;

function ProjectCreator(yamlConfig) {
  this.packages = yamlConfig.packages || {};
  this.config = yamlConfig.config || {};
  this.app = yamlConfig.app || {};
  this.emberCli = new emberBlueprints.emberCli();

  log.title('Project creator setup');

  this.runConfig = function(config) {

    /*this.emberCli.ls()
    .then(function(){
      console.log('tttttttttt');
      this.emberCli.ls();
    }.bind(this));*/

    this.emberCli.createProject(config.name)
    .then(function(){
      log.message('Created a new project: ' + config.name);

      //Set process working dir to project path
      var projectPath = config.name;
      if (projectPath.indexOf(0) !== '/') {
        projectPath = '/' + projectPath;
      }

      yamlConfig.process.cwd = yamlConfig.process.cwd + projectPath;

      var packages = this.packages || {};
      return this.emberCli.setPackages(packages, {cwd: yamlConfig.process.cwd});
    }.bind(this))
    .then(function(){
      log.message('Packages installed: ' + this.packages.toString());

      var models = this.app.models || {};
      return this.emberCli.createModels(models, {cwd: yamlConfig.process.cwd});
    }.bind(this))
    .then(function(){
      log.message('Models created: ' + this.app.models.toString());
      var controllers = this.app.controllers || {};
      return this.emberCli.createControllers(controllers, {cwd: yamlConfig.process.cwd});
    }.bind(this))
    .then(function(){
      log.message('Controllers created: ' + this.app.controllers.toString());
      var controllers = this.app.views || {};
      return this.emberCli.createViews(controllers, {cwd: yamlConfig.process.cwd});
    }.bind(this))
    .then(function(){
      log.message('Views created: ' + this.app.controllers.toString());
    }.bind(this));

  };

  this.runPackages = function(packages) {
    Object.keys(packages).forEach(function(key) {
      var emberPackage = packages[key];
      log.message(emberPackage);
    });
  };

}

ProjectCreator.prototype.run = function() {
  this.runConfig(this.config);
  this.runPackages(this.packages);

  log.message(this.yamlConfig);
  log.message(' Run project creator');
};
