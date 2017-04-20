'use strict';

require('./_public-dashboard.scss');

//TODO: Build out our home view as we add functionality
module.exports = ['$log', DashboardController];

function DashboardController($log) {
  $log.debug('DashboardController');
}
