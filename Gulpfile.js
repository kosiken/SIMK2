const gulp = require('gulp')
const sass = require('gulp-sass')
var ts = require("gulp-typescript");
// CSS task
function css() {
    return gulp
        .src(['./src/index.scss',"./src/*/*.scss"])
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .on("error", sass.logError)
        .pipe(gulp.dest("./src"));
}
gulp.task('watch', watchFiles)
// Watch files
function watchFiles() {
    gulp.watch(["./src/*.scss", "./src/*/*.scss"], css);
}
gulp.task('scripts', function () {
    var tsconfig = require("./tsconfig.json");
    var filesGLob = tsconfig.filesGlob;
    return gulp.src(filesGLob)
        .pipe(ts(tsconfig.compilerOptions))
        .pipe(gulp.dest('src'));
});