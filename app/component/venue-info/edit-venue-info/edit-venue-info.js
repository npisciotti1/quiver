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
  };

  this.updateVenueInfo = function() {
    $log.debug('EditVenueInfoController.updateVenueInfo()');

    venueService.fetchOneVenue($window.localStorage.currentVenueID)
    .then( venueObj => {
      venueService.updateVenue(venueObj._id, this.venue);
      this.showForm = false;
    });
  };
}
