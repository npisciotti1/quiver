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

  this.venue = venueService.currentPublicVenue;

  this.getProfileInfo = function() {
    $log.debug('PublicInfoController.getProfileInfo()');

    venueService.fetchOneVenuePublic($window.localStorage.currentPublicVenueID)
    .then( () => {
      console.log('$window.localStorage', $window.localStorage);
      console.log('fetched venue in public dash, this.currentPublicVenue:', this.currentPublicVenue);
      this.venue = venueService.currentPublicVenue;
    });
  };

  this.getProfileInfo();
}
