var fs = require('fs');
var util = require('util');
var findup = require('findup-sync');
var path = require('path');
var exec = require('child_process').exec;
var walkSync = require('walk-sync');

var test = {
  contain: function (key, expected) {
    return function () {
      if (!util.isArray(expected)) expected = [expected];
      var str = this[key];
      expected.forEach(function (e) { expect(str).to.contain(e); });
    };
  }
};

describe('broccoli-taco build <destination>', function () {

  describe('Basic site', function () {
    var testSitePath = path.join(findup('test'), 'sites/basic');
    var distName = 'dist';
    var testSitePathDistPath = path.join(testSitePath, distName);

    function rmDist (done) { exec('rm -rf '+distName, done); }

    function toString (filepath) {
      return fs.readFileSync(path.join(testSitePathDistPath, filepath)).toString();
    }

    before(function () { process.chdir(testSitePath); });

    before(rmDist);

    before(function (done) {
      var localPath = path.join(process.cwd(), 'node_modules');
      exec('BROCCOLI_TACO_ENV=production NODE_PATH='+localPath+' ../../../bin/broccoli-taco build '+distName, done);
    });

    before(function () {
      this.indexHTML = toString('index.html');
      this.aboutHTML = toString('about/index.html');
      this.contactHTML = toString('contact/index.html');
    });

    after(rmDist);

    context('HTML', function () {
      it('builds the index page', test.contain('indexHTML', 'PAGES/INDEX'));
      it('builds with delfault layout', test.contain('indexHTML', 'LAYOUTS/DEFAULT'));
      it('builds sub-pages', test.contain('aboutHTML', 'PAGES/ABOUT'));
      it('builds sub-pages with layout', test.contain('aboutHTML', 'LAYOUTS/DEFAULT'));
      it('builds with nested layouts', test.contain('aboutHTML', ['LAYOUTS/DEFAULT', 'LAYOUTS/ABOUT']));

      it('builds with partials', test.contain('indexHTML', 'PARTIALS/NAV'));
      it('builds with partials', test.contain('aboutHTML', 'PARTIALS/NAV'));

      it('builds with link-to helper', test.contain('indexHTML', '<a href="/about">About</a>'));
      it('builds with block link-to helper', test.contain('indexHTML', '<a href="/contact">Call Me Maybe</a>'));

      it('includes site.css on index page', test.contain('indexHTML', '<link href="/site'));
      it('includes page.css on index page', test.contain('indexHTML', '<link href="/page'));

      it('includes site.js on index page', test.contain('indexHTML', '<script src="/site'));
      it('includes page.js on index page', test.contain('indexHTML', '<script src="/page'));

      it('includes site.css on sub-page page', test.contain('aboutHTML', '<link href="/site'));
      it('includes page.css on sub-page', test.contain('aboutHTML', '<link href="/about/page'));
    });

    context('Data', function () {
      it('makes site.js available to all pages', function () {
        [this.indexHTML, this.aboutHTML, this.contactHTML].forEach(function (html) {
          expect(html).to.contain('SITE_DATA');
        });
      });

      it('makes data.js available to index.html', test.contain('indexHTML', 'INDEX_PAGE_DATA'));
      it('makes about/data.json available to about/index.html', test.contain('aboutHTML', 'ABOUT_PAGE_DATA'));
      it('makes contact/data.js available to contact/index.html async', test.contain('contactHTML', 'CONTACT_PAGE_DATA'));
    });

    context('Scss', function () {
      before(function () {
        this.siteCss = toString('site.css');
        this.indexPageCss = toString('page.css');
        this.aboutPageCss = toString('about/page.css');
      });

      it('compiles site.css', test.contain('siteCss', 'body{background:red}'));
      it('compiles page.css', test.contain('indexPageCss', 'p{color:green}'));
      it('compiles about/page.css', test.contain('aboutPageCss', 'h1{font-size:18px}'));
    });

    context('Javascript', function () {
      before(function () {
        this.siteJS = toString('site.js');
        this.indexPageJS = toString('page.js');
        this.aboutPageJS = toString('about/page.js');
      });

      it('compiles site.js', test.contain('siteJS', 'SITE_JS'));
      it('compiles page.js', test.contain('indexPageJS', 'PAGE_JS'));
      it('compiles about/page.js', test.contain('aboutPageJS', 'ABOUT_PAGE_JS'));
    });

    context('Static', function () {
      it('moves static files', function () {
        var files = walkSync(testSitePathDistPath);
        expect(files).to.include.members(['static/', 'static/foo.txt']);
      });
    });

  });

  describe('Mounted site', function () {
    var testSitePath = path.join(findup('test'), 'sites/mounted');
    var distName = 'dist';
    var testSitePathDistPath = path.join(testSitePath, distName);

    function rmDist (done) { exec('rm -rf '+distName, done); }

    function toString (filepath) {
      return fs.readFileSync(path.join(testSitePathDistPath, filepath)).toString();
    }

    before(function () { process.chdir(testSitePath); });
    before(rmDist);

    before(function (done) {
      var localPath = path.join(process.cwd(), 'node_modules');
      exec('BROCCOLI_TACO_ENV=production NODE_PATH='+localPath+' ../../../bin/broccoli-taco build '+distName, done);
    });

    before(function () {
      this.indexHTML = toString('index.html');
    });

    it('adds path to link-to', test.contain('indexHTML', '<a href="/mounted-path">Index</a>'));
    it('adds path to js and css assets', test.contain('indexHTML', '<script src="/mounted-path/site-', '<link href="/mounted-path/site-'));

  });

  describe('Dynamic site', function () {
    var testSitePath = path.join(findup('test'), 'sites/dynamic');
    var distName = 'dist';
    var testSitePathDistPath = path.join(testSitePath, distName);

    function rmDist (done) { exec('rm -rf '+distName, done); }

    function toString (filepath) {
      return fs.readFileSync(path.join(testSitePathDistPath, filepath)).toString();
    }

    before(function () { process.chdir(testSitePath); });

    before(rmDist);

    before(function (done) {
      var localPath = path.join(process.cwd(), 'node_modules');
      exec('BROCCOLI_TACO_ENV=production NODE_PATH='+localPath+' ../../../bin/broccoli-taco build '+distName, done);
    });

    before(function () {
      this.indexHTML = toString('index.html');
      this.fooHTML = toString('foo/index.html');
      this.barHTML = toString('bar/index.html');
    });

    after(rmDist);

    context('HTML', function () {
      it('builds the index page', test.contain('indexHTML', 'PAGES/INDEX'));
      it('builds with delfault layout', test.contain('indexHTML', 'LAYOUTS/DEFAULT'));
      it('builds dynamic page "foo"', test.contain('fooHTML', 'FOO'));
      it('builds dynamic page "bar"', test.contain('barHTML', 'BAR'));
    });

  });

});
