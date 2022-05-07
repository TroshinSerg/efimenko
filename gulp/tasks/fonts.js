import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

const FontWeight = {
  THIN: 100,
  EXTRALIGHT: 200,
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMOBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
  HEAVY: 800,
  BLACK: 900
};

const convertOtfToTtf = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
    .pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError(function(err) {
				return {
					title: 'FONTS',
					sound: false,
					message: err.message
				}
			})
    }))
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
};

const convertTtfToWoff = () => {
  return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`)
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.massage %>'
      })
    ))
    .pipe(fonter({
      formats: ['woff']
    }))
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
    .pipe(ttf2woff2())
    .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`));
};

const createFontsStyleFile = () => {
  let fontsFile = `${app.path.srcFolder}/scss/common/fonts.scss`;
  fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!fs.existsSync(fontsFile)) {
        fs.writeFile(fontsFile, '', cb);
        let newFileOnly;
        for (let i = 0; i < fontsFiles.length; i++) {
          const fontFileName = fontsFiles[i].split('.')[0];

          if (newFileOnly !== fontFileName) {
            const fontName = fontFileName.split('-')[0] || fontFileName;
            const fontWeightStr = fontFileName.split('-')[1] || 'regular';
            const key = fontWeightStr.toUpperCase();
            const fontWeight = FontWeight[key];

            const fontFaceStr = `@font-face {\n\tfont-family: "${fontName}";\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-style: normal;\n\tfont-weight: ${fontWeight};\n\tfont-display: swap;\n}\r\n\n`;

            fs.appendFile(fontsFile, fontFaceStr, cb);
            newFileOnly = fontFileName;
          }
        }
      }
    } else {
      console.log('Файл scss/common/fonts.scss уже существует. Для обновления файла его нужно удалить.')
    }
  });

  return app.gulp.src(app.path.srcFolder);
  function cb() {};
};

export {
  convertOtfToTtf,
  convertTtfToWoff,
  createFontsStyleFile
}
