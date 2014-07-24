#### Folder Structure
- **site/helpers/**  
  Handlebars helpers. Each helper should have it's own file that exports a function. The filename is the name of the helper.
- **site/layouts/**  
  Layouts used by the `layout` helper. The file should conatin a `{{{yield}}}`. This is where the page content will be rendered.
- **site/pages/**  
  The pages of the site. See the next section for details.
- **site/partials/**  
  Handlebars partials made avaible in the view (i.e. `{{>header}}`).
- **site/data.js/**  
  Data made availble to all templates as the site object (i.e. `{{site.name}}`). See the data sesction for more deatils.
- **site/site.scss/**  
  CSS file included on every page.
- **site/site.js/**  
  Javascript file included on every page.

Each folder within `site/pages/` represents a page. A folder must contain an `index.hbs` file. It can optioanlly contain a `page.scss`, `page.js`, and `data.js` file. Folders can conatain other folders of pages. `site/pages` is the first page folder making it the index page (i.e. http://broccoli-taco.com/). To add a page (i.e. http://broccoli-taco.com/documentation/) you would create `site/pages/documentation/index.hbs`.
- **site/pages/documentation/index.hbs**  
  The Handlebars template for the page. Here you can render partials, use helpers and access the global `{{site}}` object and the page specific `{{page}}` object. This is the only required file for a page folder.

- **site/pages/documentation/page.scss**  
  A SCSS file that gets compiled to CSS and included on the page. Useful if you have CSS only relevant to that specific page.

- **site/pages/documentation/page.js**  
  A JavScript file that gets Browserified. Useful if you have JavaScript only relevant to that specific page.

- **site/pages/documentation/data.(js|json)**  
  The data provided by this file is exposed to the Handlebars template as the `{{page}}` object. It can be a JSON object, object literal, or a function returning a value or Promise. If an array is returned, a page for each item in the array is generated allowing you to use the same `index.hbs` template with a set of data (like a list of blog posts).

#### Helpers
There are 4 built in helpers. You can add your own by creating a file in `site/helpers`.

`{{css-tags [args]}}`  
This adds fingerprinted site.css and page.css (when available) files to the page. If you only want to include a specific one you can pass in an argument. For example `{{css-tags 'page'}}` would not include the global `site.css` file.

`{{javascript-tags [args]}}`  
Same as the above `css-tags` helper but for the corresponing JavaScript files.

`{{#layout [name]}}{{/layout}}`  
A block helper to wrap content in other markup. The layout file should include `{{{yield}}}` somewhere. If no argument is provided `site/layouts/defauls.hbs` is used. Layouts can be nested inside each other.

`{{#link-to 'page' [attributes]}}Home{{/link-to}}`  
Create a link to a page. This is useful because it makes sure you don't have any broken links.

#### Partials
Partials are located in 'site/partials/' and behave like regular Handlebars partials.

#### Development Server
The development server can be run by running `broccoli-taco server`. It takes the same arguments as the [Broccoli CLI](https://github.com/broccolijs/broccoli-cli)

#### Building The Site
To build your entire site into a folder you can run `broccoli-taco build <folder-name>`.
