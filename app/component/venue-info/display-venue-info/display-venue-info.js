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

  this.userVenue = venueService.userVenue;
  // this.address = venueService.userVenue.address;

  this.getProfileInfo = function() {
    $log.debug('DisplayVenueInfoController.getProfileInfo()');

    venueService.fetchOneVenue($window.localStorage.userVenueID)
    .then( () => {
      this.userVenue = venueService.userVenue;
      // this.address = venueService.userVenue.address;
    });
  };

  this.getProfileInfo();
}
