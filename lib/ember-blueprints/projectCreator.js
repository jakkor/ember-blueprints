'use strict';

var log = require('./log'),
    emberBlueprints = require('./index.js');

exports.projectCreator = ProjectCreator;

function ProjectCreator(yamlConfig) {
  this.yamlConfig = yamlConfig;

  this.packages = yamlConfig.packages || {};
  this.config = yamlConfig.config || {};
  this.emberCli = new emberBlueprints.emberCli();

  log.title('Project creator setup');

  this.runConfig = function(config) {
    this.emberCli.createProject(config.name)
    .then(function(){
      log.message('after create project');
    });
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
