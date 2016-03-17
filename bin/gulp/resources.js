var gulp = require("gulp");

module.exports = function (config) {
    return function () {
        gulp.src(config.images.src)
            .pipe(gulp.dest(config.images.publicPath + config.images.dest));
        config.fonts.forEach(function (fontConfig) {
            gulp.src(fontConfig.src)
                .pipe(gulp.dest(fontConfig.publicPath + fontConfig.dest));
        });
        return gulp;
    }
};
