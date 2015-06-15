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
  }
};
