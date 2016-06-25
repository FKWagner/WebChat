var Login = React.createClass({
    render: function () {
        return (React.createElement("div", {className: "login"}, "Hello World"));
    }
});
ReactDOM.render(React.createElement(Login, null), document.getElementById('content'));
