var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var autoprefixer = require("gulp-autoprefixer");
var uglifycss = require("gulp-uglifycss");
var sass = require('gulp-sass');

module.exports = function (config){
    return function(){
        config.forEach(function(styleConfig) {
            return gulp.src(styleConfig.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(uglifycss({
                "max-line-len": 80
            }))
            .pipe(concat(styleConfig.dest))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(styleConfig.publicPath));
        });
    };
};
