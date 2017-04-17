'use strict';

require('./_display-gear.scss');

module.exports = {
  template: require('./display-gear.html'),
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
