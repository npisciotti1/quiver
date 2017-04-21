'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', publicVenueService];

function publicVenueService($q, $log, $window, $http, authService) {
  $log.debug('publicVenueService');

  let service = {};
  service.venues = [];
  service.currentVenue = {};

  service.fetchAllVenues = function() {
    $log.debug('publicVenueService.fetchAllVenues');

    return authService.setToken()
    .then( () => {
      authService.getToken()
    })
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('we got the venues bruh!');
      service.venues = res.data;
      console.log('res.data:', res.data);
      return service.venues;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchOneVenue = function(venueID) {
    $log.debug('publicVenueService.fetchOneVenue');

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('we got one venue bruh!');
      service.venues = res.data;
      return service.venues;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateVenue = function(venueID, venueData) {
    $log.debug('publicVenueService.updateVenue');

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, venueData, config);
    })
    .then( res => {
      for (let i = 0; i < service.venues.length; i++) {
        let current = service.venues[i];
        if (current._id === venueID) {
          service.venues[i] = res.data;
          break;
        }
      }

      return res.data;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.deleteVenue = function(venueID) {
    $log.debug('publicVenueService.deleteVenue');

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueID}`;
      let config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then ( () => {
      for(let i = 0; i < service.venues.length; i++) {
        let current = service.venues[i];
        if (current._id === venueID) {
          service.venues.splice(i, 1);
          break;
        }
      }
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
