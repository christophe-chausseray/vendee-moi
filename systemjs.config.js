/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    // '@angular':                   'node_modules/@angular',
    // 'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    // 'rxjs':                       'node_modules/rxjs'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'phaser':                       { defaultExtension: 'js' },
    // 'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
  };
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);
