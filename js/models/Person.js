var UUID = require('../utils/UUID');

module.exports = function(args){
	args = args || {};
	this.id = args.id || UUID.generate();
	this.fullName = args.fullName || 'Default name';
	this.status = args.status || 'assigned';
	this.date = args.date || new Date();
}