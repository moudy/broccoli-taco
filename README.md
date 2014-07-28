### Installing

Install the command line utility globally via NPM. This makes `broccoli-taco new` available everywhere.
``` sh
npm install -g broccoli-taco
```

### Createing a Site

To create a new site run the `new` command with the folder name as an argument. Then install dependencies and run the development server. Your new site shoud now be available at http://localhost:4200/. You can start adding pages, assets, and data.
``` sh
broccoli-taco new my-site
cd my-site && npm install
broccoli-taco serve
```

### Building a Site

To build your entire site into a folder you can run the `build` command with the destination folder as an argument. To compress assets set the `BROCCOLI_TACO_ENV` variable to `production`.

``` sh
broccoli-taco build dist
# or
BROCCOLI_TACO_ENV=production broccoli-taco build dist
```

See [broccoli-taco.com](http://broccoli-taco.com) for full docs.
