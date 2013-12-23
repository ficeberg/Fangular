angular.module('fe0.controllers').controller('conf', function($scope, $log, configFile) {
	configFile.get(function(data){
		$log.log(data);
		$scope.config=data;
	});
});