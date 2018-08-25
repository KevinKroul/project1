"use strict";

const gulp = require("gulp"),
  browserSync = require('browser-sync').create(),
  less = require('gulp-less'),
  autoprefixer = require('gulp-autoprefixer'),
  path     = require("path"),
  svgmin   = require("gulp-svgmin"),
  rename   = require("gulp-rename"),
  inject   = require("gulp-inject"),
  svgstore = require("gulp-svgstore");

gulp.task("svg", () => {
  let svgs = gulp
    .src("./assets/images/icons/*.svg")
    .pipe(svgmin(function (file) {
      let prefix = path.basename(file.relative, path.extname(file.relative));

      return {
        plugins: [
          {
            removeTitle: true
          },
          {
            removeAttrs: {
              attrs: "(fill|stroke)"
            }
          },
          {
            removeStyleElement: true
          },
          {
            cleanupIDs: {
              prefix: prefix + "-",
              minify: true
            }
          }
        ]
      }
    }))
    .pipe(rename({prefix: "icon-"}))
    .pipe(svgstore({inlineSvg: true}));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("index.html")
    .pipe(inject(svgs, {transform: fileContents}))
    .pipe(gulp.dest("./"));
});


gulp.task('less', function() {
    return gulp.src("assets/styles/main.less")
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest("assets/styles"))
        .pipe(browserSync.stream());
});



gulp.task('serve', function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("assets/styles/components/*.less", gulp.series('less'));
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.series('serve'));