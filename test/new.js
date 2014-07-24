var path = require('path');
var util = require('./util');
var macros = util.macros;
var quickTemp = require('quick-temp');
var findup = require('findup-sync');
var walkSync = require('walk-sync');

var templatesPath = findup('templates');
var defaultTemplatePath = path.join(templatesPath, 'default');
var defaultTemplateFiles = walkSync(defaultTemplatePath);

describe('broccoli-taco new <name>', function () {

  context('valid args', function () {
    var siteName = 'foo';
    before(macros.exec('rm -rf '+siteName));

    it('creates a new site', function (done) {
      util.execCli('new '+siteName, function (err, output) {
        var sitePath = path.join(util.getTestTmpPath(), siteName);
        var siteFiles = walkSync(sitePath);
        expect(siteFiles).to.deep.equal(defaultTemplateFiles);
        done();
      });
    });
  });

  context('invalid args', function () {
    it('requires a name', function (done) {
      util.execCli('new', function (err, output) {
        expect(err).to.be.instanceOf(Error) && done();
      });
    });
  });

  context('directory already exists', function () {
    var siteName = 'bar';
    before(macros.exec('mkdir '+siteName));
    after(macros.exec('rm -rf '+siteName));

    it('does not overwrite existing directory', function (done) {
      util.execCli('new '+siteName, function (err, output) {
        expect(err).to.be.instanceOf(Error);
        expect(output).to.contain('Directory \''+siteName+'\' already exists');
        done();
      });
    });
  });

});
