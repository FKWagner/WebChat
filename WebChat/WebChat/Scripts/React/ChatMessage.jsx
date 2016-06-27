var ChatMessage = React.createClass({
    render: function() {
        return (
          <div className="list-group-item">
              <h3 className="text-left">{this.props.User}</h3>
              <p className="text-right"><span className="glyphicon-time"></span>{this.props.datetime}</p>
              <p>{this.props.message}</p>
          </div>
      );
    }
});