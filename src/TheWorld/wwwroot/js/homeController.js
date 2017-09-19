//(function () {
//    "use strict";

//    angular.module("app-home")
//        .controller("homeController", homeController);


//    function homeController($scope) {
//        var vm = this;
//        vm.name = "Unicorn";
//        $scope.text = "";
//    }
//})();


var app = angular.module('app-home', []);
app.controller('homeController', function ($scope) {
    $scope.text = "";
})
    .directive('plkrFileDropZone', [function () {
        return {
            restrict: 'EA',
            scope: { content: '=' },
            link: function (scope, element, attrs) {

                scope.content = "drop a .txt file here";

                var processDragOverOrEnter;

                processDragOverOrEnter = function (event) {
                    if (event !== null) {
                        event.preventDefault();
                    }
                    event.originalEvent.dataTransfer.effectAllowed = 'move';
                    return false;
                };

                element.bind('dragover', processDragOverOrEnter);
                element.bind('dragenter', processDragOverOrEnter);
                element.bind('drop', handleDropEvent);

                function insertText(loadedFile) {

                    scope.content = loadedFile.target.result;
                    var text = scope.content;
                    splitString(text);
                    console.log("text",text);
                    scope.$apply();
                }

                function handleDropEvent(event) {

                    if (event !== null) {
                        event.preventDefault();
                    }
                    var reader = new FileReader();
                    reader.onload = insertText;
                    reader.readAsText(event.originalEvent.dataTransfer.files[0]);
                }
                function splitString(txt) {
                    var arr = txt.replace("\n","").split("\n");
                    console.log("string array", arr);
                }
                
            }
        }
    }]);