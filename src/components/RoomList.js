import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       // console.log(snapshot);
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
   }

    render() {
      return (
        <div id="roomlist">
          {this.state.rooms.map( (room, index) =>
            <div key={index}>
              <ul>{room.name}</ul>
            </div>
          )}
        </div>
     );
   }
 }

export default RoomList;
