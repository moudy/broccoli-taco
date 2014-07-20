var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');

var BASE_PATH = 'site/pages';

function toContent (pageKeyPath) {
  if (!pageKeyPath) return 'Index';
  var ret = pageKeyPath.split('.').pop();
  return ret.substring(0,1).toUpperCase()+ret.substr(1);
}

module.exports = function (pageKeyPath, object) {
  if ('index' === pageKeyPath) pageKeyPath = '';

  var pagePath = pageKeyPath.replace('.', '/');
  if (!fs.existsSync(path.join(BASE_PATH, pagePath, 'index.hbs'))) {
    throw new Error('No page found for: '+pagePath);
  }


  var options = object.hash;
  options.herf || (options.href = '/'+pagePath);
  var anchor = options.anchor;
  delete options.anchor;

  if (anchor) {
    options.href = options.href+'#'+anchor;
  }

  var attrs = [];
  var content = object.fn ? object.fn(this) : toContent(pageKeyPath);

  for (var key in options) attrs.push(key+'="'+options[key]+'"');
  var str = '<a '+attrs.join(' ')+'>'+content+'</a>';

  return new Handlebars.SafeString(str);
};
