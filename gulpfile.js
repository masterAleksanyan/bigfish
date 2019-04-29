const gulp = require('gulp');
const sass = require('gulp-sass');
//const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
//const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const scssFiles = [
  './src/scss/style.scss'
];

function styles(){
  return gulp.src(scssFiles)
              .pipe(sass().on('error', sass.logError))
//              .pipe(concat('style.css'))
              .pipe(autoprefixer({
                  browsers: ['> 0.1%'],
                  cascade: false
              }))
              .pipe(cleanCSS())
              .pipe(gulp.dest('./'));
//              .pipe(browserSync.stream());
}

function watch(){
//  browserSync.init({
//      server: {
//          baseDir: "./"
//      },
//      tunnel: true
//  });
  
  gulp.watch('./src/scss/**/*.scss', styles);
//  gulp.watch('./*.html', browserSync.reload);
}

gulp.task('sass:watch', watch);





