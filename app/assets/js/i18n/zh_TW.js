angular.module('fe0.controllers').config(function ($translateProvider) {
	$translateProvider.translations('tw', {
		TITLE: '梵谷拉',
		USERNAME: '帳號',
		LANGUAGE: '語言',
		LOGOUT: '登出',
		OPTION_LANG_EN: 'English',
		OPTION_LANG_TW: '繁體中文',

		SELECT_ALL: '全選',
		SELECT_NONE: '取消全選',
		SORT_BY: '排序',
		NAME: '名稱',
		SIZE: '大小',
		TIME: '時間',
		TYPE: '類型'

	});
});