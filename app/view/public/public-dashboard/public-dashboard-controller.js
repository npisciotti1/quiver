'use strict';

require('./_public-dashboard.scss');

module.exports = ['$log', PublicDashboardController];

function PublicDashboardController($log) {
  $log.debug('DashboardController');
}
