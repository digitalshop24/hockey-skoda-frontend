var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var browserify = require("browserify");
var gutil = require("gulp-util");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var ngAnnotate = require("gulp-ng-annotate");
var uglify = require("gulp-uglify");
var generalConfig = require("../../app/config/build/index");

module.exports = function (bundler, config) {
    var bundle = bundler
        .bundle()
        .on("error", function (e) {
            gutil.log(e);
        })
        .pipe(source(config.dest))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: generalConfig.mode == 'dev'}))
        .pipe(ngAnnotate());

    /*if (!config.noMinify) {
        bundle.pipe(uglify({mangle : false}));
    }*/

    bundle
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.publicPath));
};
