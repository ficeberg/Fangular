angular.module('fe0.controllers').controller('main', function($scope, $http, $document, $modal, orderByFilter) {

	var url = "http://50.116.42.77:3001//api/bootstrap";
	//iFrame for downloading
	var $iframe = angular.element('<iframe>').css('display','none');
	$document.find('body').append($iframe);

	$scope.showBuildModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'buildModal.html',
			controller: 'SelectModulesCtrl',
			resolve: {
				modules: function() {
					return $http.get(url + "/api/bootstrap").then(function(response) {
						return response.data.modules;
					});
				}
			}
		});

		modalInstance.result.then(function(selectedModules) {
			var downloadUrl = url + "/api/bootstrap/download?";
			angular.forEach(selectedModules, function(module) {
				downloadUrl += "modules=" + module + "&";
			});
			$iframe.attr('src','');
			$iframe.attr('src', downloadUrl);
		});
	};

})