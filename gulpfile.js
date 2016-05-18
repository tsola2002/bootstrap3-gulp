//use nodejs's require command to bring in gulp library & assign it to a variable called gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');

//javascript files that need to be combined

var jsSources = [
    'components/js/jquery.js',
    'components/js/affix.js',
    'components/js/alert.js',
    'components/js/button.js',
    'components/js/carousel.js',
    'components/js/collapse.js',
    'components/js/dropdown.js',
    'components/js/modal.js',
    'components/js/popover.js',
    'components/js/scrollspy.js',
    'components/js/tab.js',
    'components/js/tooltip.js',
    'components/js/transition.js'
];

gulp.task('log', function(){
    //output piece of text to the console
    gutil.log('Workflows are awesome');
});

gulp.task('combine-js', function() {
    //gather input sources to be concatenated
    gulp.src(jsSources)
        //concatenate js file into a script.js file
        //pipe method will send output of previous function to the function below
        .pipe(concat('bootstrap.js'))
        //run the browserify plugin & install dependencies
        .pipe(browserify())
        //output final file to destination folder
        .pipe(gulp.dest('builds/development/js'))
});
