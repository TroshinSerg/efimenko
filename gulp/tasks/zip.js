import del from 'del';
import zipPlugin from 'gulp-zip';

export const zip = () => {
  del(`./${app.path.rootFolder}.zip`);
  return app.gulp.src(`${app.path.buildFolder}/**/*.*`)
    .pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError(function(err) {
				return {
					title: 'ZIP',
					sound: false,
					message: err.message
				}
			})
    }))
    .pipe(zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest('./'));
}
