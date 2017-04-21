'use strict';

module.exports = ['$log', '$location', '$q', 'authService', 'venueService', VenueSearchController];

function VenueSearchController($log, $location, $q, authService, venueService) {
  $log.debug('VenueSearchController');

  this.allVenues = [];

  this.changeView = function(venue) {
    console.log(venue);
    $location.url('/public');
  }

  this.getAllVenues = function() {
    venueService.fetchAllVenues()
    .then( venues => {
      this.allVenues = venues;
      console.log(this.allVenues);
    });
  }

  this.getAllVenues();
}
