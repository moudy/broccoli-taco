var Handlebars = require('handlebars');
var fs = require('fs');

exports.layout = function (name, options) {
  if ('string' !== typeof name) {
    options = name;
    name = 'default';
  }

  var layout = fs.readFileSync('layouts/'+name+'.hbs').toString();
  var content = options.fn(this);
  var template = Handlebars.compile(layout);
  this.yield = content;
  return template(this);
};

exports.stylesheets = function () {
  function makeTag (name) {
    name = '/'+name.replace(/scss$/, 'css');
    return '<link href="'+name+'" rel="stylesheet" type="text/css">';
  }

  function filterCSS (file) {
    return /(css|scss)$/.test(file);
  }

  return this.assets.filter(filterCSS).map(makeTag).join('\n');
};

exports.javascripts = function () {
  function makeTag (name) {
    name = '/'+name;
    return '<script src="'+name+'"></script>';
  }

  function filterJS (file) {
    return /(js)$/.test(file);
  }

  return this.assets.filter(filterJS).map(makeTag).join('\n');
};

