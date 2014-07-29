Conguring the site happens in the top-level `Brocfile.js`. There is currenly 1 option to configure, which is the `basePath`.  The following configuration could be used to serving the site at a path (i.e. http://other-site.com/docs) instead of the root path. This makes sure assets and link-to helpers render with the correct url.

```
var Site = require('broccoli-taco');
var site = new Site();

site.basePath = 'docs';

module.exports = site.toTree();
```
