var app = angular.module('chatbotApp', ['cgBusy']).directive('showTail', function () {
    return function (scope, elem, attr) {
        scope.$watch(function () {
            return elem[0].value;
        },
        function (e) {
            elem[0].scrollTop = elem[0].scrollHeight;
        });
    }

});

app.controller('HomeController', function($scope,$http) {
    $scope.message = 'Zadaj pytanie  chatbotowi :)';
    $scope.response = "Czat rozpoczety...  \n"

    $scope.answerQuestion = function(){
        console.log ($scope.question);
        //$scope.response = $scope.question+" ojojoj";
        $scope.response += "<TY:>"+$scope.question +"\n";
        var url = 'https://ai-fi-qnamaker.azurewebsites.net/qnamaker/knowledgebases/5588a13f-03f3-4240-996c-c1750d36ecc2/generateAnswer';
        var data = {'question': $scope.question};
        var config={

                    headers:{ 'Authorization':  'EndpointKey <wprowadz klucz z uslugi QnA maker dostepny w portalu Azure>'}
        };
       
       $scope.httpresp =  $http.post(url, data, config).then(function (response) {

            $scope.response +="<CHATBOT:>" + response.data.answers[0].answer+"\n";
            console.log (response);
            $scope.question="";    
        }, function (response) {

            console.log (response);

        });


    }

  });


  