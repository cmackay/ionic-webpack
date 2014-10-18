
'use strict';

/**
 * Module dependencies
 */
var angular    = require('angular'),
  commonModule = require('./common');

/**
 * Setup App Module
 */
var appModule = module.exports = angular

  .module('app', [
    commonModule.name,
    require('./layout').name,
    require('./tasks').name
  ])

  .constant('version', require('../package.json').version)

  .constant('config', require('./config'))

  .config(function ($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(
      /^\s*(https?|ftp|mailto|file|tel):/);
  })

  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/tasks');
  })

  .run(function ($log, $rootScope, $ionicBackdrop, $timeout) {

    $log.debug('app module - run');

    $rootScope.$on('$stateChangeStart',
      function (event, toState) {
        $log.debug('$stateChangeStart - name:', toState.name);
      });

    $rootScope.$on('$stateChangeSuccess',
      function (event, toState) {
        $log.debug('$stateChangeSuccess - name:', toState.name);
      });

    $rootScope.$on('$stateNotFound',
      function (event, unfoundState, fromState, fromParams) {
        $log.warn('$stateNotFound', {
          event        : event,
          unfoundState : unfoundState,
          fromState    : fromState,
          fromParams   : fromParams
        });
      });

    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        $log.error('$stateChangeError', {
          event      : event,
          toState    : toState,
          toParams   : toParams,
          fromState  : fromState,
          fromParams : fromParams,
          error      : error
        });
        if (error) {
          throw error;
        }
      });

    $ionicBackdrop.retain();

    $timeout(function() {
      $ionicBackdrop.release();
    }, 600);
  });

// Add the styles to the page
require('./index.scss');

// Bootstrap App Module
commonModule.ionicBootstrap(appModule, global);
