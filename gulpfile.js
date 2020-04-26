const {src, dest, watch, series, parallel} = require("gulp");
const clean = require("gulp-clean");
const less = require("gulp-less");
const path = require("path");
const server = require("browser-sync").create();

const paths = {
    sourceDir: "src",
    buildDir: "build",
    styles: {
        src: "src/less/style.less",
        dest: "build/css"
    },
    html: {
        src: "src/html/*.html",
        dest: "build"
    },
    images: {
        src: "src/img/*",
        dest: "build/img"
    }
}

function styles(done) {
    src(paths.styles.src)
        .pipe(less())
        .pipe(dest(paths.styles.dest))
        .pipe(server.stream());
    done();
}

function html(done) {
    src(paths.html.src)
        .pipe(dest(paths.html.dest));
    done();
}

function images(done) {
    src(paths.images.src)
        .pipe(dest(paths.images.dest));
    done();
}

function cleanDir(done) {
    src(paths.buildDir + "/*")
        .pipe(clean());
    done();
}

function watchFiles() {
    server.init({
        server: paths.buildDir
    });

    watch(paths.styles.src, styles);
    watch(paths.styles.src, server.reload);
    watch(paths.images.src, images);
    watch(paths.html.src, html);
    watch(paths.html.src, server.reload);
}

exports.build = series(parallel(styles, html, images), watchFiles);

