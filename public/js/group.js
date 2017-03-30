// todo.js
var app = angular.module('digitalbutler');
//
// handle groups  and members
//

app.controller('groupsController',['$rootScope','$scope', '$http', '$location', function groupsController($rootScope, $scope, $http, $location) {
        var groupMap=[];
    var roleMap=[];
    var groupList={};
     // sub-group with parent group not implemented yet.
     $scope.groupSchema = {
          "type": "object",
          "title": "TODO",
          "properties": {
             
              "name": {"type": "string"},
              "role" :{ "type": "string" },
              "alias": { "type": "string" }
            },
        "required": ["name"]
        };
    $scope.addGroup = function (group,form) {
         $http.post('/api/groups', group).success(function(data) {
                                
                  $rootScope.alert.msg="OK. Now, you can invite people to join group "+data[0].name;
                  $rootScope.alert.type="info";
                  $location.path("/groups");
                }).error(function(data) {
                  console.log('Error: ' + data);
                  $scope.alert.msg=data.message;
                });
        
    }
    $scope.addGroupForm = [
      
                  {
                        "title": "What is the group name  " ,
                        "key": "name" 
                   },
   
                    {
                        "title": "What will be your role in this group ?" ,
                        "key": "role"
                        
                    },
                    {
                        "title": "You will known as ... " ,
                        "key": "alias"
                    },

                    {
                      type: "actions",
                      condition:"true",
                      items: [
                      
                        { type: "submit", title: "Confirm", style: "btn-info"}

                      ]
                    }
               ]    

    $scope.group = {};
    $scope.showResult=false;
    $scope.grouplist=[];
    $scope.groupdetailslist=[];
    $scope.currentgroup=undefined;
    $scope.addGroupFormVisible = false;
    if (($rootScope.parsing!=undefined) && ($rootScope.parsing.attributes.name != undefined)) {
      $scope.group.name = $rootScope.parsing.attributes.name.toUpperCase();
      
    }
    // when landing on the page, get all todos and show them
    $scope.getGroupsInfo = function() {
        $http.get('/api/groups')
            .success(function(data) {
                $scope.grouplist = data;
                if (($rootScope.alert.msg==undefined) || ($rootScope.alert.msg=="")) {
                  if ($scope.grouplist.length==0) {
                    $rootScope.alert.msg="You don't have any group. You may start create one.";
                  } else {

                    $rootScope.alert.msg="you are involved in "+($scope.grouplist.length - 1)+" <a href='/newgroup'>group</a>";
                    if ($scope.grouplist.length>1)
                      $rootScope.alert.msg+="s";
                   }
                }
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
    $scope.gotoAddGroup = function() {
        $location.path("/newgroup");
    }
    $scope.getGroupDetails = function(groupid) {
    $http.get('/api/group/'+groupid)
        .success(function(data) {
            $scope.groupdetailslist[groupid] = data;
            $scope.currentgroup=groupid;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }
    $scope.getGroupsInfo();
}])