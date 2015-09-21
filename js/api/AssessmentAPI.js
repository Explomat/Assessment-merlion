var AssessmentData = require('../data/AssessmentData');

module.exports = {

	getData: function(){
		return AssessmentData.getData().then(function(data){
			return JSON.parse(data);
		});
	}
}