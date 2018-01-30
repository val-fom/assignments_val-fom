'use strict';

const gulp 					 = require('gulp'),
			sass           = require('gulp-sass'),
			sourcemaps     = require('gulp-sourcemaps'),
			browserSync    = require('browser-sync'),
			notify         = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../sass/'}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch(['app/js/*.js'], browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
