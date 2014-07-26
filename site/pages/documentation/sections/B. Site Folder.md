- <span class="icon-folder"></span> **site/**
  - <span class="icon-folder"></span> **helpers/**  
    Handlebars helpers. Each helper should have it's own file that exports a function. The filename is the name of the helper.

  - <span class="icon-folder"></span> **layouts/**  
    Layouts used by the `layout` helper. The file should conatin a `{{{yield}}}`. This is where the page content will be rendered.

  - <span class="icon-folder"></span> **pages/**  
    The pages of the site. See the next section for details.

  - <span class="icon-folder"></span> **partials/**  
    Handlebars partials made avaible in the view (i.e. `{{>header}}`).

  - <span class="icon-file"></span> **data.js**  
    Data made availble to all templates as the site object (i.e. `{{site.name}}`). See the data sesction for more deatils.

  - <span class="icon-file"></span> **site.scss**  
    CSS file included on every page.

  - <span class="icon-file"></span> **site.js**  
    Javascript file included on every page.


