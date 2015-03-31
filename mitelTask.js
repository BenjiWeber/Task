angular.module('MitelTask', ['ui.bootstrap'])

/* This Main Controller is used by ng-repeat to dynamically
 assign controllers to each accordion
 */
.controller('mainController', function($scope,$compile,$element) {
	$scope.tabs = [
		{
			cont: compAcc,
			num :1
		},
		{
			cont: callAcc,
			num :2
		},
		{
			cont: grpAcc,
			num :3
		},
		{
			cont: userAcc,
			num :4
		},
		{
			cont: devAcc,
			num :5
		}
	];
})

/* 
This is a re-usable directive that creates the forms
that the accordions are using. It places the form fields
in a table so that the fields are aligned 
*/
.directive('accDir', function () {
	return {
		link: function(scope, elem, attrs) {
			
			var table = document.createElement("table");
			
			if(scope.group.para) {
				parag = document.createElement("p");
				parag.innerHTML =scope.group.para;
				elem.append(parag);
			}
			
			for (i in scope.group.inputs) {
				 var row  = document.createElement("tr");
				 table.appendChild(row);
				 var labelCell = document.createElement("td");
				 var inputCell = document.createElement("td");
				 
				 if("select" == scope.group.inputs[i].type) {
					var input = document.createElement("select");
					for(j in scope.group.inputs[i].opts) {
						option = document.createElement("option");
						option.value=scope.group.inputs[i].opts[j];
						option.innerHTML=scope.group.inputs[i].opts[j];
						input.appendChild(option);
					}
				 } else {
					var input = document.createElement("input");
					 input.type = scope.group.inputs[i].type;
				 }
				 
				 var label         = document.createElement("label");
				 label.innerHTML   = scope.group.inputs[i].label;
				 
				 //Append the created items to the table
				 labelCell.appendChild(label);
				 inputCell.appendChild(input);
				 row.appendChild(labelCell);
				 row.appendChild(inputCell);
			}
			
			elem.append(table);
        }
	}
});


/*
------------------CONTROLLER FUNCTIONS----------------
Each of the following functions simply defines the titles
and the input fields for each form.

The directive accDir above is called on each of these
to generate forms from the JSON representations of a form

e.g Controller represents input as  {"type":"text","label":"Name:"}
the directive will generate the a DOM label and a DOM text field.
*/

function compAcc($scope) {
		
  $scope.groups = [
    {
      title: 'Company Information',
	  isOpen: true,
	  para: loremIpsum(),
	  inputs: []
    }
  ];
}

function callAcc($scope) {
		
  $scope.groups = [
    {
      title: 'Call Information',
	  isOpen: true,
	  para: "Hey, a different tab! Just showing that I parse more input types",
	  inputs: [{ "type" : "checkbox",
				 "label" : "Check me:"
				},
				{ "type" : "text",
				 "label" : "Type me:"
				},
				{ "type" : "file",
				 "label" : "Pick me:"
				}
				]
    }
  ];
  

}

function grpAcc($scope) {
		
  $scope.groups = [
    {
      title: 'Group Information',
	  isOpen: true,
	  inputs: [{ "type" : "text",
				 "label" : "First Name:"
				},
				{ "type" : "text",
				 "label" : "Last Name:"
				},
				{ "type" : "text",
				 "label" : "Email:"
				}
				]
    }
  ];
}

function userAcc($scope) {
$scope.groups = [
    {
      title: 'Basic User Information',
	  isOpen: true,
	  inputs: [{ "type" : "text",
				 "label" : "First Name:"
				},
				{ "type" : "text",
				 "label" : "Last Name:"
				},
				{ "type" : "text",
				 "label" : "Email:"
				}
				]
    },
    {
      title: 'Select Plan',
	  isOpen: false,
	  inputs: [{ "type" : "select",
				 "label" : "Select a plan:",
				  opts   : ["PlanA","PlanB","PlanC"],
				}]
    },
	{
      title: 'Configure Plan',
	  isOpen: false,
	  para: "Here I would display dynamic options based on the plan selected above. Still learning how to do this",
	  inputs: []
    },
    {
      title: 'Device Setup',
	  isOpen: false,
	  para: "Again, more context sensitive options should be here",
	  inputs: []
    }
  ];
}

function devAcc($scope) {
	
  $scope.groups = [
    {
      title: 'Dev Information',
	  isOpen: true,
	  inputs: [{ "type" : "text",
				 "label" : "First Name:"
				},
				{ "type" : "text",
				 "label" : "Last Name:"
				},
				{ "type" : "text",
				 "label" : "Email:"
				}
				]
    }
  ];
}

//Just to test with.
function loremIpsum() {
return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis metus pellentesque, malesuada sem et, placerat justo. Suspendisse vitae justo sollicitudin, ultrices nunc condimentum, efficitur lacus. Aliquam non diam nulla. Nullam auctor nec quam lacinia iaculis. Vivamus in consequat lorem, non sagittis nunc. Integer posuere urna quis efficitur condimentum. Donec ornare, nunc id ultrices suscipit, lorem ante posuere magna, ac imperdiet enim neque quis odio. Nunc posuere nec magna eget ultricies. Etiam eget eleifend ligula. Ut fringilla ante a tristique sodales."
}
