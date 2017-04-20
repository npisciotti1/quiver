'user strict';

require('./_edit-venue-info.scss');

module.exports = {
  template: require('./edit-venue-info.html'),
  controller: ['$log', '$window', 'venueService', EditVenueInfoController],
  controllerAs: 'editVenueInfoCtrl',
  bindings: {
    venue: '<'
  }
};

function EditVenueInfoController($log, $window, venueService) {
  $log.debug('EditVenueInfoController');

  this.updateVenueInfo = function() {
    $log.debug('EditVenueInfoController.updateVenueInfo()');

    console.log('venue:');
    venueService.fetchOneVenue($window.localStorage.currentVenue)
    .then( venueObj => {
      console.log(venueObj);
      venueObj.address = 'this is a totally cool address';
      console.log(venueObj);
      venueService.updateVenue($window.localStorage.currentVenue, venueObj);
      console.log(venueObj);
    })
    // venueService.updateVenue($window.localStorage.currentVenue, 'this is a totally cool address')
  }
}
