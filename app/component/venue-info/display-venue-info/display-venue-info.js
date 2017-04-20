'user strict';

require('./_display-venue-info.scss');

module.exports = {
  template: require('./display-venue-info.html'),
  controller: ['$log', '$window', 'venueService', DisplayVenueInfoController],
  controllerAs: 'displayVenueInfoCtrl',
  bindings: {
    venue: '<'
  }
};

function DisplayVenueInfoController($log, $window, venueService) {
  $log.debug('DisplayVenueInfoController');

  this.address = '';
  this.currentVenue = {};

  this.getProfileInfo = function() {
    $log.debug('DisplayVenueInfoController.getProfileInfo()');

    venueService.fetchOneVenue($window.localStorage.currentVenue)
    .then( venue => {
      this.currentVenue = venue;
      this.address = venue.address;
      console.log(this.address);
      // return this.address;
    });
  }

  this.getProfileInfo();
}
