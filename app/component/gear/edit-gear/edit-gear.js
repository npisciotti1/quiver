'use strict';

require('./_edit-gear.scss');

module.exports = {
  template: require('./edit-gear.html'),
  controller: ['$log', 'venueService', 'gearService', EditGearController],
  controllerAs: 'editGearCtrl',
  bindings: {
    gear: '<'
  }
};

function EditGearController($log, venueService, gearService) {
  $log.debug('EditGearController');

}
