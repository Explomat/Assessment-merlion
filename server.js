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

function getResult(competences) {
	var compResult = 0;
	for (c in competences){
		compResult = compResult + (c.weight * c.mark_value);
	}
	return StrReal(compResult / 100, 2);
}

function getAssessment(){
	var date = DateOffset(Date(), DATE_OFFSET);
	var data = {
		startDate: StrMimeDate(date),
		endDate: StrMimeDate(Date()),
		selectedStatus: 'all',
		statuses: ['all', 'assigned', 'finished'],
		persons: []
	}
	for (p in XQuery("sql:select p.id, p.person_id, p.expert_person_id, p.is_done, p.assessment_appraise_id from pas p where p.expert_person_id="+curUserID)){
		isDone = p.is_done == true ? 'finished' : 'assigned';
		endDate = OpenDoc(UrlFromDocID(Int(p.assessment_appraise_id))).TopElem.end_date;
		endDate = endDate == null ? Date() : Date(endDate);
		if (endDate < date) {
			data.startDate = StrMimeDate(endDate);
		}
		href = p.is_done == true ? 'view_doc.html?mode=assessment_merlion_collaborator&user=' + p.person_id + '': 'view_doc.html?mode=assessment_appraise&assessment_appraise_id='+p.assessment_appraise_id+'&pa_id='+p.id+'&assessment_appraise_type=competence_appraisal';
		data.persons.push({
			id: p.person_id + '',
			key: p.id + '',
			fullName: OpenDoc(UrlFromDocID(Int(p.person_id))).TopElem.fullname + '',
			status: isDone,
			result: getResult(OpenDoc(UrlFromDocID(Int(p.id))).TopElem.competences),
			date: StrMimeDate(endDate),
			href: href
		});
	}
	return stringifyWT(data);
}

%>