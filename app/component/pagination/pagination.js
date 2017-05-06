'use strict';

require('./_pagination.scss');

module.exports = {
  template: require('./pagination.html'),
  controller: ['$log', PaginationController],
  controllerAs: 'paginationCtrl',
  bindings: {
    pages: '<',
    numPages: '=',
    currentPage: '=',
    onSelectPage: '&'
  }
};

function PaginationController($log) {
  $log.debug('PaginationController');


  this.noPrevious = function() {
    return this.currentPage === 1;
  };
  this.noNext = function() {
    return this.currentPage === this.numPages;
  };
  this.isActive = function(page) {
    return this.currentPage === page;
  };

  this.selectPage = function(page) {
    if ( ! this.isActive(page) ) {
      this.currentPage = page;
      this.onSelectPage({ page: page });
    }
  };

  this.selectPrevious = function() {
    if ( !this.noPrevious() ) {
      this.selectPage(this.currentPage-1);
    }
  };
  this.selectNext = function() {
    if ( !this.noNext() ) {
      this.selectPage(this.currentPage+1);
    }
  };


}
