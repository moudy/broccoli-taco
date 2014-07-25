var fs = require('fs');
var path = require('path');

function toString (id) {
  var filepath = path.join(__dirname, 'sections', id+'.md');
  return fs.readFileSync(filepath).toString();
}

module.exports = function () {
  var page = {};

  var sections = [
    { id: 'getting-started', title: 'Getting Started', navTitle: 'Getting Started' }
  , { id: 'site-folder', title: '<span class="icon-folder"></span> Site Folder', navTitle: 'Site Folder' }

  , { id: 'page-folder', title: '<span class="icon-folder"></span> Page Folder', navTitle: 'Page Folder' }
  , { id: 'helpers', title: 'Helpers', navTitle: 'Helper' }
  , { id: 'partials', title: 'Partials', navTitle: 'Partials' }
  ];

  page.sections = sections.map(function (section) {
    section.body = toString(section.id);
    return section;
  });

  return page;
};
