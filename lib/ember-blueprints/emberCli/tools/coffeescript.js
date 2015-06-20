'use strict';

var fs = require('fs');

module.exports = CoffeScript;

function CoffeScript(emberCli, ember, projectConfig) {
  this.emberCli = emberCli;
  this.ember = ember;
  this.projectConfig = projectConfig;
}

CoffeScript.prototype.run = function(toolName, options) {
  var promises = [];

  //Remove app.js and router.js file
  promises.promiseDelApp = this.removefile('/app/app.js');
  promises.promiseDelRouter = this.removefile('/app/router.js');

  //Copy app.coffee and router.coffee
  promises.promiseCopyApp = this.copyBlueprint('app.coffee', '/app/app.coffee');
  promises.promiseCopyRouter = this.copyBlueprint('router.coffee', '/app/router.coffee');

  promises.installCoffeeScript = this.emberCli.runCommand(this.ember, ['install', toolName], options);

  return Promise.all(promises);
};

CoffeScript.prototype.removefile = function(filePath) {
  return new Promise(function(resolve, reject) {
    var fullPath = this.projectConfig.process.cwd + filePath;
    fs.exists(fullPath, function(exists) {
      if (exists) {
        fs.unlink(fullPath, function() {
          resolve();
        });
      } else {
        resolve();
      }
    });
  }.bind(this));
};

CoffeScript.prototype.copyBlueprint = function(blueprint, filePath) {
  return new Promise(function(resolve, reject){
    var readFilePath =
      this.projectConfig.process.blueprintsPath + '/emberCli/tools/coffeescript/blueprints/' + blueprint;
    var writeFilePath = this.projectConfig.process.cwd + filePath;

    fs.readFile(readFilePath, function read(err, data) {
      if (err) {
        console.log(err);
        reject();
        return;
      }

      fs.writeFile(writeFilePath, data.toString(), function(err) {
        if(err) {
          console.log(err);
          reject();
        }
      });

      resolve();
    });
  }.bind(this));
};
