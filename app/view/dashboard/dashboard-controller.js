'use strict';

require('./_dashboard.scss');

module.exports = ['$log', DashboardController];

function DashboardController($log) {
  $log.debug('DashboardController');
}
