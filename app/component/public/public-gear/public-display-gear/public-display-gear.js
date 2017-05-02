'use strict';

require('./_public-display-gear.scss');

module.exports = {
  template: require('./public-display-gear.html'),
  controller: ['$log', '$window', 'venueService', 'gearService', PublicDisplayGearController],
  controllerAs: 'publicDisplayGearCtrl',
  bindings: {
    venue: '<'
  }
};

function PublicDisplayGearController($log, $window, venueService, gearService) {
  $log.debug('PublicDisplayGearController');

  this.categories = [];
  this.newItem = {};

  this.populateTable = function() {
    $log.debug('PublicDisplayGearController.getGear()');

    gearService.fetchGear($window.localStorage.currentPublicVenueID)
    .then( gearData => {
      this.gear = gearData;
    });
  };

  this.showEdit = function() {
    this.displayEdit = true;
  };

  this.hideEdit = function() {
    this.displayEdit = false;
  };

  this.showAudio = function() {
    $log.debug('PublicDisplayGearController.showAudio()');

    this.displayAudio = true;
    this.displayLighting = false;
    this.displayStage = false;

  };

  this.showLighting = function() {
    $log.debug('PublicDisplayGearController.showLighting()');

    this.displayAudio = false;
    this.displayLighting = true;
    this.displayStage = false;
  };

  this.showStage = function() {
    $log.debug('PublicDisplayGearController.showStage()');

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

  this.bindNewGear = function(name, description) {
    let newItem = {name: name, description: description};

    if(this.checkIfAudio(this.selectedCategory)) {
      this.gear.audio.push(newItem);
      return;
    }

    if(this.checkIfLighting(this.selectedCategory)) {
      this.gear.lighting.push(newItem);
      return;
    }

    if(this.checkIfStage(this.selectedCategory)) {
      this.gear.stage.push(newItem);
      return;
    }
  };

  //set this to true to display audio table on page load
  this.displayAudio = true;
  this.populateTable();
}
