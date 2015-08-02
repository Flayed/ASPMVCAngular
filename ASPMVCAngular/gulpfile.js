// Include gulp
var gulp = require('gulp');

// Include plugins
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');

// Switching variables.  Set these on the build tasks to enable/disable certain actions
var argv = {
    debug: false,
    development: false,
    production: false
};

// For Builds
gulp.task('Debug', function () {
    argv.debug = true;
    runSequence('jsLib', 'jsCombine-home');
});
gulp.task('Development', function () {
    argv.development = true;
    runSequence('jsLib', 'jsCombine-home');
});
gulp.task('Production', function () {
    argv.production = true;
    runSequence('jsLib', 'jsCombine-home');
});

// Watch for changes and call gulp tasks accordingly
gulp.task('watch', function () {
    gulp.watch(['app/**/*.js'], ['jsCombine-home']);
});

gulp.task('jsLib', function () {
    return gulp.src([
        '../node_modules/angular/angular.js',
        '../node_modules/angular-animate/angular-animate.js',
        '../node_modules/angular-ui-router/release/angular-ui-router.js',        
    ])
    .pipe(gulp.dest('app/assets/lib'));
});

var combine = function (name, additionalScriptArray) {
    var sources = [
        // Angular
        'app/assets/lib/angular.js',
        'app/assets/lib/angular-ui-router.js',
        'app/assets/lib/angular-animate.js',
        // Other Third Party Libs        
        // First Party Libs
        (argv.production ? 'app/common/config/prod.js' : 'app/common/config/dev.js')
    ];
    console.log("Additional scripts:");
    console.log(additionalScriptArray);
    if (additionalScriptArray && additionalScriptArray.length) {
        sources = sources.concat(additionalScriptArray);
    }
    console.log(sources);
    return gulp.src(sources)
    .pipe(concat(name + '.js'))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('app/assets/scripts/' + name));
}

gulp.task('jsCombine-home', function () {
    return combine('home', [
        'app/home/homeController.js',
        'app/home/*.js!(homeController.js)'
    ]);
});