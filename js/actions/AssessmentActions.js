var AppDispatcher = require('../dispatcher/AppDispatcher');
var AssessmentConstants = require('../constants/AssessmentConstants');

var AssessmentActions = {

	receiveData: function(data) {
		AppDispatcher.handleData({
			actionType: AssessmentConstants.RECEIVE_DATA,
			data: data
		});
	},

	changeStartDate: function(date){
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.CHANGE_START_DATE,
			date: date
		});
	},

	changeEndDate: function(date){
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.CHANGE_END_DATE,
			date: date
		});
	},

	changeStatus: function (status) {
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.CHANGE_STATUS,
			status: status
		});
	},

	sortByName: function(isAscending){
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.SORT_BY_NAME,
			isAscending: isAscending
		});
	},

	sortByState: function(isAscending){
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.SORT_BY_STATE,
			isAscending: isAscending
		});
	},

	sortByDate: function(isAscending){
		AppDispatcher.handleAction({
			actionType: AssessmentConstants.SORT_BY_DATE,
			isAscending: isAscending
		});
	}
}

module.exports = AssessmentActions;