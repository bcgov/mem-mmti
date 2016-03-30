'use strict';

angular.module('topics').run(['Menus',
	function (Menus) {
		Menus.addMenuItem('systemMenu', {
			title: 'Topics',
			state: 'admin.topic.list',
			roles: ['admin']
		});
	}
]);