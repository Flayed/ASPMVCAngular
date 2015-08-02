(function () {
    var app = angular.module('app');

    app.config(homeRouter);

    homeRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    function homeRouter($stateProvider, $urlRouterProvider) {
        // Set up default route
        $urlRouterProvider.otherwise("/");

        // Set up the states
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: "../app/home/home.html"
            });
    }
})();