'use strict';

require('./_display-gear.scss');

module.exports = {
  template: require('./display-gear.html'),
  controller: ['$log', '$window', 'venueService', 'gearService', DisplayGearController],
  controllerAs: 'displayGearCtrl',
  bindings: {
    venue: '<'
  }
};

function DisplayGearController($log, $window, venueService, gearService) {
  $log.debug('DisplayGearController');


  this.populateTable = function() {
    $log.debug('DisplayGearController.getGear()');

    gearService.fetchGear($window.localStorage.currentVenue)
    .then( gearData => {
      this.gear = gearData;

      this.audioArray = this.gear.audio;
      this.lightingArray = this.gear.lighting;
      this.stageArray = this.gear.stage;
    });
  };

  this.showAudio = function() {
    $log.debug('DisplayGearController.showAudio()');

    this.displayAudio = true;
    this.displayLighting = false;
    this.displayStage = false;
  };

  this.showLighting = function() {
    $log.debug('DisplayGearController.showLighting()');

    this.displayAudio = false;
    this.displayLighting = true;
    this.displayStage = false;
  };

  this.showStage = function() {
    $log.debug('DisplayGearController.showStage()');

    this.displayAudio = false;
    this.displayLighting = false;
    this.displayStage = true;
  };

  //set this to true to display audio table on page load
  this.displayAudio = true;
  this.populateTable();
}
