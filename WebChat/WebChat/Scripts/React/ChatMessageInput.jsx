var ChatMessageInput = React.createClass({

    handleSubmit: function (e) {
        e.preventDefault();
        var ChatMessage = this.refs.ChatMessage.value.trim();
        if (!ChatMessage) {
            return;
        }
        // TODO: send request to the server
        this.refs.ChatMessage.value = '';
        return;
    },

    render: function() {
        return (
          <div className="form-horizontal">
              <form onSubmit={this.handleSubmit}>
                  <input ref="ChatMessage" name="ChatMessage" className="form-control text-box single-line" type="text" placeholder="Input your Chat Message" />
                  <input className="btn btn-default" type="submit" value="Send" />
              </form>
          </div>
      );
    }
});
