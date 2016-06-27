var ChatRoom = React.createClass({

    render: function () {
        var ChatMessages = this.props.data.map(function (ChatMessage) {
            return (
                <ChatMessage author={ChatMessage.User}>
                    {ChatMessage.Message}
                </ChatMessage>
                );
        });
        return (
          <div className="list-group">
              {ChatMessages}
          </div>
      );
    }
});

