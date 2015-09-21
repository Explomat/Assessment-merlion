var serverId = '6196978891908330987';
var routerUrl = 'http://study.merlion.ru/custom_web_template.html?object_id=6135330846971222087';

var url = {
	defaultPath: routerUrl.concat('&server_id='.concat(serverId)),
	createPath: function(obj){
		return this.defaultPath.concat(Object.keys(obj).map(function(k){
			return '&'.concat(k).concat('=').concat(obj[k]);
		}).join(''));
	}
}

dom = {
	appId: 'app'
}

module.exports = {
	url: url, 
	dom: dom
};