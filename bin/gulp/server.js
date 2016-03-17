var gulp = require("gulp");
var server = require("our-gulp-server-livereload");

module.exports = function(config){
    return function(){
        return gulp.src(config.publicPath)
        .pipe(server({
            livereload: config.livereload,
            host: config.host,
            port: config.port,
            log: config.log
        }));
    };
};
