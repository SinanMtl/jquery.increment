/* global module, require*/
'use strict';
module.exports = function (grunt){
	grunt.file.defaultEncoding = 'utf-8';
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		development : 'build/',
		production : 'dist/',
		tag: {
		  banner: '/*!\n' +
		          ' * <%= pkg.title %>\n' +
		          ' * <%= pkg.url %>\n' +
		          ' * @author <%= pkg.author %>\n' +
		          ' * @version <%= pkg.version %>\n' +
		          ' * Copyright <%= pkg.copyright %>. Licensed under the <%= pkg.license %> License (LICENSE.txt).\n' +
		          ' */\n'
		},
		jade : {
			compile: {
				options: {
					pretty : true
				},
				files : {
					'<%= production %>index.html' : ['<%= development %>templates/pages/index.jade']
				}
			}
		},
		sass: {
			dist: {
				options: {
					style: 'compressed',
					noCache: true,
					sourcemap : 'auto'
				},
				files: {
					'<%= production %>css/<%= pkg.name %>.css': '<%= development %>sass/<%= pkg.name %>.scss'
				}
			}
		},
		uglify : {
			options : {
				banner : '<%= tag.banner%>'
			},
			custom : {
				files : {
					'<%= pkg.name%>.min.js' : ['<%= pkg.name %>.js'],					
				}
			}		
		},
		watch: {
			template : {
				files: ['<%= development %>templates/**/*.jade'],
				tasks: ['jade']
			},
			js : {
				files: ['<%= pkg.name%>.js'],
				tasks: ['uglify:custom']
			},
			css: {
				files: ['<%= development %>sass/*.scss'],
				tasks: ['sass']
			}
		}
	});

	// Burada yüklenecek grunt plugin'lerini ekliyoruz
	/**
	 * Load Grunt plugins
	 */
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.registerTask('default', ['jade', 'sass', 'uglify', 'watch']);
};