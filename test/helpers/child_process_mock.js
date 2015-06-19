'use strict';

module.exports = ChildProcessMock;

function ChildProcessMock() {
  this.lastWrite = null;
}

ChildProcessMock.prototype.stdin = {

  lastWrite: null,

  write: function(message) {
    this.lastWrite = message;
  },

  getLastWrite: function() {
    var lastWrite = this.lastWrite;
    this.lastWrite = null;
    return lastWrite;
  }
};
