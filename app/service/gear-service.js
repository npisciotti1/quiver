'use strict';

module.exports = ['$q', '$log', '$http', 'authService', gearService];

function gearService($q, $log, $http) {
  $log.debug('gearService');

  let service = {};
  service.userGear = {};

  service.postGear = function(venueData, gearData) {
    $log.debug('gearService.postGear');

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueData._id}/gear`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.post(url, config, gearData)
      .then( res => {
        service.userGear = res.data;
        return service.userGear;
      })
      .catch( err => {
        $log.error(err.message);
        $q.reject(err);
      });
    });
  };

  service.fetchGear = function(venueData) {
    $log.debug('gearService.fetchGear');

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueData._id}/gear`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config)
      .then( res => {
        $log.log('gear was fetched');
        service.userGear = res.data;
        return service.userGear;
      })
      .catch( err => {
        $log.error(err.message);
        $q.reject(err);
      });
    });
  };

  service.updateGear = function(venueData, gearData) {
    $log.debug(gearService.updateGear);

    return authService.getToken()
    .then( token => {
      let url = `${process.env.__API_URL__}/api/venue/${venueData._id}/gear/${gearData._id}`;
      let config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      return $http.put(url, config, gearData)
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