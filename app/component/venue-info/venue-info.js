'user strict';

require('./_venue-info.scss');

module.exports = {
  template: require('./venue-info.html'),
  controller: ['$log', '$window', 'venueService', VenueInfoController],
  controllerAs: 'venueInfoCtrl',
  bindings: {
    venue: '<'
  }
};

function VenueInfoController($log, $window, venueService) {
  $log.debug('VenueInfoController');

  this.address = '';

  this.getProfileInfo = function() {
    $log.debug('VenueInfoController.getProfileInfo()');

    venueService.fetchOneVenue($window.localStorage.currentVenue)
    .then( venue => {
      this.address = venue.address;
      console.log(this.address);
      // return this.address;
    });
  }

  this.getProfileInfo();
}
