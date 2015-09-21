<%
var DATE_OFFSET = -10*86400;

function stringifyWT(obj) {
	var type = DataType(obj);
	var curObj = obj;
	var outStr = '';

	if (obj == null || obj == undefined) 
		return 'null';
	if (type == 'string' || type == 'integer')
		return '\"' + obj + '\"'  
	if (type == 'bool')
		return obj;

	if (IsArray(obj)) {
		var temp = '';
		for (prop in obj) {
			temp += stringifyWT(prop) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr += '[' + temp +']';
	}
	else {
		var temp = '';
		for (prop in obj) {
			temp += '"' + prop + '":' + stringifyWT(obj[prop]) + ',';
		}
		temp = temp.substr(0, temp.length - 1);
		outStr +='{' + temp + '}';
	}
	return outStr;
}

function getAssessment(){
	var data = {
		startDate: StrMimeDate(DateOffset(Date(), DATE_OFFSET)),
		endDate: StrMimeDate(Date()),
		selectedStatus: 'all',
		statuses: ['all', 'assigned', 'finished'],
		persons: []
	}
	for (p in XQuery("sql:select p.person_id as person_id, p.expert_person_id as expert_person_id, p.is_done as is_done from pas p where p.expert_person_id="+curUserID)){
		data.persons.push({
			id: p.person_id + '',
			fullName: OpenDoc(UrlFromDocID(p.person_id)).TopElem.fullname + '',
			status: p.is_done == 1 ? 'finished' : 'assigned',
			date: StrMimeDate(Date())
		});
	}
	return stringifyWT(data);
}

%>