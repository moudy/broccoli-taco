var fingerprint   = require('broccoli-fingerprint');
var browserify    = require('broccoli-browserify');
var mergeTrees    = require('broccoli-merge-trees');
var pickFiles     = require('broccoli-static-compiler');
var handlebars    = require('broccoli-handlebars');
var cleanCSS      = require('broccoli-clean-css');
var sass          = require('broccoli-sass');
var Handlebars    = require('handlebars');
var walkSync      = require('walk-sync');
var helpers       = require('./helpers');
var RenderContext = require('./render-context');

var ASSET_FILE = /page\.(scss|js)$/;
var CSS_FILE = /\.scss$/;
var JAVASCRIPT_FILE = /\.js/;

function filter (regex) {
  return function (str) {
    return regex.test(str);
  };
}

var Site = module.exports = function () {
  this.pagesTree = 'pages';
  this.layoutsTree = 'layouts';
  this.partilsTree = 'partials';
  this.assetsTree = 'assets';

  this.markupTree = mergeTrees([
    this.pagesTree
  , this.layoutsTree
  , this.partilsTree
  ]);

  this.env = {};

  this.assetFiles = (walkSync('assets').concat(walkSync('pages'))).filter(filter(ASSET_FILE));
  this.cssFiles = this.assetFiles.filter(filter(CSS_FILE));
  this.javascriptFiles = this.assetFiles.filter(filter(JAVASCRIPT_FILE));

  this.renderContext = new RenderContext({
    assetFiles: this.assetFiles
  });
};

Site.prototype.pickFiles = function (tree, ext) {
 return pickFiles(tree, {
    srcDir: '/'
  , files: ['**/*.'+ext]
  , destDir: '/'
  });
};

Site.prototype.css = function () {
  var inputs = [this.assetsTree, this.pagesTree];
  var trees = this.cssFiles.map(function (file) {
    var css = sass(inputs, file, file.replace(CSS_FILE, '.css'));

    if (!this.env.production) {
      css = cleanCSS(css);
    }

    //css = fingerprint(css);
    return css;
  }.bind(this));
  return mergeTrees(trees);
};

Site.prototype.javascript = function () {
  var inputTree = mergeTrees([this.assetsTree, this.pagesTree]);
  var trees = this.javascriptFiles.map(function (file) {
    return browserify(inputTree, {
      entries: ['./'+file]
    , outputFile: file
    , bundle: {debug: !this.env.production}
    });
  }.bind(this));
  return mergeTrees(trees);
};

Site.prototype.html = function () {
  return this.pickFiles(this.markupTree, 'html');
};

Site.prototype.handlebars = function () {
  var files = this.pickFiles(this.markupTree, 'hbs');
  var context;
  if (files) {
    context = this.renderContext.toJSON.bind(this.renderContext);
    return handlebars(files, {
      context: context
    , helpers: helpers
    , handlebars: Handlebars
    , partials: 'partials'
    });
  }
};


Site.prototype.toTree = function () {
  var output = [];

  function add (tree) {
    if (tree) {
      output.push(tree);
    }
  }

  [
    this.html()
  , this.handlebars()
  , this.css()
  , this.javascript()
  ].forEach(add);

  return mergeTrees(output, {overwrite: true});
};


