module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		dirs: {},
		banner: '/*!\r\n' +
		' * <%= pkg.title %> <%= build_tag %>\r\n' +
		' * <%= pkg.homepage %>\r\n' +
		' *\r\n' +
		' * Copyright 2015 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\r\n' +
		' * Released under the <%= pkg.license %> license\r\n' +
		' * <%= pkg.licenseUrl %>\r\n' +
		' *\r\n' +
		' * Build Date: <%= grunt.template.today("isoDateTime") %>\r\n' +
		' */\r\n'
	});

	grunt.config("env", grunt.option("env") || process.env.GRUNT_ENV || 'dev');
	grunt.config("bump_type", (grunt.option("bumptype") || process.env.GRUNT_BUMPTYPE || 'patch').toLowerCase()); // patch, minor, major, prerelease, preminor, premajor
	grunt.config("build_label", grunt.config("env").toLowerCase() === 'production' ? '' : '-' + grunt.config("env").toLowerCase());
	grunt.config("build_tag", grunt.config("pkg").version + grunt.config("build_label"));

	grunt.registerTask("refresh-config", "", function () {
		grunt.config("pkg", grunt.file.readJSON('package.json'));
		grunt.config("build_label", grunt.config("env").toLowerCase() === 'production' ? '' : '-' + grunt.config("env").toLowerCase());
		grunt.config("build_tag", grunt.config("pkg").version + grunt.config("build_label"));
	});

	grunt.loadNpmTasks('grunt-git-contributors');
	grunt.config('contributors', {
		master: {
			path: 'AUTHORS.txt',
			branch: 'master',
			chronologically: true
		}
	});

	grunt.loadNpmTasks('grunt-bump');
	grunt.config('bump', {
		files: ['package.json'],
		updateConfigs: [],
		commit: false,
		createTag: false,
		push: false
	});

	grunt.registerTask('build', [
		'contributors:master'
	]);

};
