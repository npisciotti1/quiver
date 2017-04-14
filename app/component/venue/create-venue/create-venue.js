'use strict';

require('./_create-venue.scss');

module.exports = {
  template: require('./create-venue.html'),
  controller: ['$log', 'venueService', CreateVenueController],
  controllerAs: 'createVenueCtrl'
};

function CreateVenueController($log, venueService) {
  $log.debug('CreateVenueController');

  this.venue = {};

  this.createVenue = function() {
    $log.debug('CreateVenueController.createVenue');

    venueService.createVenue(this.venue)
    .then( () => {
      this.venue.name = null;
      this.venue.description = null;
    })
  }
};
