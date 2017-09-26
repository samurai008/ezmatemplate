var gulp = require('gulp')
// Requires the gulp-sass plugin
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

vendor_files = [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/tether/dist/js/tether.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/bootstrap/js/dist/*.js',
]

gulp.task('bundle-vendor', function() {
    return gulp.src(vendor_files)
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('app/js'))
})

gulp.task('watch', ['browserSync', 'sass'], function (){
     gulp.watch('app/scss/**/*.scss', ['sass']); 
    // Reloads the browser whenever HTML or JS files change
     gulp.watch('app/*.html', browserSync.reload); 
     gulp.watch('app/js/**/*.js', browserSync.reload); 
    // Other watchers
})