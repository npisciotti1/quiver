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

  // this.updateGear = function() {
  //   $log.debug('EditGearController.updateGear()');
  //
  //   this.gear._id = $window.localStorage.gearID;
  //
  //   //had to add this so mongo recognizes what we're attempting to update
  //   let payload = { gear: this.gear};
  //
  //   gearService.updateGear($window.localStorage.currentVenue, payload)
  //   .then( () => {
  //     console.log('gear successfully updated');
  //   });
  // };

  this.bindNewGear = function(name, description) {
    let newItem = {name: name, description: description};
    console.log('binding new object,', newItem);

    this.gear.push(newItem);

  };
}
