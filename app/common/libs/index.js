
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
require('angular-animate');
require('angular-sanitize');
require('angular-ui-router');
require('ionic/js/ionic');
require('ionic/js/ionic-angular');

var libsModule = module.exports = angular

  .module('common.libs', [
    'ionic'
  ])

  .run(function ($rootScope, $window) {
    $window.addEventListener('resize', function () {
      $rootScope.$broadcast('windowResize');
    });
  });

libsModule.ionicBootstrap = function (module, window) {
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
