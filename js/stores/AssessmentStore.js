var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AssessmentConstants = require('../constants/AssessmentConstants');
var extend = require('extend-object');

var _assessment = {},  _filterPersons = [];

function receiveData(assessment){
	_assessment = assessment;
	_filterPersons = JSON.parse(JSON.stringify(_assessment.persons));
	/*_filterPersons = _assessment.persons.filter(function(p){
		return (new Date(p.date) >= new Date(_assessment.startDate) && new Date(p.date) <= new Date(_assessment.endDate) && checkPersonStatus(p.status, status));
	});*/
}

function changeStartDate(date){
	_assessment.startDate = date;
	_filterPersons = _assessment.persons.filter(function(p){
		return (checkDates(new Date(p.date), _assessment.startDate, _assessment.endDate) && checkPersonStatus(p.status, _assessment.selectedStatus));
	});
}

function changeEndDate(date){
	_assessment.endDate = date;
	_filterPersons = _assessment.persons.filter(function(p){
		return (checkDates(new Date(p.date), _assessment.startDate, _assessment.endDate) && checkPersonStatus(p.status, _assessment.selectedStatus));
	});
}

function changeStatus(status){
	_assessment.selectedStatus = status;
	_filterPersons = _assessment.persons.filter(function(p){
		return (checkDates(new Date(p.date), _assessment.startDate, _assessment.endDate) && checkPersonStatus(p.status, _assessment.selectedStatus));
	});
}

function checkDates(pDate, startDate, endDate){
	return (pDate >= startDate && pDate <= endDate);
}

function checkPersonStatus(personStatus, status){
	return (personStatus === status || status === 'all');
}

function sortByName(isAscending){
	var isAsc = isAscending ? 1 : -1;
	_filterPersons.sort(function(first, second){
		return first.fullName > second.fullName ? isAsc : first.fullName === second.fullName ? 0 : -(isAsc);
	});
}

function sortByState(isAscending){
	var isAsc = isAscending ? 1 : -1;
	_filterPersons.sort(function(first, second){
		return first.status > second.status ? isAsc : first.status === second.status ? 0 :  -(isAsc);
	});
}

function sortByDate(isAscending){
	var isAsc = isAscending ? 1 : -1;
	_filterPersons.sort(function(first, second){
		return first.date > second.date ? isAsc : first.date == second.date ? 0 :  -(isAsc);
	});
}

function sortByResult(isAscending){
	var isAsc = isAscending ? 1 : -1;
	_filterPersons.sort(function(first, second){
		return first.result > second.result ? isAsc : first.result == second.result ? 0 :  -(isAsc);
	});
}

var AssessmentStore = extend({}, EventEmitter.prototype, {

	getAssessment: function(){
		return _assessment;
	},

	getPersons: function(){
		return _filterPersons;
	},

	emitChange: function() {
		this.emit('change');
	},

	addChangeListener: function(callBack) {
		this.on('change', callBack);
	},

	removeChangeListener: function(callBack) {
		this.removeListener('change', callBack);
	}
});

AssessmentStore.dispatchToken = AppDispatcher.register(function(payload) {
	var action = payload.action;

	switch(action.actionType) {
		case AssessmentConstants.RECEIVE_DATA:
			receiveData(action.data);
			break;
		case AssessmentConstants.CHANGE_START_DATE:
			changeStartDate(action.date);
			break;
		case AssessmentConstants.CHANGE_END_DATE:
			changeEndDate(action.date);
			break;
		case AssessmentConstants.CHANGE_STATUS:
			changeStatus(action.status);
			break;
		case AssessmentConstants.SORT_BY_NAME:
			sortByName(action.isAscending);
			break;
		case AssessmentConstants.SORT_BY_STATE:
			sortByState(action.isAscending);
			break;
		case AssessmentConstants.SORT_BY_DATE:
			sortByDate(action.isAscending);
			break;
		case AssessmentConstants.SORT_BY_RESULT:
			sortByResult(action.isAscending);
			break;
		default:
			return true;
	}

	AssessmentStore.emitChange();
	return true;
});

module.exports = AssessmentStore;
