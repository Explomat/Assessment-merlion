/** @jsx React.DOM */

var React = require('react');

function getMonthName(number) {
    if (number < 0 || number > 11)
        return null;
    return [ "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь" ][number];
}

var NumberPicker = React.createClass({displayName: "NumberPicker",
    getDefaultProps: function() {
        return { number:0, isMonth:false };
    },

    changeNumber: function(e) {
        this.props.onChangeNumber(e.target.getAttribute('data-number'));
    },

    render: function() {
        var val = this.props.isMonth ? getMonthName(this.props.number - 1) : this.props.number;
        return (
            React.createElement("div", {className: "numberpicker"}, 
                React.createElement("a", {onClick: this.changeNumber, "data-number": this.props.number-1, className: "btn btn-xs btn-default"}, "<<"), 
                React.createElement("span", {className: "btn btn-xs"}, val), 
                React.createElement("a", {onClick: this.changeNumber, "data-number": this.props.number+1, className: "btn btn-xs btn-default"}, ">>")
            )
        )
    }
});
module.exports = NumberPicker;
