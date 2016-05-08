var gulp         = require('gulp');
var jade         = require('gulp-jade');
var sass         = require('gulp-sass');
var ftp          = require('gulp-ftp');
var browserSync  = require('browser-sync');
var watch        = require('gulp-watch');
var reload       = browserSync.reload;

var log = function  (error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build/"
        },
        open: false
    });
});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('jade', function() {
    return gulp.src('jade/**/!(_)*.jade')
        .pipe(jade({
          pretty: true
        })).on('error', log)
        .pipe(gulp.dest('build/'))
        .pipe(reload({stream:true}));
});

gulp.task('upload', function () {
    return gulp.src(['./build/**'])

    .pipe(ftp({
        host: 'ftp6.hostland.ru',
        user: 'host1352868',
        pass: 'yzD@Xz7fMhrOE6',
        remotePath: "/domen6.ru/htdocs/maket"
    }));
});

gulp.task('sass', function () {
    return gulp.src('scss/*.scss')
        .pipe(sass({
            errLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(reload({stream:true}));
});


gulp.task('default', ['jade', 'sass', 'browser-sync'], function () {
    watch(['scss/**/*.scss'], function(){gulp.start('scss')});
    watch(['jade/**/*.jade'], function(){gulp.start('jade')});
});
