import React from 'react';
import {
  connect,
  createLocalTracks,
  createLocalVideoTrack
} from 'twilio-video';
import './App.css';

const Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzgyOGY2M2EwNTE0YzY3ZDk5OGExM2Y5MzdhYzlmZjg4LTE1ODgxMTMyOTgiLCJpc3MiOiJTSzgyOGY2M2EwNTE0YzY3ZDk5OGExM2Y5MzdhYzlmZjg4Iiwic3ViIjoiQUNmMDQwMzgxOGJlMmI0YTg4NjgzODhmNzQxOWEzYzNkNCIsImV4cCI6MTU4ODExNjg5OCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiQ2hyaXMgRGV0bWVyaW5nIiwidmlkZW8iOnsicm9vbSI6InRlc3Q0In19fQ.LdAjwib6KoANLMHfjiUesxxzCWQC0cjBI6W84ycv34s'

class App extends React.Component {
  state = {
    room: null
  }

  connectRoom = (token) => {
    connect(token, { name: 'my-new-room' }).then(room => {
      this.setState({ room: room })
      console.log(`Successfully joined a Room: ${room}`);

      room.on('participantConnected', participant => {

        console.log(`A remote Participant connected: ${participant}`);

      });
    }, error => {
      console.error(`Unable to connect to Room: ${error.message}`);
    });
  }

  connectMedia = (token) => {
    createLocalTracks({
      audio: true,
      video: { width: 640 }
    }).then(localTracks => {
      return connect(token, {
        name: 'my-new-room',
        tracks: localTracks
      });
    }).then(room => {
      console.log(`Connected to Room: ${room.name}`);
    });
  }

  checkPerticipant = () => {
    console.log(this.state.room.localParticipant)
  }

  preview = () => {
    createLocalVideoTrack().then(track => {
      const localMediaContainer = document.getElementById('local-media');
      localMediaContainer.appendChild(track.attach());
    });
  }

  addVideo = () => {
    let tracks = this.state.room.localParticipant._tracks.values()
    for (const track of tracks) {
      document.getElementById('local-media').appendChild(track.attach())
    }
  }


  render() {
    return (
      <div className="App">
        <button onClick={() => this.connectRoom(Token)}>Make Room</button>
        <button onClick={() => this.connectMedia(Token)}>Add Media</button>
        <button onClick={() => this.addVideo()}>Show Video</button>

        <button onClick={() => this.checkPerticipant()}>Check Perticipants</button>
        <button onClick={() => this.preview()}>Preview</button>

        <div id="local-media"></div>

      </div>
    );
  }
}

export default App;







//APi Key
// FRIENDLY NAME
// Christopher Detmering

// SID
// SKd1a4803b36c14c17f63a15fa4846a40f

// KEY TYPE
// Master

// SECRET
// h8t2m8hhl0UHxEwi2nynsxEkAwmfRroR