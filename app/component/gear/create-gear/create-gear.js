'use strict';

require('./_create-gear.scss');

module.exports = {
  template: require('./create-venue.html'),
  controller: ['$log', 'venueService', 'gearService', CreateGearController],
  controllerAs: 'createVenueCtrl',
  bindings: {
    venue: '<'
  }
};

function CreateGearController($log, venueService, gearService) {
  $log.debug('CreateGearController');

  this.gear = {};

  this.createGear = function() {
    $log.debug('CreateGearController.createGear()');

    gearService.createGear(this.venue._id, this.gear)
    .then( () => {
      this.gear = {};
    });
  };
}
