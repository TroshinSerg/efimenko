import webpackStream from 'webpack-stream';
import webpack from 'webpack';

//console.log(app.isJquery);

export const js = () => {
  return app.gulp.src(app.path.src.js, {sourcemaps: app.isDev})
    .pipe(app.plugins.plumber({
			errorHandler: app.plugins.notify.onError(function(err) {
				return {
					title: 'JS',
					sound: false,
					message: err.message
				}
			})
    }))
    .pipe(webpackStream({
			mode: app.isDev ? 'development' : 'production',
      entry: {
        main: './src/js/main.js',
        vendor: './src/js/vendor.js',
      },
      output: {
        filename: `[name].min.js`
      },
			performance: { hints: false },
			plugins: [new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' })],
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
								plugins: ['babel-plugin-root-import']
							}
						}
					}
				]
			},
			/*optimization: {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: { format: { comments: false } },
						extractComments: false
					})
				]
			},*/
		}, webpack)).on('error', (err) => {
			this.emit('end');
		})
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
}
