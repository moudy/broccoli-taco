var Handlebars = require('handlebars');
var path = require('path');
var slice = Array.prototype.slice;
var SITE = 'site';
var PAGE = 'page';

module.exports = function () {
  var basePath = this.basePath;
  var site;
  var page;
  var args = slice.call(arguments);
  args.pop();
  if (!args.length) args = [SITE, PAGE];

  var ret = [];
  var filename = this.filename.substr(0,this.filename.lastIndexOf('/')+1)+'page.css';

  function makeTag (name) {
    if (basePath) {
      name = path.join(basePath, name);
    }
    return '<link href="/'+name+'" rel="stylesheet" type="text/css">';
  }

  if (~args.indexOf(SITE)) {
    site = this.assets['site.css'];
    site && ret.push(makeTag(site));
  }

  if (~args.indexOf(PAGE)) {
    page = this.assets[filename];
    page && ret.push(makeTag(page));
  }

  return new Handlebars.SafeString(ret.join('\n'));
};


