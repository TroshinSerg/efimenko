import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './build'; // Также можно использовать rootFolder
const srcFolder = './src';

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
    favicon: `${buildFolder}/images/favicon`,
  },
  src: {
    js: `${srcFolder}/js/main.js`,//[`${srcFolder}/js/main.js`, `${srcFolder}/js/vendor.js`],
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: `${srcFolder}/scss/main.scss`,
    pug: `${srcFolder}/pug/pages/*.pug`,
    files: `${srcFolder}/files/**/*.*`,
    fonts: `${srcFolder}/fonts/**/*.{woff,woff2}`,
    icons: `${srcFolder}/icons/**/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    pug: `${srcFolder}/pug/**/*.pug`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,svg,ico,gif,webp}`,
    files: `${srcFolder}/files/**/*.*`,
    icons: `${srcFolder}/icons/**/*.svg`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: 'demo'
};
