var gulp = require('gulp');
var path = require('path');

var scsslint     = require('gulp-scss-lint');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

/*------------------------------------------------------------------
    scsslint
------------------------------------------------------------------*/
gulp.task('scsslint', function() {

    return gulp
        .src([
            'src/sass/**/*.scss',
            '!src/sass/layout/_style-normalize.scss',
            '!src/sass/setup/_sprites.scss',
        ])
        .pipe(scsslint())
    ;

});

/*------------------------------------------------------------------
    css生成
------------------------------------------------------------------*/
gulp.task('css', function() {

    return sass('src/sass/', {
            style: 'compact'
        })
        .on('error', function (err) {
            console.error('Error', err.message);
        })
        .pipe(autoprefixer(['last 3 versions', "ie 8"]))
        .pipe(gulp.dest('css/'))
    ;

});

/*------------------------------------------------------------------
    watch
------------------------------------------------------------------*/
gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.scss', ['scsslint', 'css']);
});