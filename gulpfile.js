const fileInclude = require('gulp-file-include');
const { task, src, dest, watch } = require('gulp');
const path = require('path');
const rename = require("gulp-rename");
const prettyHtml = require('gulp-pretty-html');

const templatesPaths = './templates/';

const dataContext = {
  name: 'BitForge[JS]',
  url: 'https://bf-js.github.io/'
}

task('build', function() {
  return src(path.join(templatesPaths, '**', '*.tpl.html'))
    .pipe(fileInclude({ context: dataContext }))
    .pipe(rename({ extname: "" }))
    .pipe(rename({ extname: ".html" }))
    .pipe(prettyHtml({
      indent_size: 2,
      indent_char: ' ',
      unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
    }))
    .pipe(dest('./'))
});

task('default', function() {
  return watch(path.join(templatesPaths, '**', '*'), task('build'));
});
