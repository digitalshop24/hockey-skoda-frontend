var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var autoprefixer = require("gulp-autoprefixer");
var uglifycss = require("gulp-uglifycss");
var sass = require('gulp-sass');
var bulkSass = require('gulp-sass-bulk-import');
var rename = require('gulp-rename');

module.exports = function (config) {
    return function(){
        return gulp.src(config[0].srcFile)
            .pipe(sourcemaps.init())
            .pipe(bulkSass())
            .pipe(sass({
                // outputStyle: 'compressed',
                includePaths: ['src/resources/css/']
            }).on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(uglifycss())
            .pipe(rename('app.min.css'))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest('./public/'));
    }
};
