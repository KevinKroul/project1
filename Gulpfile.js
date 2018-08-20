"use strict";

const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const less = require('gulp-less');



gulp.task('less', function() {
    return gulp.src("assets/styles/main.less")
        .pipe(less())
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