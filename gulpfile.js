var gulp = require('gulp');
var scss = require('gulp-sass');
var mincss = require('gulp-clean-css');
gulp.task('scss', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(scss())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'))
})