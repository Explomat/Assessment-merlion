/** @jsx React.DOM */
var DatePickerInput = React.createClass(/** @lends {React.ReactComponent.prototype} */{displayName: "DatePickerInput",
    /**
     *
     * @returns {{date: Date}}
     */
    getDefaultProps: function() {
        return({'date':new Date(), 'beforeUpdate': function(date) {
            return date;
        }});
    },
    /**
     *
     * @returns {{show: boolean}}
     */
    getInitialState: function() {
        return {show:false};
    },
    showDatePicker: function() {
        this.setState({show:true});
    },
    hideDatePicker: function() {
        this.setState({show:false});
    },
    /**
     *
     * @param {Date} date
     */
    onChangeDate: function(date) {
        this.props['date'] = date;
        this.setState({show:false});
    },
    render: function() {
        var style={position:'fixed', top:0,left:0, width:'100%', height:'100%', display:(this.state.show?'block':'none')};
        // DatePicker is not defined as JSX because of closure compiler
        return (
            React.createElement("div", null, 
                React.createElement("div", {style: style, onClick: this.hideDatePicker}), 
                React.createElement("div", {className: "datepicker-wrapper"}, 
                DatePicker( {'date':this.props['date'], 'show':this.state.show, 'onChangeDate':this.onChangeDate})
                ), 
                React.createElement("input", {type: "text", onFocus: this.showDatePicker, value: this.props['beforeUpdate'](this.props['date'])})
            )
        );
    }
});