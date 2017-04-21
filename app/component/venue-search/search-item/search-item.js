'use strict';

module.exports = {
  template: require('./search-item.html'),
  controller: ['$log', '$q', 'venueService', VenueSearchItemController],
  controllerAs: 'venueSearchItemCtrl'
};

function VenueSearchItemController($log, $q, venueService) {
  $log.debug('VenueSearchItemController');

  this.allVenues = [];

  this.getAllVenues = function() {
    venueService.fetchAllVenues()
    .then( venues => {
      this.allVenues = venues;
      console.log(venues);
    });
  }

  this.getAllVenues();
}
