
'use strict';

/**
 * Module dependencies
 */
var angular = require('angular');

// set the public path
var scripts = global.document.getElementsByTagName('script');
var src = scripts[scripts.length - 1].getAttribute('src');
global.__webpack_public_path__ = src.substr(0, src.lastIndexOf('/') + 1);

// Add Angular/Ionic dependencies
require('ngAnimate');
require('ngSanitize');
require('ui.router');
require('ionic/release/js/ionic');
require('ionic-angular');

// Add the styles to the page
require('./index.scss');

/**
 * Setup App Module
 */
var appModule = module.exports = angular

  .module('app', [
    'ionic',
    require('./common').name,
    require('./tasks').name
  ])

  .constant('version', require('../package.json').version)

  .constant('config', {
    log: {
      debug: true
    }
  })

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

/**
 * Defers Angular bootstrap until after deviceready event if on a device
 */
var ionicBootstrap = function (module, window) {
  if (!window || !window.document) {
    throw new Error('window and document objects required.');
  }

  function onDeviceReady () {
    // bootstrap angular app
    angular.element(window.document).ready(function () {
      angular.bootstrap(window.document, [
        module.name
      ]);
    });

    // remove document deviceready listener
    window.document.removeEventListener('deviceready', onDeviceReady, false);
  }

  function onWindowLoad () {
    if (!(!window.cordova && !window.PhoneGap && !window.phonegap)) {
      // when on device add document deviceready listener
      window.document.addEventListener('deviceready', onDeviceReady, false);

    } else {
      // when on browser trigger onDeviceReady
      onDeviceReady();
    }

    // remove window load listener
    window.removeEventListener('load', onWindowLoad, false);
  }

  // add window load listener
  window.addEventListener('load', onWindowLoad, false);
};

// Bootstrap App Module
ionicBootstrap(appModule, global);
