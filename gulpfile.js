var gulp = require('gulp');
var scss = require('gulp-sass');
gulp.task('scss', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(scss())
        .pipe(gulp.dest('./src/css'))
})