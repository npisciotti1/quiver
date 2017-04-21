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

  this.address = '';
  this.currentVenue = {};

  this.getProfileInfo = function() {
    $log.debug('DisplayVenueInfoController.getProfileInfo()');

    venueService.fetchOneVenue($window.localStorage.currentVenue)
    .then( venue => {
      this.currentVenue = venue;
      this.address = venue.address;
      console.log(this.address);
    });
  }

  this.getProfileInfo();
}
