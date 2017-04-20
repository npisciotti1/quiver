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

  this.showForm = false;

  this.edit = function() {
    this.showForm = true;
  }

  this.updateVenueInfo = function() {
    $log.debug('EditVenueInfoController.updateVenueInfo()');

    console.log('venue:');
    venueService.fetchOneVenue($window.localStorage.currentVenue)
    .then( venueObj => {
      console.log(venueObj);
      console.log('venue', this.venue);
      venueService.updateVenue(venueObj._id, this.venue);
      this.showForm = false;
    })
  }
}
