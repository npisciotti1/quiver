'use strict';

module.exports = function() {
  return function(venues, searchTerm) {

    let fuzzyRegex = generateFuzzyRegex(searchTerm);
    return venues.filter( venue  => {
      return fuzzyRegex.test( venue.name.toUpperCase());
    });
  };

  function generateFuzzyRegex(input) {
    if(!input) return /.*/;
    let fuzzyString = '.*' + input.toUpperCase().split('').join('.*') + '.*';
    return new RegExp(fuzzyString);
  }
};
