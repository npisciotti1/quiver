'use strict';

require('./_venue-search.scss');

module.exports = ['$log', '$location', '$q', '$window', 'authService', 'venueService', VenueSearchController];

function VenueSearchController($log, $location, $q, $window, authService, venueService) {
  $log.debug('VenueSearchController');

  this.allVenues = [];

  this.setPage = function(pageNum) {
    this.currentPage = pageNum;
  };

  this.changeView = function(venue) {
    $window.localStorage.currentPublicVenueID = venue._id;
    $location.url('/public');
  };

  this.setPagination = function() {
    this.totalPageItems = 64;
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
  this.getAllVenues();


}
