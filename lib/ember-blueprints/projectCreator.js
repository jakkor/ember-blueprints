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
        'Acceptance test created:', 'acceptance-test', this.app.acceptanceTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Adapters created:', 'adapter', this.app.adapters
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Adapter tests created:', 'adapter-test', this.app.adaptersTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Addon imports created:', 'addon-import', this.app.addonImports
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Adapters created:', 'adapter', this.app.adapters
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Components created:', 'component', this.app.components
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Component addons created:', 'component-addon', this.app.componentAddons
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Component tests created:', 'component-test', this.app.componentTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Controllers created:', 'controller', this.app.controllers
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Controller tests created:', 'controller-test', this.app.controllerTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Helpers created:', 'helper', this.app.helpers
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Helper addons created:', 'helper-addon', this.app.helperAddons
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Helper tests created:', 'helper-test', this.app.helperTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Initializers created:', 'initializer', this.app.initializers
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Initializer addons created:', 'initializer-addon', this.app.initializerAddons
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Initializer tests created:', 'initializer-test', this.app.initializerTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Models created:', 'model', this.app.models
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Model tests created:', 'model-test', this.app.modelTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Resources created:', 'resource', this.app.resources
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Routes created:', 'route', this.app.routes
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Route tests created:', 'route-test', this.app.routeTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Serializers created:', 'serializer', this.app.serializers
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Serializer tests created:', 'serializer-test', this.app.serializerTests
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Templates created:', 'template', this.app.templates
      );
    }.bind(this))
    .then(function(){
      return this.emberCli.generateDefault(
        'Views created:', 'view', this.app.views
      );
    }.bind(this))
   .then(function(){
      return this.emberCli.generateDefault(
        'View tests created:', 'view-test', this.app.viewTests
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
