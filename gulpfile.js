var config = require("./app/config/build/index.js");
var gulp = require("./bin/gulp/index.js")(config, [
    'resources',
    'pack',
    'server',
    'styles',
    'vendor',
    'watch'
]);

gulp.task('build', ['resources', 'pack', 'styles', 'vendor']);
gulp.task('default', ['resources', 'styles', 'server', 'vendor', 'watch']);
