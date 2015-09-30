var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AssessmentConstants = require('../constants/AssessmentConstants');
var extend = require('extend-object');

var _assessment = {},  _filterPersons = [];

function receiveData(assessment){
	_assessment = assessment;
	_filterPersons = JSON.parse(JSON.stringify(_assessment.persons));
}

function changeStartDate(date){
	_assessment.startDate = date;
	_filterPersons = _assessment.persons.filter(function(p){
		return (new Date(p.date) >= date && checkPersonStatus(p.status, _assessment.selectedStatus));
	});
}

function changeEndDate(date){
	_assessment.endDate = date;
	_filterPersons = _assessment.persons.filter(function(p){
		return (new Date(p.date) <= date && checkPersonStatus(p.status, _assessment.selectedStatus));
	});
}

function changeStatus(status){
	_assessment.selectedStatus = status;
	_filterPersons = _assessment.persons.filter(function(p){
		return (new Date(p.date) >= _assessment.startDate && new Date(p.date) <= _assessment.endDate && checkPersonStatus(p.status, status));
	});
}

function checkPersonStatus(personStatus, status){
	return (personStatus === status || status === 'all');
}

function sortByName(isAscending){
	_filterPersons.sort(function(first, second){
		return first.fullName > second.fullName ? isAscending : first.fullName === second.fullName ? 0 : !isAscending;
	});
}

function sortByState(isAscending){
	_filterPersons.sort(function(first, second){
		return first.status > second.status ? isAscending : first.status === second.status ? 0 : !isAscending;
	});
}

function sortByDate(isAscending){
	_filterPersons.sort(function(first, second){
		return first.date > second.date ? isAscending : first.date == second.date ? 0 : !isAscending;
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
		default:
			return true;
	}

	AssessmentStore.emitChange();
	return true;
});

module.exports = AssessmentStore;
