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

  includedCommands: function () {
    return {
      slack: {
        name: 'slack',
        description: 'Prints something in a slack channel.',
        works: 'insideProject',
        anonymousOptions: [
          '<message>'
        ],
        availableOptions: [{
          name: 'channel',
          type: String,
          default: 'general'
        }],
        run: function (commandArgs, rawArgs) {
          console.log('-----------------------');
          console.log(`#${commandArgs.channel}: ${rawArgs[0]}`);
        }
      }
    };
  },

  postProcessTree: function (tree) {
    if (type === 'all') {
      return new MyFilter(tree);
    } else {
      return tree;
    }

  }
};
