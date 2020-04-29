import React from 'react';
import axios from 'axios';
import Video from './components/Video/Video';
import {
  connect,
  createLocalTracks,
  createLocalVideoTrack
} from 'twilio-video';
import './App.css';

// const Token = ''

class App extends React.Component {
  state = {
    room: null,
    token: null
  }


  componentDidMount () { 
    axios.get('/api/token').then(res => { 
      this.setState({ token: res.data.token})
    })
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
        <button onClick={() => this.connectRoom(this.state.token)}>Make Room</button>
        <button onClick={() => this.connectMedia(this.state.token)}>Add Media</button>
        <button onClick={() => this.addVideo()}>Show Video</button>

        <button onClick={() => this.checkPerticipant()}>Check Perticipants</button>
        <button onClick={() => this.preview()}>Preview</button>

        <Video />


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