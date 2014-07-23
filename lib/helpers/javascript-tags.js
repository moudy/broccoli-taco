var Handlebars = require('handlebars');
var slice = Array.prototype.slice;
var SITE = 'site';
var PAGE = 'page';

module.exports = function () {
  var site;
  var page;
  var args = slice.call(arguments);
  args.pop();
  if (!args.length) args = [SITE, PAGE];

  var ret = [];
  var filename = this.filename.substr(0,this.filename.lastIndexOf('/')+1)+'page.js';

  function makeTag (name) {
    return '<script src="/'+name+'"></script>';
  }

  if (~args.indexOf(SITE)) {
    site = this.assets['site.js'];
    site && ret.push(makeTag(site));
  }

  if (~args.indexOf(PAGE)) {
    page = this.assets[filename];
    page && ret.push(makeTag(page));
  }

  return new Handlebars.SafeString(ret.join('\n'));
};


