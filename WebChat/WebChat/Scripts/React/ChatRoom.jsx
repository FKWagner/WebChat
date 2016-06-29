var ChatRoom = React.createClass({

    render: function () {
        var ChatMessages = this.props.data.map(function (chatmessage) {
            return (
                <ChatMessage datetime={chatmessage.DateTime}>
                    {chatmessage.Message} 
                </ChatMessage>
                );
        });
        return (
          <div className="chatroom list-group">
              {ChatMessages}
          </div>
      );
    }
});

