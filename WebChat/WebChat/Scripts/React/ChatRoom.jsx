var ChatRoom = React.createClass({

    render: function () {
        var ChatMessages = this.props.data.map(function (ChatMessage) {
            return (
                <ChatMesage author={ChatMessage.User}>
                    {ChatMessage.Message}
                </ChatMesage>
                );
        });
        return (
          <div className="list-group">
              {ChatMessages}
          </div>
      );
    }
});
