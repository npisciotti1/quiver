'use strict';

module.exports = {
  template: require('./venue-search.html'),
  controller: ['$log', '$q', 'authService', 'venueService', VenueSearchController],
  controllerAs: 'venueSearchCtrl'
};

function VenueSearchController($log, $q, authService, venueService) {
  $log.debug('VenueSearchController');

  //TODO: configure this controller to grab array of venues from venue service
}
