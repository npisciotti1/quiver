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

  this.currentVenue = venueService.currentVenue;
  this.address = venueService.currentVenue.address;

  this.getProfileInfo = function() {
    $log.debug('DisplayVenueInfoController.getProfileInfo()');

    venueService.fetchOneVenue($window.localStorage.currentVenueID)
    .then( () => {
      this.currentVenue = venueService.currentVenue;
      this.address = venueService.currentVenue.address;
    });
  };

  this.getProfileInfo();
}
