/*jshint node:true*/
var Filter = require('broccoli-filter');

function MyFilter(inputNode) {
  Filter.call(this, inputNode);
}
MyFilter.prototype = Object.create(Filter.prototype);
MyFilter.prototype.processString = function (existingString) {
  const prepend = `/**
* vendor.js
*
* (c) 2016 🦄🦄🦄🔫🌈🍺🍺 All Rights Reserved * generated at: ${(new Date()).toISOString()}
*/
`;
  return prepend + existingString;
};
MyFilter.prototype.extensions = ['js'];
MyFilter.prototype.targetExtension = 'js';

module.exports = {
  name: 'commenter',

  isDevelopingAddon: function () {
    return true;
  },

  postprocessTree: function (type, tree) {
    if (type === 'all') {
      return new MyFilter(tree);
    } else {
      return tree;
    }

  }
};
