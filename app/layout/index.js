
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular');

module.exports = angular

  .module('app.layout', [
    require('../common/libs').name
  ])

  .directive('appContainer', require('./directives/appContainer'));
