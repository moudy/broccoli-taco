var fs = require('fs');
var path = require('path');
var walkSync = require('walk-sync');

var sectionsPath = path.join(__dirname, 'sections');

function toString (filepath) {
  return fs.readFileSync(filepath).toString();
}

function toId (title) {
  return title.toLowerCase().replace(/\s/g, '-');
}

module.exports = function () {
  var page = {};

  var sections = walkSync(sectionsPath);

  page.tagline = 'How to make broccoli tacos.'

  page.sections = sections.map(function (section) {
    var title = section.replace(/\.md$/g, '').replace(/^[A-Z]\. /, '');
    var filepath = path.join(sectionsPath, section);
    return {
      id: toId(title)
    , title: title
    , body: toString(filepath)
    };
  });

  return page;
};
