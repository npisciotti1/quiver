'use strict';

require('./_edit-gear.scss');

module.exports = {
  template: require('./edit-gear.html'),
  controller: ['$log', '$window', 'venueService', 'gearService', EditGearController],
  controllerAs: 'editGearCtrl',
  bindings: {
    gear: '<'
  }
};

function EditGearController($log, $window, venueService, gearService) {
  $log.debug('EditGearController');

  this.bindNewGear = function(name, description) {
    let newItem = {name: name, description: description};
    this.gear.push(newItem);
    this.newItem.name = '';
    this.newItem.description = '';
  };
}
