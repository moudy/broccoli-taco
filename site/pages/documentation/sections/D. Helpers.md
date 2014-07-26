There are 4 built in helpers. You can add your own by creating a file in `site/helpers`.

`{{css-tags [args]}}`  
This adds fingerprinted site.css and page.css (when available) files to the page. If you only want to include a specific one you can pass in an argument. For example `{{css-tags 'page'}}` would not include the global `site.css` file.

`{{javascript-tags [args]}}`  
Same as the above `css-tags` helper but for the corresponing JavaScript files.

`{{#layout [name]}}{{/layout}}`  
A block helper to wrap content in other markup. The layout file should include `{{{yield}}}` somewhere. If no argument is provided `site/layouts/defauls.hbs` is used. Layouts can be nested inside each other.

`{{#link-to 'page' [attributes]}}Home{{/link-to}}`  
Create a link to a page. This is useful because it makes sure you don't have any broken links.

