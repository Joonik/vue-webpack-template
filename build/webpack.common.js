/**
 * Archivo:     build/webpack.common.js
 * Descripción: Archivo de configuración general de webpack
 * Autor:       Armando@Joonik
 * Creado:      Ene 31 / 2018
 */

'use strict';


// Dependencia para manejar rutas
const path = require('path');

// Dependencia para limpiar directorios
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Dependencia para copiar archivos
const CopyWebpackPlugin = require('copy-webpack-plugin');


// Directorio fuente
const srcDir = path.join(__dirname, '..', 'src');

// Directorio de salida
const outDir = path.join(__dirname, '..', 'dist');


// -----------------------------------------------------------------------

module.exports = {
	context: path.resolve(__dirname, '../'),

	// Archivo a compilar (se incluye el polyfill primero para evitar error de regeneratorRuntime)
	entry: [ 'babel-polyfill', './src/index.js' ],

	// Configuración de salida
	output: {
		filename: '[id].js',
		path: outDir
	},

	// Plugins para complementar el proceso de compilación
	plugins: [
		// Se limpia el directorio dist
		new CleanWebpackPlugin([ outDir ], { allowExternal: true }),

		// Se copia el archivo de robots a la carpeta de salida
		new CopyWebpackPlugin([
			{
				from: './src/robots.txt',
				to: outDir
			}
		])
	],

	// Tipos de archivo a buscar en los imports
	resolve: {
		extensions: [ '.js', '.vue', '.json' ],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': srcDir
		}
	},

	// Configuraciones de módulos
	module: {
		rules: [
			// Configuración del retro-compilador de javascript
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [ srcDir ]
			},

			// Configuración del cargador de css
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},

			// Configuración del cargador de archivos estáticos
			{
				test: /\.(png|jpg|gif|svg)$/,
				use: {
					loader: 'file-loader',
					options: { name: 'assets/[name].[ext]' }
				}
			}
		]
	},

	// Configuración adicional
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	}
};
