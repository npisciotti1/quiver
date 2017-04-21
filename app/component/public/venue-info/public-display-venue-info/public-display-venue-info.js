'user strict';

require('./_public-display-venue-info.scss');

module.exports = {
  template: require('./public-display-venue-info.html'),
  controller: ['$log', '$window', 'publicVenueService', PublicDisplayVenueInfoController],
  controllerAs: 'publicDisplayVenueInfoCtrl',
  bindings: {
    venue: '<'
  }
};

function PublicDisplayVenueInfoController($log, $window, publicVenueService) {
  $log.debug('PublicDisplayVenueInfoController');

  this.address = '';
  this.currentVenue = {};

  this.getProfileInfo = function() {
    $log.debug('PublicDisplayVenueInfoController.getProfileInfo()');

    publicVenueService.fetchOneVenue($window.localStorage.currentVenue)
    .then( venue => {
      console.log(venue.address);
      this.currentVenue = venue;
      this.address = venue.address;
    });
  }

  this.getProfileInfo();
}
