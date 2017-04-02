'use strict';

module.exports = ['$logProvider', logConfig];

function logConfig($logProvider) {
  $logProvider.debugEnabled(process.env.__DEBUG__);
}
