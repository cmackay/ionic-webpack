
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular');

module.exports = angular

  .module('common.util', [])

  .service('$exceptionHandler', require('./services/$exceptionHandler'));
