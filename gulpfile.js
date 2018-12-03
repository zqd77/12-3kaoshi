var gulp = require('gulp');
var scss = require('gulp-sass');
var mincss = require('gulp-clean-css');
var server = require('gulp-webserver');
var mergeJs = require('gulp-concat');
var minjs = require('gulp-uglify');
var concat = require('gulp-concat');
//编译scss
gulp.task('scss', function() {
    return gulp.src('./src/scss/index.scss')
        .pipe(scss())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})

//起服务
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
    //监听scss
gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'))
});
//合并压缩js
gulp.task('js', function() {
    return gulp.src('./src/devjs/*.js')
        .pipe(concat('all.js'))
        .pipe(minjs())
        .pipe(gulp.dest('./src/js'))

});
gulp.task('copy', function() {
        return gulp.src('./src/devjs/libs/*.js')
            .pipe(gulp.dest('./src/js/libs'))
    })
    //开发环境
gulp.task('dev', gulp.series('scss', 'server', 'watch'));