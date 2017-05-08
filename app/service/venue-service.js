'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', venueService];

function venueService($q, $log, $window, $http, authService) {
  $log.debug('venueService');

  let service = {};
  service.venues = [];
  service.userVenue = {};
  service.currentPublicVenue = {};

  service.createVenue = function(venue) {
    $log.debug('venueService.createVenue');

    return authService.getToken()
    .then( token => {

      let url = `${process.env.__API_URL__}/api/venue`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      return $http.post(url, venue, config);
    })
    .then( res => {
      $log.log('venue created');
      let newVenue = res.data;
      $window.localStorage.userVenueID = newVenue._id;
      return newVenue;
    })
    .catch(err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchAllVenues = function() {
    $log.debug('venueService.fetchAllVenues');

    return authService.getToken()
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
      service.venues = res.data;
      return service.venues;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchOneVenue = function(venueID) {
    $log.debug('venueService.fetchOneVenue');

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
      service.userVenue = res.data;
      $window.localStorage.userVenueID = res.data._id;
      return service.userVenue;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchOneVenuePublic = function(venueID) {
    $log.debug('venueService.fetchOneVenuePublic');

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
      service.currentPublicVenue = res.data;
      $window.localStorage.currentPublicVenueID = res.data._id;
      return service.currentPublicVenue;
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.fetchOneVenueLogin = function() {
    $log.debug('venueService.fetchOneVenueLogin');
    let userID = $window.localStorage.userID;

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/user/${userID}/venue`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      service.userVenue = res.data;
      $window.localStorage.userVenueID = res.data._id;
      return $q.resolve(service.userVenue);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  service.updateVenue = function(venueID, venueData) {
    $log.debug('venueService.updateVenue');

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
      // console.log(venueData);
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
    $log.debug('venueService.deleteVenue');

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
