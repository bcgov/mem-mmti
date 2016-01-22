'use strict';

angular.module('projects')
	// General
	.controller('controllerProjects', controllerProjects)
	// .controller('controllerProjectsFilterBar', controllerProjectsFilterBar)
	.controller('controllerProjectsList', controllerProjectsList)
	.controller('controllerProjectsIntake', controllerProjectsIntake);

// -----------------------------------------------------------------------------------
//
// CONTROLLER: Public Projects Main
//
// -----------------------------------------------------------------------------------
controllerProjects.$inject = ['$state', 'Projects', 'PROJECT_TYPES', 'Authentication'];
/* @ngInject */
function controllerProjects($state, Projects, PROJECT_TYPES, Authentication) {
	var projects = this;

	projects.types = PROJECT_TYPES;

	projects.authentication = Authentication;

	Projects.getProjects().then( function(res) {
		projects.projects = res.data;
	});
	
	// sorting
	projects.panelSort = [
		{'field': 'name', 'name':'Name'},
		{'field': 'status', 'name':'Status'},	
		{'field': 'dateUpdated', 'name':'Date Updated'},
		{'field': 'dateCreate', 'name':'Date Created'}
	];
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Filter Bar
//
// -----------------------------------------------------------------------------------
// controllerProjectsFilterBar.$inject = ['$scope', '$state', 'Projects', '$filter', 'PROJECT_TYPES', 'Authentication'];
// /* @ngInject */
// function controllerProjectsFilterBar($scope, $state, Projects, $filter, PROJECT_TYPES, Authentication) {
// 	var fbc = this;

// 	fbc.types = PROJECT_TYPES;

// 	fbc.filter = null;

// 	$scope.$watch('data', function(newValue) {
// 		if(newValue) {
// 			fbc.data = newValue;
// 		}
// 	});

// 	fbc.updateFilter = function() {
// 		if ( fbc.data.projects) {
// 			fbc.data.projects = $filter('projects')(fbc.filter);
// 		}
// 	};

// }
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Projects
//
// -----------------------------------------------------------------------------------
controllerProjectsList.$inject = ['$scope', '$state', 'Authentication', 'Project'];
/* @ngInject */
function controllerProjectsList($scope, $state, Authentication, Project) {
	var projectList = this;
	
	$scope.$watch('projects', function(newValue) {
		projectList.projects = newValue;
	});



	// when clicking on the schedule view, if there only one activity, just go there.
	projectList.optimizedSelectProject = function(projectId) {

		Project.getProject({id: projectId}).then(function(res) {
			if (res.data.activities.length !== 1) {
				$state.go('project', {id:projectId});
			} else {
				$state.go('activity', {id:res.data.activities[0]._id});
			}
		});	

	};


	projectList.auth = Authentication;	
}
// -----------------------------------------------------------------------------------
//
// CONTROLLER: Projects Intake
//
// -----------------------------------------------------------------------------------
controllerProjectsIntake.$inject = ['$scope', '$state'];
/* @ngInject */
function controllerProjectsIntake($scope, $state) {
	var projectIntakeList = this;

	$scope.$watch('projects', function(newValue) {
		projectIntakeList.projects = newValue;
	});

	projectIntakeList.goToProject = function(projectId) {
		$state.go('eao.project', {id:projectId});
	};
	
}
