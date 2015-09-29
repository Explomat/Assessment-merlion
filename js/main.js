var React = require('react');
var AssessmentAPI = require('./api/AssessmentAPI');
var AssessmentView = require('./components/AssessmentView');
var AssessmentActions = require('./actions/AssessmentActions');

var Assessment = require('./models/Assessment');

window.onload = function(){
	AssessmentActions.receiveData(new Assessment());
	React.render(React.createElement(AssessmentView), app);
// 	try {
// 		AssessmentAPI.getData().then(function(data){
// 			AssessmentActions.receiveData(new Assessment(data));
// 			React.render(React.createElement(AssessmentView), app);
// 		});
// 	}
// 	catch(e){ console.log(e); }
 }


