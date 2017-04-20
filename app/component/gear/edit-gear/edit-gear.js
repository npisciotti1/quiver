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

  this.updateGear = function() {
    $log.debug('DisplayGearController.updateGear()');

    this.gear._id = $window.localStorage.gearID;
    console.log('in the child controller, this.gear', this.gear);
    
    gearService.updateGear($window.localStorage.currentVenue, this.gear)
    .then( res => {
      console.log('gear successfully updated, heres the res', res);
      // this.gear = res.gear;
      // gearService.userGear = res.gear;
    });
  };

}
