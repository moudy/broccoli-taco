var RSVP = require('rsvp');
var Promise = RSVP.Promise;

module.exports = function () {
  return new Promise(function (resolve) {
    resolve({
      title: 'CONTACT_PAGE_DATA'
    });
  });
};
