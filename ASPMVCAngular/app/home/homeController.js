(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])
        .controller('homeController', homeController);

    homeController.$inject = []; 

    function homeController() {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Home';

        activate();

        function activate() { }
    }
})();
