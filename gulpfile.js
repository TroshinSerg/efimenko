import gulp from 'gulp';
import {path} from './gulp/config/path.js';
import {plugins} from './gulp/config/plugins.js';

global.app = {
  path: path,
  gulp: gulp,
  plugins: plugins,
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  isWebp: true
};

import {copy} from './gulp/tasks/copy.js';
import {clean} from './gulp/tasks/clean.js';
import {pug} from './gulp/tasks/pug.js';
import {server} from './gulp/tasks/server.js';
import {scss} from './gulp/tasks/scss.js';
import {js} from './gulp/tasks/js.js';
import {images} from './gulp/tasks/images.js';
import {convertOtfToTtf, convertTtfToWoff, createFontsStyleFile} from './gulp/tasks/fonts.js';
import {sprite} from './gulp/tasks/sprite.js';
import {zip} from './gulp/tasks/zip.js';
import {ftp} from './gulp/tasks/ftp.js';
import {generateFavicon} from './gulp/tasks/favicon.js';

const watch = () => {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.pug, pug);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, copy/*images*/);
  gulp.watch(path.watch.icons, sprite);
};

const fonts = gulp.series(convertOtfToTtf, convertTtfToWoff, createFontsStyleFile);
const mainTasks = gulp.series(sprite, gulp.parallel(copy, pug, scss, js, /*images,*/ generateFavicon));
const dev = gulp.series(clean, mainTasks, gulp.parallel(watch, server));
const build = gulp.series(clean, fonts, mainTasks);
const deployZIP = gulp.series(clean, fonts, mainTasks, zip);
const deployFTP = gulp.series(clean, fonts, mainTasks, ftp);

export {build, deployZIP, deployFTP, fonts};

gulp.task('default', dev);
