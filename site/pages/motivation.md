### Motivation
It's a [crowded market](https://www.staticgen.com/) – so why another static site generator?

**Speed.** Thanks to [Broccoli](https://github.com/broccolijs/broccoli) re-generating the site is super fast. This makes for a really nice development process, especially when paired with livereload.

**Simplicity.** Each page is a folder. The only required file in a folder is an `index.hbs` file.

The folder can optionally have a `page.scss` and `pages.js` file which get included on that page. The folder can also include a `data.js` file. The value of that file is available in the tmeplate as the `{{page}}` variable.

There is also support for top level site-wide assets (`site.scss`, `site.js`) and data (`{{site}}` in the templates).

**Flexibility.** Each folder (which represents a page) can have a `data.js` (or `data.json`) file. The value of this file becomes the render context for the corresponding `index.hbs` file.

This file can export an object literal or a function that returns an object. You can also return a Promise that resolves to an object allowing you to fetch remote data when the site is generated.

If the retunred value of `data.js` is an array then multiple pages are created for each item in an array.
