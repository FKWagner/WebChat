var Index = React.createClass({

    loadChatMessagesFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true)
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },

    getInitialState: function () {
        return { data: [] };
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
                    <ChatMessageInput />
                </div>
            </div>
       );    
    }
});

ReactDOM.render(
  <Index url="/ChatMessages/1" pollInterval={20000} />,
  document.getElementById('Chat')
);