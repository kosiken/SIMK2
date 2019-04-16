const gulp = require('gulp')
const sass = require('gulp-sass')
var ts = require("gulp-typescript");
// CSS task
function css() {
    return gulp
        .src("./src/App.scss")
        .pipe(sass({
            outputStyle: "expanded"
        }))
        .on("error", sass.logError)
        .pipe(gulp.dest("./src"));
}
gulp.task('watch', watchFiles)
// Watch files
function watchFiles() {
    gulp.watch("./src/*.scss", css);
}
gulp.task('scripts', function() {
    var tsconfig = require("./tsconfig.json");
    var filesGLob = tsconfig.filesGlob;
    return gulp.src(filesGLob)
        .pipe(ts(tsconfig.compilerOptions))
        .pipe(gulp.dest('lib'));
});