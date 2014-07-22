var fs = require('fs');
var path = require('path');
var Handlebars = require('handlebars');

module.exports = function (name, options) {
  if ('string' !== typeof name) {
    options = name;
    name = 'default';
  }

  var filename = name+'.hbs';
  var filepath = path.join(process.cwd(), 'site/layouts', filename);

  var layout = fs.readFileSync(filepath).toString();
  var content = options.fn(this);
  var template = Handlebars.compile(layout);
  this.yield = content;
  return template(this);
};
