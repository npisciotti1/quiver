'use strict';

module.exports = ['$q', '$log', '$http', '$window', 'authService', gearService];

function gearService($q, $log, $http, $window, authService) {
  $log.debug('gearService');

  let service = {};
  service.userGear = {};

  service.postGear = function(venueID, gearData) {
    $log.debug('gearService.postGear');

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueID}/gear`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.post(url, gearData, config)
      .then( res => {
        service.userGear = res.data.gear;
        $window.localStorage.gearID = res.data._id;
        return service.userGear;
      })
      .catch( err => {
        $log.error(err.message);
        $q.reject(err);
      });
    });
  };

  service.fetchGear = function(venueID) {
    $log.debug('gearService.fetchGear');

    if(service.userGear.audio) return $q.resolve(service.userGear);

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueID}/gear`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config)
      .then( res => {
        $log.log('gear was fetched heres the res.data', res.data);
        service.userGear = res.data.gear;
        return service.userGear;
      })
      .catch( err => {
        $log.error(err.message);
        $q.reject(err);
      });
    });
  };

  service.updateGear = function(venueID, gearData) {
    $log.debug(gearService.updateGear);

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueID}/gear/${gearData._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, gearData, config)
      .then( res => {
        service.userGear = res.data;
        return service.userGear;
      })
      .catch( err => {
        $log.error(err);
        $q.reject(err);
      });
    });
  };

  service.deleteGear = function(venueData, gearData) {
    $log.debug(gearService.updateGear);

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueData._id}/gear/${gearData._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config)
      .then( () => {
        delete service.userGear;
        return;
      })
      .catch( err => {
        $log.error(err.message);
        $q.reject(err);
      });
    });
  };

  return service;
}
