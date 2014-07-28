var fs = require('fs');
var path = require('path');
var walkSync = require('walk-sync');

var sectionsPath = path.join(__dirname, 'sections');

function toTitle (filename) {
  return filename.replace(/\.md$/g, '').replace(/^[A-Z]\. /, '');
}

function toString (filepath) {
  return fs.readFileSync(filepath).toString();
}

function toId (title) {
  return title.toLowerCase().replace(/\s/g, '-');
}

module.exports = function () {
  var page = {};

  var sections = fs.readdirSync(sectionsPath);

  page.tagline = 'Documentation'
  page.subTagline = 'An overview of files, folders, helpers and partials.'


  page.sections = sections.map(function (section) {
    var title = toTitle(section);
    var filepath = path.join(sectionsPath, section);
    var subSections = fs.readdirSync(filepath).map(function (subSection) {
      var subSectionTitle = toTitle(subSection);
      var subSectionFilepath = path.join(filepath, subSection);
      return {
        id: toId(subSectionTitle)
      , title: subSectionTitle
      , body: toString(subSectionFilepath)
      }
    });
    return {
      id: toId(title)
    , title: title
    , subSections: subSections
    };
  });

  return page;
};

