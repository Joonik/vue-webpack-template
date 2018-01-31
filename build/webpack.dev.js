/**
 * Archivo:     build/webpack.dev.js
 * Descripción: Archivo de configuración de desarrollo de webpack
 * Autor:       Armando@Joonik
 * Creado:      Ene 31 / 2018
 */

'use strict';


// Dependencia para unir configuraciones
const merge = require('webpack-merge');

// Dependencia para crear un index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Dependencia de webpack para plugins adicionales
const webpack = require('webpack');

// Cargar configuración general
const common = require('./webpack.common');


// -----------------------------------------------------------------------

module.exports = merge(common, {
	// Plugins para complementar el proceso de compilación
	plugins: [
		// Creación de index.html al cual se insertará el compilado
		new HtmlWebpackPlugin({
			template: './src/index.html',
			title: 'Plantilla de WebPack',
			favicon: './src/favicon.ico'
		}),

		// Plugin necesario para el servidor de desarrollo
		new webpack.HotModuleReplacementPlugin(),

		// Plugin para que el anterior arroje las rutas correctas en la consola
		new webpack.NamedModulesPlugin()
	],

	// Configuración para el servidor de desarrollo
	devServer: {
		inline: true,
		hot: true,
		clientLogLevel: 'warning',
		historyApiFallback: true,
		compress: true,
		open: true,
		watchOptions: { poll: false },
		overlay: {
			warnings: false,
			errors: true
		}
	},

	// Configuraciones de módulos
	module: {
		rules: [
			// Cofiguración del cargador de vue
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	}
});
