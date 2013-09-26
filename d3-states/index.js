'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var D3StatesGenerator = module.exports = function D3StatesGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the d3-states subgenerator with the argument ' + this.name + '.');
};

util.inherits(D3StatesGenerator, yeoman.generators.NamedBase);

D3StatesGenerator.prototype.files = function files() {
  this.copy('states.js', 'app/scripts/states.js');
  this.copy('states.html', 'app/states.html');
};
