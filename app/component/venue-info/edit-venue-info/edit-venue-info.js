'user strict';

require('./_edit-venue-info.scss');

module.exports = {
  template: require('./edit-venue-info.html'),
  controller: ['$log', '$window', 'venueService', EditVenueInfoController],
  controllerAs: 'editVenueInfoCtrl',
  bindings: {
    venue: '<'
  }
};

function EditVenueInfoController($log, $window, venueService) {
  $log.debug('EditVenueInfoController');

  this.showForm = false;

  this.edit = function() {
    this.showForm = true;
  };
  // var tempPhoneNumber = `${Math.floor(Math.random() * 999999999)}`;
  // function formatPhoneNumber(s) {
  //   var s2 = (""+s).replace(/\D/g, '');
  //   var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  //   return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  // }
  this.updateVenueInfo = function() {
    $log.debug('EditVenueInfoController.updateVenueInfo()');

    venueService.fetchOneVenue($window.localStorage.userVenueID)
    .then( venueObj => {
      venueService.updateVenue(venueObj._id, this.venue);
      this.showForm = false;
    });
  };
}
