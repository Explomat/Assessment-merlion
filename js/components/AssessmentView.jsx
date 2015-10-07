var React = require('react');
var AssessmentStore = require('../stores/AssessmentStore');
var AssessmentActions = require('../actions/AssessmentActions');
var Calendar = require('./modules/calendar/DatePicker');

var statuses = {
	assigned:'Назначен',
	finished:'Завершен'
}


function getDate(date) {
	var _pad = function(number) {
        if (number < 10) 
          return '0' + number;
        return number;
    }

    if (Date.parse(date).toString() === "NaN")
        return "";
    date = new Date(date);
    return _pad(date.getDate()) + '-'+
    	_pad(date.getMonth() + 1) + '-'+
    	_pad(date.getFullYear());
}

function getAssessmentState() {
	return {
		assessment: AssessmentStore.getAssessment(),
		persons: AssessmentStore.getPersons()
	};
}

var DatePickerView = React.createClass({

	componentDidMount: function(){
		document.body.addEventListener('click', this.handleCloseDisplay, true);
	},

	componentWillUnmount: function(){
		document.body.removeEventListener('click', this.handleCloseDisplay);
	},

	handleToogleDisplay: function(e){
		this.setState({isDisplay: !this.state.isDisplay});
	},

	handleCloseDisplay: function(e){
		if (e && e.target && e.toString() === '[object HTMLButtonElement]')
			return;
		if (this.state.isDisplay)
			this.setState({isDisplay: false});
	},

	handleChangeDate: function(date){
		this.handleCloseDisplay();
		if (this.props.handleChangeDate){
			this.props.handleChangeDate(date);
		}
	},

	getInitialState: function () {
		return {
			isDisplay: false
		}
	},

	render: function(){
		return(
			<div>
				<button type="button" onClick={this.handleToogleDisplay} className="btn btn-primary">{getDate(this.props.date)}</button>
				<Calendar onChangeDate={this.handleChangeDate} date={this.props.date} show={this.state.isDisplay}/>
			</div>
		);
	}
});

var PickDatesView = React.createClass({

	handleChangeStartDate: function(date){
		AssessmentActions.changeStartDate(date);
	},

	handleChangeEndDate: function(date){
		AssessmentActions.changeEndDate(date);
	},

	render: function(){
		return (
			<div className="col-lg-5 col-md-5 col-sm-7 col-xs-7">
				<span className="datepicker__label">С</span>
				<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
					<DatePickerView handleChangeDate={this.handleChangeStartDate} date={this.props.startDate}/>
				</div>
				<span className="datepicker__label">По</span>
				<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
					<DatePickerView handleChangeDate={this.handleChangeEndDate} date={this.props.endDate}/>
				</div>
			</div>
		);
	}
});



var PersonView = React.createClass({
	
	render: function() {
		var isAssignedClass = this.props.status;
		return(
			<tr>
				<td className="col-lg-6 col-md-6 col-sm-5 col-xs-5"><i className="fa fa-user"></i>&nbsp;&nbsp;&nbsp;{this.props.fullName}</td>
				<td className={"col-lg-2 col-md-2 col-sm-2 col-xs-2 "+ isAssignedClass}>{statuses[this.props.status]}</td>
				<td className="col-lg-2 col-md-2 col-sm-3 col-xs-3">{getDate(this.props.date)}</td>
				<td className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><a href="view_doc.html?mode=assessment_appraises">Перейти к оценке</a></td>
			</tr>
		);
	}
});

var StatusFilter = React.createClass({

	handleSelectStatus: function(e){
		AssessmentActions.changeStatus(e.target.value);
	},

	render: function(){
		return(
			<div className="col-lg-7 col-md-7 col-sm-5 col-xs-5">
				<select onChange={this.handleSelectStatus} defaultValue={this.props.selectedStatus} className="form-control">
					<option value="all">Показывать всех</option>
					<option value="assigned">Назначен</option>
					<option value="finished">Завершен</option>
				</select>
			</div>
		);
	}
});

var FiltersView = React.createClass({

	render: function(){
		return(
			<div className="row">
				<PickDatesView endDate={this.props.endDate} startDate={this.props.startDate}/>
				<StatusFilter selectedStatus={this.props.selectedStatus}/>
			</div>
		);
	}
});

var AssessmentView = React.createClass({

	componentDidMount: function() {
		AssessmentStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		AssessmentStore.removeChangeListener(this._onChange);
	},

	toggleRotate: function(elem){
		elem.classList.toggle('rotate');
	},

	handleSortByName: function(e){
		this.toggleRotate(e.currentTarget.lastChild);
		AssessmentActions.sortByName(e.currentTarget.lastChild.classList.contains('rotate'));
	},

	handleSortByState: function(e){
		this.toggleRotate(e.currentTarget.lastChild);
		AssessmentActions.sortByState(e.currentTarget.lastChild.classList.contains('rotate'));
	},

	handleSortByDate: function(e){
		this.toggleRotate(e.currentTarget.lastChild);
		AssessmentActions.sortByDate(e.currentTarget.lastChild.classList.contains('rotate'));
	},

	_onChange: function() {
		this.setState(getAssessmentState());
	},

	getInitialState: function () {
		return getAssessmentState();
	},

	render: function () {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<FiltersView endDate={this.state.assessment.endDate} startDate={this.state.assessment.startDate} selectedStatus={this.state.assessment.selectedStatus}/>
				</div>
				<div className="panel-body users-table">
					<table className="table table-hover">
						<thead>
							<tr className="table-header-row">
								<td onClick={this.handleSortByName}><span>ФИО </span><span className="caret"></span></td>
								<td onClick={this.handleSortByState}><span>Статус </span><span className="caret"></span></td>
								<td onClick={this.handleSortByDate}><span>Дата окончания </span><span className="caret"></span></td>
								<td>Ссылка</td>
							</tr>
						</thead>
						<tbody className="table-body">
							{this.state.persons.map(function(p){
								return <PersonView key={p.key} fullName={p.fullName} status={p.status} date={p.date}/>;
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
});

module.exports = AssessmentView;