var gulp = require("gulp");

module.exports = function(config, tasks){
    tasks.forEach(function(task){
        gulp.task(task, require("./" + task + ".js")(config[task]));
    });
    return gulp;
};
