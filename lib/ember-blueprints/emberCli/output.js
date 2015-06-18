'use strict';

exports.output = Output;

function Output(logger) {
  this.logger = logger;
}

Output.prototype.message = function(message, process) {
  message = message.toString().trim();

  if (!this.shouldDisplayMessage(message)) {
    return;
  }

  this.replyIfneeded(message, process);
  this.logger.message(message);
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

Output.prototype.replyIfneeded = function(message, process) {
  if (message.indexOf('Overwrite') !== -1 && message.indexOf('(Yndh)') !== -1) {
    process.stdin.write('Y' + "\n");
  }
};

