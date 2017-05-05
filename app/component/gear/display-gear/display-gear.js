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
  this.newItem = {};

  this.populateTable = function() {
    $log.debug('DisplayGearController.getGear()');

    gearService.fetchGear($window.localStorage.userVenueID)
    .then( gearData => {
      this.gear = gearData;
    });
  };

  this.showEdit = function() {
    this.showPlaceholder = true;
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

    //this is to delete weird bug where _id shows up in select box
    if(this.categories.indexOf('_id')!== -1) {
      let stupidBugIdx = this.categories.indexOf('_id');
      this.categories.splice(stupidBugIdx);
    }

    return this.categories;
  };

  this.checkIfAudio = function(categoryStr) {
    if( categoryStr === 'audio') {
      this.showPlaceholder = false;
      return true;
    }
  };

  this.checkIfLighting = function(categoryStr) {
    if( categoryStr === 'lighting') {
      this.showPlaceholder = false;
      return true;
    }
  };

  this.checkIfStage = function(categoryStr) {
    if( categoryStr === 'stage') {
      this.showPlaceholder = false;
      return true;
    }
  };

  this.updateGear = function() {
    $log.debug('DisplayGearController.updateGear()');
    this.hideEdit();

    this.gear._id = $window.localStorage.userGearID;

    //had to add this so mongo recognizes what we're attempting to update
    let payload = {gear: this.gear};

    gearService.updateGear($window.localStorage.userVenue, payload)
    .then( () => {
      console.log('gear successfully updated');
    });
  };

  this.setUserGearID = function() {

    if(!$window.localStorage.userGearID) $window.localStorage.userGearID = gearService.userGear._id;
  };

  //set this to true to display audio table on page load
  this.displayAudio = true;
  this.populateTable();
  this.setUserGearID();
}
