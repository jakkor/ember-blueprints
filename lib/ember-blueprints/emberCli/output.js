'use strict';

exports.output = Output;

function Output(logger) {
  this.logger = logger;
}

Output.prototype.message = function(message) {

  if (message.toString().indexOf('A new version of ember-cli is available') === 0) {
    if (this.newCliErrorAlreadyShown === true) {
      return;
    }
    this.newCliErrorAlreadyShown = true;
    }
    /*if (data.toString().indexOf("Overwrite") !== -1 && data.toString().indexOf('(Yndh)') !== -1) {
      runCommand.stdin.write('Y' + "\n");
    }*/
    if (message.toString().trim() === 'installing') {
      return;
    }

  this.logger.message(message.toString().trim());
};
