'use strict';

require('./_home.scss');

//TODO: Build out our home view as we add functionality
module.exports = ['$log', HomeController];

function HomeController($log) {
  $log.debug('HomeController');
}
