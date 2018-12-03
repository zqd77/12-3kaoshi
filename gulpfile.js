var gulp = require('gulp');
var scss = require('gulp-sass');
var mincss = require('gulp-clean-css');
var server = require('gulp-webserver');
gulp.task('scss', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(scss())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 8000,
            // open: true,
            middleware: function(req, res, next) {
                var pathname = require('url').parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                if (pathname === '/') {
                    res.end(require('fs').readFileSync(require('path').join(__dirname, 'src', 'index.html')))
                } else {
                    res.end(require('fs').readFileSync(require('path').join(__dirname, 'src', pathname)))
                }
            }
        }))
})
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'))
})