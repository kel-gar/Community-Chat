import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      value: ''
    };
    this.roomsRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) });
     });
   }

   createMessage (message) {
     this.roomsRef.push({
      content: this.state.value,
      roomId: this.props.activeRoom,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
     });
   }

   handleChange(e) {
    this.setState({ value: e.target.value})
  }

   handleSubmit(e) {
     e.preventDefault();
     this.createMessage(this.state.value);
     this.setState({ value: '' });
   }

    render() {
      return (
        <div id= "messagelist">
          <h3>Messages:</h3>
        <ul>
          {this.state.messages
            .filter(message => message.roomId === this.props.activeRoom)
            .map((message, key) => (
            <ul key={message.key}>
              {message.content}
            </ul>
          ))}
        </ul>
          <form onSubmit={ this.handleSubmit }>
            <label>
              New Message:
              <input type="text" value={ this.state.value } onChange={ this.handleChange } />
            </label>
              <input type="submit" value="Submit" />
          </form>
        </div>

     );
   }
 }

export default MessageList;
