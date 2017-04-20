'use strict';

module.exports = ['$log', '$q', 'authService', 'venueService', VenueSearchController];

function VenueSearchController($log, $q, authService, venueService) {
  $log.debug('VenueSearchController');

  this.allVenues = [];

  this.getAllVenues = function() {
    venueService.fetchAllVenues()
    .then( venues => {
      this.allVenues = venues;
      console.log(this.allVenues);
    });
  }

  this.getAllVenues();
}
