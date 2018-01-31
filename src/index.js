/**
 * Archivo:     src/index.js
 * Descripción: Archivo principal de la aplicación
 * Autor:       Armando@Joonik
 * Creado:      Ene 31 / 2018
 */

'use strict';

import Vue from 'vue'

import App from './App'

// Configurar aplicación
new Vue({
	el: '#app',
	template: '<App/>',
	components: { App }
});
