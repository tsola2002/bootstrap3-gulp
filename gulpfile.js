//use nodejs's require command to bring in gulp library & assign it to a variable called gulp
var gulp = require('gulp'),
    gutil = require('gulp-util');

gulp.task('log', function(){
    //output piece of text to the console
    gutil.log('Workflows are awesome');
});