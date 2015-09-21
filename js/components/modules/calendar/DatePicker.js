/** @jsx React.DOM */
var React = require('react');
var NumberPicker = require('./NumberPicker');
var DayPicker = require('./DayPicker');

var DatePicker = React.createClass({displayName: "DatePicker",

    onChangeVisibleDate: function(date) {
        this.setState({visibleDate:date});
    },

    onChangeSelectedDate: function(date) {
        this.setState({visibleDate:date});
        this.props['onChangeDate'](date);
    },

    getDefaultProps: function() {
        return({
            date: new Date(), 
            show:true, 
            onChangeDate: function(date) {
                console.log('You have selected new date' + date);
            }
        });
    },

    getInitialState: function() {
        var date = new Date();
        date.setTime(this.props['date'].getTime());
        return({visibleDate:date});
    },

    changeYear: function(year) {
        var date = new Date();
        date.setTime(this.state.visibleDate.getTime());
        date.setFullYear(year);
        this.setState({visibleDate:date});
    },

    changeMonth: function(month) {
        var date = new Date();
        date.setTime(this.state.visibleDate.getTime());
        date.setMonth(month-1);
        this.setState({visibleDate:date});
    },

    render: function () {
        var style = { display:(this.props['show']?'block':'none') };
        return (
            React.createElement("div", {className: "datepicker", style: style}, 
                React.createElement("div", {className: "datepicker-container"}, 
                    React.createElement(NumberPicker, {number: this.state.visibleDate.getFullYear(), onChangeNumber: this.changeYear}), 
                    React.createElement(NumberPicker, {number: this.state.visibleDate.getMonth()+1, onChangeNumber: this.changeMonth, isMonth: true}), 

                    React.createElement(DayPicker, {date: this.state.visibleDate, selectedDate: this.props['date'], changeDate: this.onChangeVisibleDate, selectDate: this.onChangeSelectedDate})
                )
            )
        );
    }
});
module.exports = DatePicker;

