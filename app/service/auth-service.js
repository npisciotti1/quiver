'use strict'

module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window) {
  $log.debug('authService');

  let service = {};
  let token = null;

  function setToken(_token) {
    $log.debug('authService.setToken()');

    if(!_token) return $q.reject(new Error('no token'));

    $window.localStorage.token = _token;
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function() {
    $log.debug('authService.getToken()');
    
  }
}
