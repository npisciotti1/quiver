'use strict';

require('./_venue-search.scss');

module.exports = ['$log', '$location', '$q', '$window', 'authService', 'venueService', VenueSearchController];

function VenueSearchController($log, $location, $q, $window, authService, venueService) {
  $log.debug('VenueSearchController');

  this.allVenues = [];


  this.changeView = function(venue) {
    $window.localStorage.currentPublicVenueID = venue._id;
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
