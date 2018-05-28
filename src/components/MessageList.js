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
      username: this.props.activeUser,
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

   convertTimestamp(timestamp) {
     var d = new Date(timestamp),	// Convert the passed timestamp to milliseconds
		   yyyy = d.getFullYear(),
		   mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		   dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		   hh = d.getHours(),
		   h = hh,
		   min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		   ampm = 'AM',
		   time;

	      if (hh > 12) {
		        h = hh - 12;
		        ampm = 'PM';
        } else if (hh === 12) {
		        h = 12;
		        ampm = 'PM';
	      } else if (hh == 0) {
		        h = 12;
	      }
	       // ie: 2013-02-18, 8:35 AM
	      time = h + ':' + min + ' ' + ampm + ', ' + mm + '-' + dd + '-' + yyyy;
        return time;
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
              {message.username}-
              {message.content}-
              {this.convertTimestamp(message.sentAt)}
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
