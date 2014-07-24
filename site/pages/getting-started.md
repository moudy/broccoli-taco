### Getting Started

Install the command line utility globally via NPM. This makes `broccoli-taco new` available everywhere.
``` sh
npm install -g broccoli-taco
```

Then create a new site, install dependencies, and run development server.
``` sh
broccoli-taco new my-site
cd my-site && npm install
broccoli-taco serve
```

Your site shoud now be available at http://localhost:4200/. You can start adding pages, assets, and data. To build your entire site into a folder you can run `broccoli-taco build <folder-name>`.

