/**
 * Archivo:     build/webpack.prod.js
 * Descripción: Archivo de configuración de producción de webpack
 * Autor:       Armando@Joonik
 * Creado:      Ene 31 / 2018
 */

'use strict';


// Dependencia para unir configuraciones
const merge = require('webpack-merge');

// Dependencias de webpack para setear variables de entorno y separar código de salida
const webpack = require('webpack');

// Dependencia para crear un index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Dependencia para comprimir el javascript compilado
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Cargar configuración general
const common = require('./webpack.common');


// -----------------------------------------------------------------------

module.exports = merge(common, {
	// Plugins para complementar el proceso de compilación
	plugins: [
		// Definir entorno como producción
		new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),

		// Separar código de desarrollo del código de las dependencias
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: module => {
				return module.context && module.context.indexOf('node_modules') !== -1;
			}
		}),

		// Creación de index.html al cual se insertarán los compilados
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'Plantilla de WebPack',
			favicon: './src/favicon.ico',
			minify: {
				collapseWhitespace: true,
				removeScriptTypeAttributes: true
			}
		}),

		// Comprimir javascript compilado
		new UglifyJsPlugin({
			uglifyOptions: { compress: { warnings: false } },
			parallel: true
		})
	],

	// Configuraciones de módulos
	module: {
		rules: [
			// Cofiguración del cargador de vue
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: { loaders: { scss: 'vue-style-loader!css-loader!sass-loader?outputStyle=compressed' } }
			}
		]
	}
});
