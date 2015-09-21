var React = require('react');
var Day = require('./Day');

function daysInMonthCount(month, year) {
    var d =new Date(year, month+1, 0);
    return d.getDate();
}

function getArrayByBoundary(start, end) {
    var out = [];
    for(var i= start; i<=end; i++) {
        out.push(i);
    }
    return out;
}

function createNewDay(date, time) {
    var newDate = new Date();
    newDate.setTime(time);
    newDate.setDate(date);
    return newDate;
}

function createNewDayMonth(date, month, time) {
    var newDate = new Date();
    newDate.setTime(time);
    newDate.setMonth(month);
    newDate.setDate(date);
    return newDate;
}

var DayPicker = React.createClass({

    selectDay: function(date) {
        this.props.selectDate(date);
    },
    render: function (){
        var date=this.props.date,
            beforeDaysCount = daysInMonthCount((date.getMonth()-1), date.getFullYear()),
            firstDay = createNewDay(1, date.getTime()),
            offset = (firstDay.getDay()===0?7:firstDay.getDay())- 1,
            daysArray = getArrayByBoundary(beforeDaysCount-offset+1, beforeDaysCount);

        var previousMonthDays = daysArray.map(function(day){
            var thisDate = createNewDayMonth(day, date.getMonth()-1, date.getTime());
            return <Day date={thisDate} week={1} changeDate={this.selectDay} key={thisDate}/>
        }.bind(this));

        daysArray = getArrayByBoundary(1, daysInMonthCount(date.getMonth(), date.getFullYear()));
        var actualMonthDays = daysArray.map(function(day) {
            var thisDate = createNewDay(day, date.getTime()),
                weekNumber = Math.ceil((day+offset) / 7),
                selected = false;

            if(date.getMonth()==this.props.selectedDate.getMonth() && date.getFullYear()==this.props.selectedDate.getFullYear()) {
                selected = (day==this.props.selectedDate.getDate());
            }
            return <Day selected={selected} date={thisDate} week={weekNumber} changeDate={this.selectDay} key={thisDate}/>
        }.bind(this));

        daysArray = getArrayByBoundary(1, 42- previousMonthDays.length - actualMonthDays.length);
        var nextMonthDays = daysArray.map(function(day){
            var thisDate = createNewDayMonth(day, date.getMonth()+1, date.getTime()),
                weekNumber = Math.ceil((previousMonthDays.length + actualMonthDays.length + day) / 7);
            return <Day date={thisDate} week={weekNumber} changeDate={this.selectDay} key={thisDate}/>
        }.bind(this));

        return (
            <div className="datepicker-dates">
                <div className="out">
                {previousMonthDays}
                </div>
                <div>
                {actualMonthDays}
                </div>
                <div className="out">
                {nextMonthDays}
                </div>
            </div>
        );
    }
});
module.exports =  DayPicker;
