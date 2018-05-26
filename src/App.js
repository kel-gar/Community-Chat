import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA1r0vt3YrLUtV9gm0YGOTTJqM99VkPK6M",
    authDomain: "kg-bloc-chat.firebaseapp.com",
    databaseURL: "https://kg-bloc-chat.firebaseio.com",
    projectId: "kg-bloc-chat",
    storageBucket: "kg-bloc-chat.appspot.com",
    messagingSenderId: "544006821193"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
      super(props);
      this.state= {
        activeRoom: null,
        activeUser: "Guest"
      };
  }

  setActiveRoom(e) {
    this.setState( { activeRoom: e.target.value } );
  }

  setUser(user) {
    this.setState( { activeUser: user.displayName } )
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <main>
          <User
            firebase={firebase}
            setUser={(user) => this.setUser(user)}
            activeUser={this.state.activeUser}
          />
          <RoomList
            firebase={firebase}
            activeRoom= {this.state.activeRoom}
            setActiveRoom= {(e) => this.setActiveRoom(e)}
          />
          <h2>Active Room: {this.state.activeRoom}</h2>
          <MessageList
            firebase={firebase}
            activeRoom= {this.state.activeRoom}
            activeUser= {this.state.activeUser}
          />
        </main>
      </div>
    );
  }
}

export default App;
