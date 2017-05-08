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

  this.setPagination = function() {
    this.totalPageItems = this.allVenues.length;
    this.currentPage = 1;
    this.itemsPerPage = 4;
  };

  this.getAllVenues = function() {
    venueService.fetchAllVenues()
    .then( venues => {
      this.allVenues = venues;
      this.setPagination();
    });
  };

  this.pageChanged = function() {
    $log.log('Page changed to: ' + this.currentPage);
  };

  this.getAllVenues();
}
