var Person = require('./Person');

module.exports = function(args){
	args = args || {};
	var curDate = new Date();

	this.selectedStatus = 'all';
	this.statuses = ['all', 'assigned', 'finished'];
	this.startDate = new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 10);
	this.endDate = curDate;
	this.persons = args.persons || [ new Person({fullName:'A', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1)}), 
									new Person({fullName:'B', status: 'finished', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 3)}), 
									new Person({fullName:'C', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 5)}), 
									new Person({fullName:'D', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 6)})
								];
}