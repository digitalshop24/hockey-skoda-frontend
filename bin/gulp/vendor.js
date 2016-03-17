var gulp = require("gulp");
var concat = require("gulp-concat");

module.exports = function (config){
    return function(){
        return gulp.src(config.src)
        .pipe(concat(config.dest))
        .pipe(gulp.dest(config.publicPath));
    }
};
