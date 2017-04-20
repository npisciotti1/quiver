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

  this.categories = [];

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

  this.showEdit = function() {
    this.displayEdit = true;
  };

  this.hideEdit = function() {
    this.displayEdit = false;
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

  this.getCategories = function() {
    this.categories = Object.keys(this.gear);
    return this.categories;
  };

  this.checkIfAudio = function(categoryStr) {
    if( categoryStr === 'audio') return true;
  };

  this.checkIfLighting = function(categoryStr) {
    if( categoryStr === 'lighting') return true;
  };

  this.checkIfStage = function(categoryStr) {
    if( categoryStr === 'stage') return true;
  };

  this.updateGear = function() {
    $log.debug('DisplayGearController.updateGear()');
    this.hideEdit();

    this.gear._id = $window.localStorage.gearID;

    gearService.updateGear($window.localStorage.currentVenue, this.gear)
    .then( () => {
      console.log('gear successfully updated');
    });
  };

  //set this to true to display audio table on page load
  this.displayAudio = true;
  this.populateTable();
}
