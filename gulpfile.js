const {src, dest, watch, series, parallel} = require("gulp");
const less = require("gulp-less");
const path = require("path");
const server = require("browser-sync").create();

const paths = {
    sourceDir: "src",
    buildDir: "dist",
    styles: {
        src: "src/**/less/*.less",
        dest: "build/css"
    },
    html: {
        src: "src/**/html/*",
        dest: "build"
    },
    images: {
        src: "src/**/img/*.{png,jpeg,jpg,svg}",
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
        .pipe(dest(paths.images.src));
    done();
}

function watchFiles() {
    server.init({
        server: paths.buildDir
    });

    watch(paths.styles.src, styles);
    watch(paths.images.src, images);
    watch(paths.html.src, series(html, server.reload));
}

exports.build = series(parallel(styles, html, images), watchFiles);

