"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
// const imageResize = require("gulp-image-resize");
const ejs = require("gulp-ejs");
sass.compiler = require("node-sass");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
// const rename = require("gulp-rename");
// const squoosh = require("gulp-libsquoosh");

function makeCss() {
	return gulp
		// .src(["./src/components/base.scss", "./src/**/*.scss"])
		.src(["./src/style/base.scss", "./src/**/*.scss"])
		.pipe(concat("style.css"))
		.pipe(sass().on("error", sass.logError))
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(cleanCSS({ compatibility: "ie8" }))
		.pipe(gulp.dest("./www/css"));
}

function makePage() {
	return gulp.src("./src/pages/*.html").pipe(ejs()).pipe(gulp.dest("./www"));
}

// function resize(){
//   return gulp.src("./src/content/**/*.{jpg,png}")
//     .pipe(imageResize({
// 			imageMagick: true,
//       width : 640,
//       height : 480,
//       crop : true,
//       upscale : false
//     }))
// 		.pipe(rename(function (path) { path.basename += "-thumbnail"; }))
//     .pipe(gulp.dest('./www/content/resized'));
// };
// function resize() {
// 	return gulp
// 		.src("./src/content/**/*.{jpg,png}")
// 		.pipe(
// 			squoosh(
// 				null, // use default
// 				{
// 					resize: {
// 						enabled: true,
// 						width: 640,
// 					},
// 				}
// 			)
// 		)
// 		.pipe(
// 			rename(function (path) {
// 				path.basename += "-thumbnail";
// 			})
// 		)
// 		.pipe(gulp.dest("./www/content/resized"));
// }

function watch() {
	browserSync.init({
		server: "./www",
	});

	// gulp.watch("./src/**/*.html", makePage);
	gulp.watch("./src/**/*.scss", makeCss);
	// gulp.watch("./src/media/**/*.jpg", resize);
	gulp.watch("./www").on("change", browserSync.reload);
}

module.exports = { watch };
