var gulp = require("gulp");
const { series } = require('gulp');
var less = require("gulp-less");
var base64 = require("gulp-base64");
var rename = require("gulp-rename");
var gReplace = require("gulp-replace");

var DIST_PATH = './';
var SRC_PATH = './src'
var IMG_VERSION = '2.0'

// view2html
gulp.task("view2html", function (done) {
  gulp
    .src(SRC_PATH + "/**/*.wxml")
    .pipe(gReplace(/@imgVersion/g, IMG_VERSION))
    .pipe(gulp.dest(DIST_PATH));

  console.log('更新HTML!');
  done();
});


gulp.task("webpack", function (done) {
  gulp
    .src(SRC_PATH + "/**/*.js")
    .pipe(gReplace(/@imgVersion/g, IMG_VERSION))
    .pipe(gulp.dest(DIST_PATH));
  
  gulp
    .src(SRC_PATH + "/**/*.json")
    .pipe(gulp.dest(DIST_PATH));

    console.log('更新JS!');
  done();
});

gulp.task("less2css", function (done) {
  gulp
    .src(SRC_PATH + "/**/*.less")
    .pipe(less())
    .pipe(gReplace(/@imgVersion/g, IMG_VERSION))
    .pipe(base64({
      baseDir: './src/src/',
      exclude:    [/http|https|HTTP|HTTPS/],
      maxImageSize: 5000 * 1024, // bytes
      debug: true
    }))
    .pipe(
      rename({
        extname: ".wxss"
      }))
    .pipe(gulp.dest(DIST_PATH));
  console.log('打包图片，更新less!');
  done();
});


//延迟 执行vm-to-html命令， 如果实时执行 html无法刷新
gulp.task("browserSync-watch", series("less2css", function (done) {
  setTimeout(function () {
    done();
  }, 1000);
}));

gulp.task("view-watch", series("view2html", function (done) {
  setTimeout(function () {
    done();
  }, 1000);
  
}));

gulp.task("wapack-watch", series("webpack", function (done) {
  setTimeout(function () {
    done();
  }, 1000);
  
}));

gulp.task("json-watch", series("webpack", function (done) {
  setTimeout(function () {
    done();
  }, 1000);
}));

function start_server(done) {

  gulp.watch([SRC_PATH + "/**/*.less"], series(["browserSync-watch"]));

  gulp.watch([SRC_PATH + "/**/*.wxml"], series(["view-watch"]));

  gulp.watch([SRC_PATH + "/**/*.js"], series(["wapack-watch"]));

  gulp.watch([SRC_PATH + "/**/*.json"], series(["wapack-watch"]));

  console.log('服务启动!');

  done();
}
// 静态服务器 + 监听 less/html 文件
gulp.task("server", series(["less2css", "view2html", "webpack"], start_server));



gulp.task("default", series(["server"]));