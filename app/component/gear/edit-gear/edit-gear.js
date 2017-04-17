'use strict';

require('./edit-gear.scss');

module.exports = {
  template: require('./edit-venue.html'),
  controller: ['$log', 'venueService', 'gearService', EditGearController],
  controllerAs: 'editGearController',
  bindings: {
    venue: '<',
    gear: '<'
  }
};

function EditGearController($log, venueService, gearService) {
  $log.debug('EditGearController');

  this.updateGear = function() {
    gearService.updateGear(this.venue._id, this.gear);
  };
}
