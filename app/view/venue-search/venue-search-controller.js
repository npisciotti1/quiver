'use strict';

require('./_venue-search.scss');

module.exports = ['$log', '$location', '$q', 'authService', 'venueService', VenueSearchController];

function VenueSearchController($log, $location, $q, authService, venueService) {
  $log.debug('VenueSearchController');

  this.allVenues = [];


  this.changeView = function(venue) {
    console.log(venue);
    $location.url('/public');
  };

  this.getAllVenues = function() {
    venueService.fetchAllVenues()
    .then( venues => {
      this.allVenues = venues;
    });
  };

  this.getAllVenues();
}
