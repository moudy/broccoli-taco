Each folder within `site/pages/` represents a page. Folders can conatain other folders of pages. `site/pages` is the first page folder making it the index page (i.e. http://broccoli-taco.com/). To add a page (i.e. http://broccoli-taco.com/documentation/) you would create `site/pages/documentation/index.hbs`.

- <span class="icon-folder"></span> **site/pages/**
  - <span class="icon-file"></span> **index.hbs**  
    The Handlebars template for the page. Here you can render partials, use helpers and access the global `{{site}}` object and the page specific `{{page}}` object. This is the only required file for a page folder.

  - <span class="icon-file"></span> **page.scss**  
    A SCSS file that gets compiled to CSS and included on the page. Useful if you have CSS only relevant to that specific page.

  - <span class="icon-file"></span> **page.js**  
    A JavaScript file that gets Browserified. Useful if you have JavaScript only relevant to that specific page.

  - <span class="icon-file"></span> **data.(js|json)**  
    The data provided by this file is exposed to the Handlebars template as the `{{page}}` object. It can be a JSON object, object literal, or a function returning a value or Promise. If an array is returned, a page for each item in the array is generated allowing you to use the same `index.hbs` template with a set of data (like a list of blog posts).

  - <span class="icon-folder"></span> **documentation/**  


