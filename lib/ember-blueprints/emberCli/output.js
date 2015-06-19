'use strict';

module.exports = Output;

/**
 * Output object for processing and displaying output from stdout
 *
 * @param {[type]} logger logger object for displaying messages
 */
function Output(logger) {
  this.logger = logger;
}

/**
 * Shows provided message on the screen
 * @param  {[object]} message data from stdout
 * @param  {[object]} process spawned process
 * @return {[void]}
 */
Output.prototype.message = function(message, process) {
  message = message.toString().trim();

  //Check if message should be displayed.
  if (!this.shouldDisplayMessage(message)) {
    return;
  }

  //Check if any reply is required and process it
  this.replyIfneeded(message, process);

  //Show the message on the screen
  this.logger.message(message);
};

/**
 * Checkes if the provided message should be displayed.
 * @param  {[string]} message message from ember cli
 * @return {[boolean]}
 */
Output.prototype.shouldDisplayMessage = function(message) {
  var ignorePrefix = [
    'A new version of ember-cli is available',
    'version:'
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

/**
 * Check if any reply is necessary.
 *
 * For now it will always reply "Y" letter.
 *
 * @param  {[string]} message
 * @param  {[object]} process spawned process
 * @return {[void]}
 */
Output.prototype.replyIfneeded = function(message, process) {
  if (message.indexOf('Overwrite') !== -1 && message.indexOf('(Yndh)') !== -1) {
    process.stdin.write('Y' + "\n");
  }
};

