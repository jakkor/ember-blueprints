'use strict';

var commander = require('commander'),
    pkg = require('../../package.json'),
    yaml = require('js-yaml'),
    findup = require('findup-sync'),
    fs   = require('fs'),
    emberBlueprints = require('../ember-blueprints'),
    cwd = process.cwd();

function Cli(options) {

  function getConfigYaml(yamlFile) {
    var configFile = findup(yamlFile, { cwd: cwd });
    if (configFile) {
      try {
        return yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
      } catch (e) {
        emberBlueprints.log.message('Yaml file error: ' + e.message);
        process.exit(1);
      }
    } else {
      emberBlueprints.log.message('No blueprint file found');
      process.exit(1);
    }
  }

  commander
    .version(pkg.version)
    .option('-i, --input [yaml file]', 'Input file')
    //.option('-p, --project [project path]', String)
    .parse(options.cliArgs);

  var yamlFile = commander.input || 'project.yaml';
  var project = commander.project || '.';
  var yamlConfig = getConfigYaml(yamlFile);
  yamlConfig.process = {};
  yamlConfig.process.cwd = cwd;
  yamlConfig.process.blueprintsPath = __dirname + '/../ember-blueprints';

  var projectCreator = new emberBlueprints.projectCreator(yamlConfig);
  projectCreator.run();

}

module.exports = Cli;
