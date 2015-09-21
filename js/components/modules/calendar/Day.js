var React = require('react');

var Day = React.createClass({displayName: "Day",
    handleClick: function(e) {
        e.preventDefault();
        this.props.changeDate(this.props.date);
    },

    getDefaultProps: function() {
        return {selected:false};
    },
    
    render: function() {
        var className="day week-"+this.props.week+" dayInWeek-"+this.props.date.getDay();
        className += (this.props.selected?' selected':'');
        return (
            React.createElement("div", {className: className}, 
                React.createElement("a", {href: "#", onClick: this.handleClick}, this.props.date.getDate())
            )
        );
    }
});
module.exports = Day;

