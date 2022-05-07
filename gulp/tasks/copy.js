export const copy = () => {
  return app.gulp.src([app.path.src.fonts, app.path.src.files, app.path.src.images], {
      base: app.path.srcFolder
    })
    .pipe(app.gulp.dest(app.path.buildFolder))
}
