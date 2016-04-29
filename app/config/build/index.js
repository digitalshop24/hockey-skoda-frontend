var path = require("path");

var publicPath = "public/";
var vendor = require("./vendor.json");

var sources = {
    src: "src/index.js",
    dest: "app.min.js"
};

var styles = {
    srcFile: "src/resources/css/style.scss",
    src: "src/**/*.scss",
    dest: "app.min.css"
};

var images = {
    "src": [
        "src/**/*.png",
        "src/**/*.jpeg",
        "src/**/*.jpg",
        "src/**/*.gif",
        "src/**/*.ico",
        "src/**/*.svg"
    ],
    dest: "img/"
};

var fonts = {
    src: "src/resources/fonts/**/*",
    dest: "fonts/"
};

module.exports = {
    mode: 'prod',
    pack: {
        src: sources.src,
        dest: sources.dest,
        publicPath: publicPath
    },
    styles: [
        {
            src: styles.srcFile,
            srcFile : styles.srcFile,
            dest: styles.dest,
            publicPath: publicPath
        },
        {
            src: vendor.styles.src,
            dest: vendor.styles.dest,
            publicPath: publicPath
        }
    ],
    resources: {
        images: {
            src: images.src,
            dest: images.dest,
            publicPath: publicPath
        },
        fonts: [
            {
                src: fonts.src,
                dest: fonts.dest,
                publicPath: publicPath
            },
            {
                src: vendor.fonts.src,
                dest: fonts.dest,
                publicPath: publicPath
            }
        ]
    },
    server: {
        host: '0.0.0.0',
        port: '5555',
        livereload: true,
        log: 'debug',
        publicPath: publicPath
    },
    vendor: {
        src: vendor.scripts.src,
        dest: vendor.scripts.dest,
        publicPath: publicPath
    },
    watch: {
        tasks: {
            styles: styles.src
        },
        bundle: {
            src: sources.src,
            dest: sources.dest,
            publicPath: publicPath,
            noMinify: false
        }
    },
    "unit-tests": {
        config: path.join(__dirname, "../tests/karma.conf.js")
    }
};
