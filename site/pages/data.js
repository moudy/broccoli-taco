module.exports = {
  tagline: 'Static Sites Powered by Broccoli'
, checklistItems: [
    'Dynamicaly generated pages based on data'
  , 'Handlebars templates, layouts, partials, helpers'
  , 'SCSS, Browserify &amp; asset fingerprinting'
  ]
, summary: {
    heading: 'Create data-driven static sites.'
  , body: 'Broccoli Taco is designed to create data-driven sites with no database. Pages can pull in data (synchronously or asynchronously via promises) at build time. Arrays of data will generate a page for each item allowing you to generate an arbitrary number of pages.'
  }
, points: [
    {
      heading: 'Fast'
    , body: 'Thanks to [Broccoli](https://github.com/broccolijs/broccoli) re-generating the site is super fast. This makes for a really nice development process, especially when paired with livereload.'
    }
  , {
      heading: 'Simple'
    , body: 'Each page is a folder. The only required file in a folder is an `index.hbs` file. The folder can also include `data.js`, `page.js` and `page.css` files.'
    }
  , {
      heading: 'Flexible'
    , body: 'Define data for pages as functions, Promises or JSON files. Create helpers and partials to fit your needs. Provide global and page specific assets.'
    }
  ]
};
