'use strict';

const gulp 					 = require('gulp'),
			sass           = require('gulp-sass'),
			browserSync    = require('browser-sync'),
			concat         = require('gulp-concat'),
			uglify         = require('gulp-uglify'),
			cleanCSS       = require('gulp-clean-css'),
			rename         = require('gulp-rename'),
			del            = require('del'),
			cache          = require('gulp-cache'),
			autoprefixer   = require('gulp-autoprefixer'),
			notify         = require("gulp-notify");

/*gulp.task('scripts', function() {
	return gulp.src('app/js/script.js')
	// // // .pipe(concat('script.min.js')) // - if there are more then one js file
	// .pipe(rename({suffix: '.min', prefix : ''})) // - if ther is only 1 js file
	// .pipe(uglify())
	// .pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});*/

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass().on("error", notify.onError()))
	// .pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	// .pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass'/*, 'scripts'*/, 'browser-sync'], function() {
	gulp.watch('app/sass/*.sass', ['sass']);
	// gulp.watch(['app/js/script.js'], ['scripts']);
	gulp.watch(['app/js/*.js'], browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
