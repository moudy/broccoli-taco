The only top level files are `site/`, `Brocfile.js` and `package.json`. You can add others as needed (i.e. `node_modules/`, `bower_components/`).

- <span class="icon-folder"></span> **site/**  
  This folder includes folders and files relevant to the entire site.
  - <span class="icon-folder"></span> **helpers/**  
    Handlebars helpers. Each helper should have its own file that exports a function. The filename is the name of the helper.

  - <span class="icon-folder"></span> **layouts/**  
    Layouts used by the `layout` helper. The file should contain a `{{{yield}}}`. This is where the page content will be rendered.

  - <span class="icon-folder"></span> **pages/**  
    The pages of the site. See the next section for details.

  - <span class="icon-folder"></span> **partials/**  
    Handlebars partials made available in the view (i.e. `{{>header}}`).

  - <span class="icon-folder"></span> **static/**  
    This folder is copied over as-is.

  - <span class="icon-file"></span> **data.js**  
    Data made available to all templates as the site object (i.e. `{{site.name}}`). See the data section for more details.

  - <span class="icon-file"></span> **site.scss**  
    CSS file included on every page.

  - <span class="icon-file"></span> **site.js**  
    JavaScript file included on every page.

- <span class="icon-file"></span> **Brocfile.js**  
  Configure options here

- <span class="icon-file"></span> **package.json**  
  Declare you dependencies here like any other Node project.
