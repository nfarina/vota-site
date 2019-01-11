## To run locally:

`bundle exec jekyll serve`

## To auto-refresh the browser when changes are made:

### Install browser-sync:

`npm install -g browser-sync`

### With jekyll serve running, open a new command-line tab and run:

`browser-sync start --proxy "localhost:4000" --files "_site/*.*"`

