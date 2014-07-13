var fs = require('fs');
var Handlebars = require('handlebars');

module.exports = function (name, options) {
  if ('string' !== typeof name) {
    options = name;
    name = 'default';
  }

  var layout = fs.readFileSync('site/layouts/'+name+'.hbs').toString();
  var content = options.fn(this);
  var template = Handlebars.compile(layout);
  this.yield = content;
  return template(this);
};
