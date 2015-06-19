'use strict';

module.exports = Logger;

function Logger() {
  this.lastMessage = null;
}

Logger.prototype.message = function(message) {
  this.lastMessage = message;
};

Logger.prototype.getLastMessage = function() {
  var message = this.lastMessage;
  this.lastMessage = null;
  return message;
};

