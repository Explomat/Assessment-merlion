var Person = require('./Person');
var curDate = new Date();

module.exports = function(args){
	args = args || {};
	args.startDate = args.startDate ? new Date(args.startDate) : new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 10);
	args.endDate = args.endDate ? new Date(args.endDate) : curDate;

	this.selectedStatus = args.selectedStatus || 'all';
	this.statuses = args.statuses || ['all', 'assigned', 'finished'];
	this.startDate = args.startDate;
	this.endDate = args.endDate;
	this.persons = args.persons || [ new Person({fullName:'A', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1)}), 
									new Person({fullName:'B', status: 'finished', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 3)}), 
									new Person({fullName:'C', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 5)}), 
									new Person({fullName:'D', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 6)})
								];
}