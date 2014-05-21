'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
	beforeEach(module('fe0.controllers'));

	it('should ....', inject(function($controller) {
		//spec body
		var conf = $controller('conf', { $scope: {} });
		expect(conf).toBeDefined();
	}));

	it('should ....', inject(function($controller) {
		//spec body
		var main = $controller('main', { $scope: {} });
		expect(main).toBeDefined();
	}));
});