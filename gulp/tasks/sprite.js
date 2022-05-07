import svgSprite from 'gulp-svg-sprite';

export const sprite = () => {
  return app.gulp.src(app.path.src.icons)
    .pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError(function(err) {
				return {
					title: 'SPRITE',
					sound: false,
					message: err.message
				}
			})
    }))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
          example: app.isDev
        }
      }
    }))
    .pipe(app.gulp.dest(app.path.build.images));
};
