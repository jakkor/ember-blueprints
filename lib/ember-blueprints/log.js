'use strict';

module.exports = {

  message: function(message) {
    console.log(message);
  },

  hr:  function() {
    console.log('------------');
  },

  title: function(message) {
    console.log('----- ' + message + ' -----');
  },

  genReport: function(message, objectsArray) {
    if (objectsArray.length > 0) {
      this.message(message + ' ' + objectsArray.toString());
    }
  }
};
