'use strict';

module.exports = ['$q', '$log', '$http', 'Upload', 'authService', picService];

function picService($q, $log, $http, Upload, authService) {
  $log.debug('picService');

  let service = {};

  service.uploadVenuePic = function(venueData, picData) {
    $log.debug('authService.uploadVenuePic');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/venue/${venueData._id}/pic`;
      let headers = {
        Authorization: `Bearer ${token}`
        Accept: 'application/json',
      };

      return Upload.upload({
        url,
        headers,
        method: 'POST',
        data: {
          name: picData.name,
          description: picData.description,
          file: picData.file
        }
      });
    })
    .then( res => {
      venueData.pics.unshift(res.data);
      return res.data;
    })
    .catch( err => {
      $log.error(err.messasge);
      return $q.reject(err);
    })
  };

  return service;
}
