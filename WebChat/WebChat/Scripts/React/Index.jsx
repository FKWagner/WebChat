var Index = React.createClass({

    getInitialState: function () {
        return { data: [] };
    },

    loadChatMessagesFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true)
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },

    handleChatMessageSubmit: function (ChatMessageInput) {
        var data = new FormData();
        data.append("Message", ChatMessageInput.ChatMessage);
        data.append("ChatRoomID", "1");

        var xhr = new XMLHttpRequest();
        xhr.open('post', this.props.submitUrl, true);
        xhr.onload = function () {
            this.loadChatMessagesFromServer();
        }.bind(this);
        xhr.send(data);
    },

    componentDidMount: function () {
        this.loadChatMessagesFromServer();
        window.setInterval(this.loadChatMessagesFromServer, this.props.pollInterval);
    },

    render: function () {
        return(
            <div>
                <div id="ChatRoom" className="container">
                    <ChatRoom data={this.state.data} />
                </div>
                <div className="container">
                    <ChatMessageInput onChatMessageSubmit={this.handleChatMessageSubmit} />
                </div>
            </div>
       );    
    }
});

ReactDOM.render(
  <Index url="/ChatMessages/1" submitUrl="ChatMessages/Create" pollInterval={20000} />,
  document.getElementById('Chat')
);