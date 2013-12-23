angular.module('fe0.controllers').config(function ($translateProvider) {
	$translateProvider.translations('en', {
		TITLE: 'Fangular',
		USERNAME: 'Username',
		LANGUAGE: 'Language',
		LOGOUT: 'Logout',
		OPTION_LANG_EN: 'English',
		OPTION_LANG_TW: '繁體中文',

		SELECT_ALL: 'ALL',
		SELECT_NONE: 'NONE',
		SORT_BY: 'Sort by',
		NAME: 'Name',
		SIZE: 'Size',
		TIME: 'Time',
		TYPE: 'Type'

	});
});