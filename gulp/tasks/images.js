import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
  return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError(function(err) {
				return {
					title: 'IMAGES',
					sound: false,
					message: err.message
				}
			})
    }))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(app.plugins.if(app.isBuild && app.isWebp, webp()))
    .pipe(app.plugins.if(app.isBuild && app.isWebp, app.gulp.dest(app.path.build.images)))
    .pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images)))
    .pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images)))
    .pipe(app.plugins.if(app.isBuild, imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      interlaced: true,
      optimizationLevel: 3
    })))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream());
}
