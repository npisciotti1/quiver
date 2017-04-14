'use strict';

require('./edit-venue.scss');

module.exports = {
  template: require('./edit-venue.html'),
  controller: ['$log', 'venueService', EditVenueController],
  controllerAs: 'editVenueController',
  bindings: {
    venue: '<'
  }
};

function EditVenueController($log, venueService) {
  $log.debug('EditVenueController');

  this.updateVenue = function() {
    venueService.updateVenue(this.venue._id, this.venue);
  }
};
