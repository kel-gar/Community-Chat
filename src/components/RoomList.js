import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      value: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
   }

   createRoom (room) {
     this.roomsRef.push({
       name: room
     });
   }

   handleChange(e) {
    this.setState({ value: e.target.value})
  }

   handleSubmit(e) {
     e.preventDefault();
     this.createRoom(this.state.value);
     this.setState({ value: ''});
     // if (!this.state.value) { return }
     // const newRoom = { name: this.state.value, isCompleted: false };
     // this.setState({ rooms: [...this.state.rooms, newRoom], value: ''});
   }

    render() {
      return (
        <div id="roomlist">
          {this.state.rooms.map( (room, index) =>
            <div key={index}>
              <ul>{room.name}</ul>
            </div>
          )}
          <form onSubmit={ this.handleSubmit }>
            <label>
              New Room Name:
              <input type="text" value={ this.state.value } onChange={ this.handleChange } />
            </label>
              <input type="submit" value="Submit" />
          </form>
        </div>

     );
   }
 }

export default RoomList;
