import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <main>
          <RoomList firebase={firebase} />
        </main>
      </div>
    );
  }
}


export default App;
