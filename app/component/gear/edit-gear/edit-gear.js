'use strict';

require('./_edit-gear.scss');

module.exports = {
  template: require('./edit-gear.html'),
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
