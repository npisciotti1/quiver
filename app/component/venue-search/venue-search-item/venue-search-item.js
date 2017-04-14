'use strict';

module.exports = {
  template: require('./venue-search-item.html'),
  controller: ['$log', '$q', 'venueService', VenueSearchItemController],
  controllerAs: 'venueSearchItemCtrl'
};

function VenueSearchItemController($log, $q, venueService) {
  $log.debug('VenueSearchItemController');
  
}
