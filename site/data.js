var pkg = require('../package.json');

module.exports = function () {
  return {
    title: 'Broccoli Taco'
  , githubUrl: 'https://github.com/moudy/broccoli-taco'
  , version: pkg.version
  };
};
