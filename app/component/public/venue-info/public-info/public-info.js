'user strict';

require('./_public-info.scss');

module.exports = {
  template: require('./public-info.html'),
  controller: ['$log', '$window', 'venueService', PublicInfoController],
  controllerAs: 'publicInfoCtrl',
  bindings: {
    venue: '<'
  }
};

function PublicInfoController($log, $window, venueService) {
  $log.debug('PublicInfoController');

  this.currentVenue = venueService.currentVenue;
  this.address = venueService.currentVenue.address;

  this.getProfileInfo = function() {
    $log.debug('PublicInfoController.getProfileInfo()');

    venueService.fetchOneVenue($window.localStorage.currentVenueID)
    .then( () => {
      this.currentVenue = venueService.currentVenue;
      this.address = venueService.currentVenue.address;
    });
  };

  this.getProfileInfo();
}
