import versionNumber from 'gulp-version-number';
import gulpPug from 'gulp-pug';
import {htmlValidator} from 'gulp-w3c-html-validator';

export const pug = () => {
  return app.gulp.src(app.path.src.pug)
    .pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError(function(err) {
				return {
					title: 'PUG',
					sound: false,
					message: err.message
				}
			})
    }))
    .pipe(gulpPug({
      pretty: true,
      verbose: true
    }))
    .pipe(app.plugins.if(app.isBuild, versionNumber({
      value: '%DT%',
      append: {
        key: '_v',
        cover: 0,
        to: [
          'css',
          'js',
        ]
      },
      output: {
        file: 'gulp/version.json'
      }
    })))
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
    //.pipe(app.gult.src(app.path.build.html))
    //.pipe(htmlValidator.analyzer())
    //.pipe(htmlValidator.reporter());
}
