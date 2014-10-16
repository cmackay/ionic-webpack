
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular');

module.exports = angular

  .module('common.ui', [
    require('../util').name
  ])

  .directive('appContainer', require('./directives/appContainer'));
