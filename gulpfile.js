const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const postcss = require('gulp-postcss');
const mqpacker = require('css-mqpacker');

sass.compiler = require('node-sass');

const scssFiles = [
  './scss/style.scss'
];

function styles(){
  return gulp.src(scssFiles)
              .pipe(sass().on('error', sass.logError))
              .pipe(postcss([
                autoprefixer({
                    browsers: [
                      'last 2 version',
                      'last 7 Chrome versions',
                      'last 10 Opera versions',
                      'last 7 Firefox versions'
                    ]
                }),
                mqpacker({sort: true}),
              ]))
              .pipe(cleanCSS())
              .pipe(gulp.dest('./'));
}

function watch(){
  gulp.watch('./scss/style.scss', styles);
}

gulp.task('sass:watch', watch);





