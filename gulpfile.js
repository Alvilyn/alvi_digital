'use strict'

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cleanCss = require('gulp-clean-css'),
	flatmap = require('gulp-flatmap'),
	htmlmin = require('gulp-htmlmin');
	
gulp.task('sass', function(){
	return gulp.src('./css/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function(){
	gulp.watch('./css/*.scss', gulp.series('sass'));
});

gulp.task('browser-sync', function() {
	var files = ['./*.html', './css/*.css', './img/*.{png, jpg, jpeg, gif}', './js/*.js']
	browserSync.init(files, {
		server: {
			baseDir: './'
		}
	});
});

gulp.task('default', gulp.parallel('browser-sync', 'sass:watch'));

gulp.task('clean', function(){
	return del(['dist']);
});

gulp.task('copyfonts', function(){
	gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot, otf}*')
	.pipe(gulp.dest('dist/images'));
})

gulp.task('imagemin', function(){
	return gulp.src('./images/*')
	.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
	.pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', function(){
	return gulp.src('./*.html')
		.pipe(flatmap(function(stream, file){
			return stream.pipe(usemin({
					css: [rev()],
					html: [
						function() { return htmlmin({collapseWhitespace: true});
						},
					],
					js: [uglify(), rev()],
					inlinejs: [uglify()],
					inlinecss: [cleanCss(), 'concat']
				})
			);
		})
		)
		.pipe(gulp.dest('dist/'));
});

gulp.task('uglify', function() {
    gulp.src('./*.html', './css/*.css', './images/*.{png, jpg, jpeg, gif}', './js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/*.html', 'dist/css', 'dist/images/*.{png, jpg, jpeg, gif}', 'dist/js'));
});

gulp.task('build', gulp.parallel('clean', gulp.series('copyfonts', 'imagemin', 'usemin')));

