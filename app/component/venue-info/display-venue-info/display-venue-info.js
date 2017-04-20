'user strict';

require('./_display-venue-info.scss');

module.exports = {
  template: require('./display-venue-info.html'),
  controller: ['$log', '$window', 'venueService', DiaplayVenueInfoController],
  controllerAs: 'displayVenueInfoCtrl',
  bindings: {
    venue: '<'
  }
};

function DiaplayVenueInfoController($log, $window, venueService) {
  $log.debug('DiaplayVenueInfoController');

  this.address = '';

  this.getProfileInfo = function() {
    $log.debug('DiaplayVenueInfoController.getProfileInfo()');

    venueService.fetchOneVenue($window.localStorage.currentVenue)
    .then( venue => {
      this.address = venue.address;
      console.log(this.address);
      // return this.address;
    });
  }

  this.getProfileInfo();
}
