"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp = require("gulp"),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  buffer = require("vinyl-buffer"),
  tslint = require("gulp-tslint"),
  tsc = require("gulp-typescript"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  runSequence = require("run-sequence"),
  mocha = require("gulp-mocha"),
  istanbul = require("gulp-istanbul"),
  cucumber = require("gulp-cucumber"),
  browserSync = require('browser-sync').create();

var min_coverage = 70;
//******************************************************************************
//* LINT
//******************************************************************************
gulp.task("lint", function () {

  var config = { formatter: "verbose", emitError: (process.env.CI) ? true : false };

  return gulp.src([
    "server/**/**.ts",
    "client/**.ts",
    "test/**/**/**.step.ts"
  ])
    .pipe(tslint(config))
    .pipe(tslint.report());

});

//******************************************************************************
//* BUILD
//******************************************************************************
var tsProjectServer = tsc.createProject("tsconfig.json");
var tsProjectClient = tsc.createProject("tsconfig.json");

gulp.task("build-server", function () {
  return gulp.src([
    "server/**/**.ts",
    "typings/main.d.ts/",
    "server/interfaces/interfaces.d.ts"
  ])
    .pipe(tsProjectServer())
    .on("error", function (err) {
      process.exit(1);
    })
    .js.pipe(gulp.dest("server/"));
});

gulp.task("build-client", function () {
  return gulp.src([
    "client/**/**.ts",
    "typings/main.d.ts/"
  ])
    .pipe(tsProjectClient())
    .on("error", function (err) {
      process.exit(1);
    })
    .js.pipe(gulp.dest("client/"));
});

var tsTestProject = tsc.createProject("tsconfig.json");

gulp.task("build-test", function () {
  return gulp.src([
    "test/**/**/*.step.ts",
    "typings/main.d.ts/",
    "server/interfaces/interfaces.d.ts"
  ])
    .pipe(tsTestProject())
    .on("error", function (err) {
      process.exit(1);
    })
    .js.pipe(gulp.dest("test/"));
});

gulp.task("build", function (cb) {
  runSequence(["build-server", "build-client", "build-test"], cb);
});

//******************************************************************************
//* TEST
//******************************************************************************
gulp.task("istanbul:hook", function () {
  return gulp.src(['server/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire())
    .pipe(istanbul.enforceThresholds({ thresholds: { global: min_coverage } }))
    .on("error", function (err) {
      process.exit(1);
    });
});

gulp.task("test", ["istanbul:hook"], function () {
  return gulp.src("test/**/*.feature")
    .pipe(cucumber({
      "steps": "test/features/**/*.js",
      "format": "pretty"
    }))
    .pipe(istanbul.writeReports())
    .on("error", function (err) {
      process.exit(1);
    })
    .once('end', function () {
      process.exit();
    });
});

//******************************************************************************
//* DEV SERVER
//******************************************************************************
gulp.task("watch", ["default"], function () {

  browserSync.init({
    server: "."
  });

  gulp.watch(["server/**/**.ts", "test/**/*.ts"], ["default"]);
  gulp.watch("dist/*.js").on('change', browserSync.reload);
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function () {
  runSequence("lint", "build", "test")
});