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

    if(token) return $q.resolve(token);

    token = $window.localStorage.token;
    if(token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  }

  service.logout = function() {
    $log.debug('authService.logout()');

    delete $window.localStorage.token;
    token = null;
    return $q.resolve();
  }

  service.signup = function(user) {
    $log.debug('authService.signup');

    let url = `${__API_URL__}/api/signup`;
    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    return $http.post(url, user, config)
    .then( res => {
      $log.log('seccess', res.data);
      return setToken(res.data);
    })
    .catch(err => {
      $log.log('failure', err.message);
      return $q.reject(err);
    });
  }
}
