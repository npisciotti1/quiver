'use strict';

require('./_about.scss');

module.exports = ['$log', AboutController];

function AboutController($log) {
  $log.debug('AboutController');
}
