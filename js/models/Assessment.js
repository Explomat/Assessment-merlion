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
	this.persons = args.persons || [ new Person({fullName:'Матвеев Савва Янович', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 1)}), 
									new Person({fullName:'Габдуллин Дамир Габдульбариевич', status: 'finished', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 3)}), 
									new Person({fullName:'Беловоденко Кирилл Вадимович', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 5)}), 
									new Person({fullName:'Морозова Екатерина Игоревна', date: new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() - 6)})
								];
}