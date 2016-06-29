var ChatMessage = React.createClass({
    render: function () {
        var datetime = new Date(parseInt(this.props.datetime.substr(6)));
        return (
          <div className="chatmessage list-group-item">
              <p className="chatmessageDateTime text-right"><span className="glyphicon glyphicon-time"></span>{datetime.toString()}</p>
              <p>{this.props.children}</p>
          </div>
      );
    }
});