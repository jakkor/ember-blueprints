'use strict';

exports.output = Output;

function Output(logger, processOutput) {
  this.logger = logger;
  this.processOutput = processOutput;
}

Output.prototype.message = function(message) {

  message = message.toString().trim();

  if (!this.shouldDisplayMessage(message)) {
    return;
  }

  this.logger.message(message.toString().trim());
};

Output.prototype.shouldDisplayMessage = function(message) {
  var ignorePrefix = [
    'A new version of ember-cli is available'
  ];

  var ignoreMessage = [
    'installing'
  ];

  for ( var i = 0; i < ignorePrefix.length ; i ++) {
    if (message.toString().indexOf(ignorePrefix[i]) === 0) {
      return false;
    }
  }

  for ( i = 0; i < ignoreMessage.length ; i ++) {
    if (message === ignoreMessage[i]) {
      return false;
    }
  }

  return true;
};


