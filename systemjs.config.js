/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':       'app',
    'ts-events': 'node_modules/ts-events/dist/ts-events.js',
    'lodash':    'node_modules/lodash/lodash.js'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':       { main: 'main.js',  defaultExtension: 'js' },
    'ts-events': { defaultExtension: 'js' },
    'lodash':    { defaultExtension: 'js' }
  };

  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
