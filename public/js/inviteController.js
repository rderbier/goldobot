// todo.js
var app = angular.module('digitalbutler');

app.controller('inviteController',['$scope', '$rootScope','$http', '$location', function ($scope, $rootScope, $http, $location) {

    $rootScope.menu=[];
    $rootScope.menu.push({label:'new task', fa:'fa-plus-circle', href:'/#/newtask'});
    $rootScope.menu.push({label:'Personal tasks', fa:'fa-list-ul', href:'/#/todos'});
    var groupMap=[];
	var roleMap=[];
	var groupList={};
	$scope.invite={};


 var getGroupDetails = function(groupid) {
 	return ($http.get('/api/group/'+groupid));
 };
 $scope.inviteSchema = {
          "type": "object",
          "title": "TODO",
          "properties": {
              
              "groupid": {"type": "number"},
              "groupName": {"type": "string"},
              "role": { "type": "string" },
              "newrole" :{ "type": "string" },
              "email": { "type": "string" },
              "alias": { "type": "string" }
            },
        "required": ["groupid","email"]
        };

	 var formGroupSelected = function () {
		// after topic and distribution selected, check if next is when or group config
		

	  	if ( $scope.invite.groupid!=undefined) {
			   $scope.invite.groupName=groupList[parseInt($scope.invite.groupid)];
			   //$scope.formphase="execgroup";
			   
			     roleMap.splice(0,roleMap.length);
			   
			   getGroupDetails($scope.invite.groupid).success( function(group) {
				    for (var r in group.roles) {
				     roleMap.push({ value: r, name: r });
				  	} 
				})
	 	}
	}

   $scope.addInvite = function (invite,form) {
   	$scope.$broadcast('schemaFormValidate');
   	if ( form.$valid) {
	   $http.post('/api/invite', invite).success(function(data) {
	                              
	                  $rootScope.alert.msg="data.email has been invited to join data.group";
	                  $rootScope.alert.type="info";
	                  $rootScope.newTask=undefined;
	                  $location.path("/todos");
	                }).error(function(data) {
	                  console.log('Error: ' + data);
	                  $scope.alert.msg=data.message;
	                });
      } else {
      	$rootScope.alert.msg="Few things are incorrect or mising ... ";
      }
	}

    init = function(groups) {
    	// see what has been parsed to populate the form
  		//
  		var selectedgroup='';
  		var msg='';


  		if ($rootScope.parsing != undefined) {
  			var alias = $rootScope.parsing.attributes.alias;
	        var groupname = $rootScope.parsing.attributes.group;
  			 if (alias!=undefined && alias!='' ) {
  					$scope.invite.alias=alias;
  					msg="Ok. Let's invite "+alias;
  					
  			} 
  			if (groupname!=undefined && groupname!='' ) {
  					selectedgroup=groupname.toUpperCase();
  			} 

  		} else {
  			msg="Let's invite someone";
  		}

		// build the group map for the form u
		for (var g in groups) {
			if (groups[g].name != "SELF") {
				groupMap.push({ value: groups[g].id, name: groups[g].name });
				if (groups[g].name == selectedgroup) {
					$scope.invite.groupid=groups[g].id;
					$scope.invite.groupName=groups[g].name;
				}
				groupList[parseInt($scope.userinfo.groups[g].id)]=$scope.userinfo.groups[g].name;
			}
		}
		if (selectedgroup!='') {
			if ($scope.invite.groupid==undefined) {
				msg+=". But you don't have any group named "+selectedgroup;
			} else {
				msg+=" to join group "+selectedgroup;
				formGroupSelected();
			}
		}
		$rootScope.alert.msg=msg;
		$rootScope.alert.type="info";
  		
	  		  $scope.formInvite = [
	  


					{
					    "title": "Name of the invitee " ,
					    "key": "alias",
					        
					},			    
				    {
					    "title": "Email of the invitee " ,
					    "key": "email"
					    
					    
					},
					{
					    "key": "groupid",
					    "title": "Specify which group :",

					    type: "radios",
					    titleMap: groupMap,
					    onChange: formGroupSelected
				    },
					{
					    "title": "Which role in the group ?" ,
					    "key": "role",
					    type: "radios",
					    titleMap: roleMap,
					    "condition": "invite.email!=undefined"
					    
					  },
					  {
					    "title": "Or define a new role " ,
					    "key": "newrole",
					    "condition": "invite.email!=undefined"
					    
					},
					{
					  type: "actions",
					  
					  items: [
					  
					  	{ type: "submit", title: "Confirm", style: "btn-info"}

					  ]
					},
			   ]	

    }
    // retireve todos to init the view 
          // when landing on the page, get all todos and show them
    $http.get('/api/userinfo')
        .success(function(data) {

            $scope.userinfo = data;
            init($scope.userinfo.groups);
        
          
            
        })
        .error(function(data) {
            $scope.userinfo={login: false}
            $location.path("/");
            console.log('Error: ' + data);
        });
    
}])