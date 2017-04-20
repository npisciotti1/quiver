'user strict';

require('./_public-display-venue-info.scss');

module.exports = {
  template: require('./public-display-venue-info.html'),
  controller: ['$log', '$window', 'venueService', PublicDisplayVenueInfoController],
  controllerAs: 'publicDisplayVenueInfoCtrl',
  bindings: {
    venue: '<'
  }
};

function PublicDisplayVenueInfoController($log, $window, venueService) {
  $log.debug('PublicDisplayVenueInfoController');

  this.address = '';
  this.currentVenue = {};

  this.getProfileInfo = function() {
    $log.debug('PublicDisplayVenueInfoController.getProfileInfo()');

    venueService.fetchOneVenue($window.localStorage.currentVenue)
    .then( venue => {
      this.currentVenue = venue;
      this.address = venue.address;
      console.log(this.address);
    });
  }

  this.getProfileInfo();
}
