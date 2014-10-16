
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular');

module.exports = angular
  .module('common', [
    'ionic',
    require('./ui').name,
    require('./util').name
  ]);
