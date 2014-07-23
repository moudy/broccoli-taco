var fs         = require('fs');
var path       = require('path');
var Handlebars = require('handlebars');
var idFromData = require('../id-from-data');

var BASE_PATH = 'site/pages';

function toContent (pageKeyPath) {
  if (!pageKeyPath) return 'Index';
  var ret = pageKeyPath.split('.').pop();
  return ret.substring(0,1).toUpperCase()+ret.substr(1);
}

function toAttributes (options) {
  var ret = [];
  for (var key in options) ret.push(key+'="'+options[key]+'"');
  return ret.join(' ');
}

function toModelPagePath (pagePath, model) {
  return path.join(pagePath.substring(0, pagePath.lastIndexOf('/')), idFromData(model));
}

module.exports = function (pageKeyPath, model, object) {
  if (!object) {
    object = model;
    model = null;
  }

  if ('index' === pageKeyPath) pageKeyPath = '';

  var pagePath = pageKeyPath.replace('.', '/');

  if (!fs.existsSync(path.join(BASE_PATH, pagePath, 'index.hbs'))) {
    throw new Error('No page found for: '+pagePath);
  }

  if (model) {
    pagePath = toModelPagePath(pagePath, model);
  }

  if (this.basePath) {
    pagePath = path.join(this.basePath, pagePath);
  }

  var options = object.hash;
  options.href || (options.href = '/'+pagePath);

  var anchor = options.anchor;
  delete options.anchor;
  if (anchor) {
    options.href = options.href+'#'+anchor;
  }

  var content = object.fn ? object.fn(this) : toContent(pageKeyPath);
  var str = '<a '+toAttributes(options)+'>'+content+'</a>';

  return new Handlebars.SafeString(str);
};
