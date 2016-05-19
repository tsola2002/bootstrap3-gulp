//use nodejs's require command to bring in gulp library & assign it to a variable called gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    less = require('gulp-less');

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

//less files that need to be processed

var lessSources = ['components/less/bootstrap.less'];

//html files that need to be processed

var htmlSources = ['builds/development/*.html'];

gulp.task('less', function(){
    //specify where less files are located
    gulp.src(lessSources)
        .pipe(less())
        //spit log message if there are any errors
        .on('error', gutil.log)
        //output final file to destination folder
        .pipe(gulp.dest('builds/development/css'))
        //do a reload on the server
        .pipe(connect.reload())
});


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
        //do a reload on the server
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    //when any lessSources file changes run less method
    gulp.watch(lessSources, ['less']);
    //when any jsSources file changes run combine-js method
    gulp.watch(jsSources, ['combine-js']);
    //when any file with a .less extension changes, we run the less task
    gulp.watch('components/less/*.less', ['less']);
    //when any html file changes do a livereload
    gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', function() {
    //use connect variable's of the server method to create a server
    connect.server({
        //specify the root of your application
        root: 'builds/development/',
        //turn on livereload feature
        livereload: true
    });
});

gulp.task('html', function() {
    //set input sources to html files
    gulp.src(htmlSources)
        //pipe the sources to livereload
        .pipe(connect.reload())
});





//custom gulp task to run all tasks
gulp.task('default', ['html', 'less', 'combine-js','log', 'connect', 'watch']);
