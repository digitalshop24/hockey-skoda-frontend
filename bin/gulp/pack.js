var browserify = require("browserify");
var Bundler = require("./bundler.js");

module.exports = function(config){
    return function(){
        var bundler = browserify(config.src);
        return Bundler(bundler, config);
    };
};
