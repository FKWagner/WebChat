var ChatMessage = React.createClass({
    render: function() {
        return (
          <div className="chatmessage list-group-item">
              <p className="text-right"><span className="glyphicon-time"></span>{this.props.datetime}</p>
              <p>{this.props.children}</p>
          </div>
      );
    }
});