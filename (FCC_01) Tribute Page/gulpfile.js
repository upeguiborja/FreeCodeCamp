var gulp = require('gulp');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();

// Build production code 
gulp.task('build-prod', function(){

    gulp.src(['index.html','app.js','style.css'])
        .pipe(replace(/<!--\s*begin:\s*(dev)\s*-->[\s\S]*<!--\s*end:\s*\1\s*-->/gi,''))
        .pipe(replace(/\/\/\s*begin:\s*(dev)\s*[\s\S]*\/\/\s*end:\s*\1\s*/gi,''))
        .pipe(gulp.dest('build/'));
});


// Build development code
gulp.task('build-dev', function(){

    gulp.src(['index.html','app.js','style.css'])
        .pipe(replace(/<!--\s*begin:\s*(prod)\s*-->[\s\S]*<!--\s*end:\s*\1\s*-->/gi,''))
        .pipe(replace(/\/\/\s*begin:\s*(prod)\s*[\s\S]*\/\/\s*end:\s*\1\s*/gi,''))
        .pipe(gulp.dest('dev/'));

});

//  Start server and watch fs
gulp.task('live-dev',['build-dev'], function() {

    browserSync.init({
        server: {
            baseDir: "./dev"
        }
    });
    
    gulp.watch(['index.html','app.js','style.css'],['build-dev'])
    gulp.watch(['./dev/*.*'], ['update'])
});

gulp.task('update', function() {
    browserSync.reload();
});
