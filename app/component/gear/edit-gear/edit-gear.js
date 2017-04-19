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

  this.categories = [];

  this.subArrays = [];
  // this.selectedCategory = {};

  this.updateGear = function() {
    gearService.updateGear(this.venue._id, this.gear);
  };

  this.getCategories = function() {
    this.categories = Object.keys(this.gear.gear);
    this.subArrays = Object.values(this.gear.gear);
    return this.categories;
  };

  this.fillSubCategories = function() {
    console.log('hey, we got here');
    // return this.gear.category;
  }

}
