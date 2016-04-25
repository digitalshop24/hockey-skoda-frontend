var gulp = require("gulp");
var _ = require("lodash");
var browserify = require("browserify");
var watchify = require("watchify");
var Bundler = require("./bundler.js");
var notify = require('gulp-notify');
var watch = require('gulp-watch');

module.exports = function (config){
    return function(){
        _.each(config.tasks, function(src, task){
            console.log(src + 'task' + [task]);
            gulp.watch(src, [task]);
        });
        var bundler = watchify(browserify({
            entries: config.bundle.src,
            debug: true
        }, watchify.args));
        bundler.on("update", function(){
            try {
                Bundler(bundler, config.bundle)
                .pipe(notify({
                    message: "Bundle updated"
                }));
            }
            catch(err){
                console.log(err);
            }
        });
        try {
            return Bundler(bundler, config.bundle);
        }
        catch(err){
            return gulp;
        }
    };
};
