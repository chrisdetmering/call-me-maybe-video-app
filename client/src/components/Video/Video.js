import React, { createRef } from 'react';
import axios from 'axios';
import classes from './Video.module.css';
import Aux from '../../hoc/Aux/Aux';
import Video from 'twilio-video';

class VideoComponent extends React.Component {
  constructor(props) { 
    super(props)
    this.state = {
      identity: null,
      roomName: '',
      roomNameErr: false,
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: null
    };
    this.localMedia = createRef();
    this.remoteMedia = createRef();
  }
  
  
  componentDidMount() {
    axios.get('/token').then(results => {
      const { identity, token } = results.data;
      console.log(token)
      this.setState({ identity, token });
    }).catch(error => { 
      console.log(error)
    });
  }


  joinRoom = () => { 
    if (!this.state.roomName.trim()) {
      this.setState({ roomNameErr: true });
      return;
    }

    console.log("Joining room '" + this.state.roomName + "'...");
    let connectOptions = {
      name: this.state.roomName
    };

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks;
    }

    Video.connect(this.state.token, connectOptions).then(this.roomJoined, error => {
      alert('Could not connect to Twilio: ' + error.message);
    });
  }

  attachTracks = (publications, container) => {
  
    publications.forEach(publication => {
      container.appendChild(publication.track.attach());
    });
  }

  // attachTracks = (tracks, container) => {
  //   tracks.forEach(track => {
  //     console.log(track)
  //     container.appendChild(track.attach());
  //   });
  // }

  attachParticipantTracks = (participant, container) => {
    var publications = Array.from(participant.tracks.values());
    this.attachTracks(publications, container);

  }


  // attachParticipantTracks = (participant, container) => {
  //   var tracks = Array.from(participant.tracks.values());
  //   this.attachTracks(tracks, container);
  // }

  roomJoined = (room) => {
    console.log(room)
    // Called when a participant joins a room
    // console.log("Joined as '" + this.state.identity + "'");
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true  // Removes ‘Join Room’ button and shows ‘Leave Room’
    });

    room.on('participantConnected', participant => {
      console.log("Joining: '" + participant.identity + "'");
    });


    var previewContainer = this.localMedia.current;
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer);
    }

    
   



  }

  leaveRoom = () => {
    this.state.activeRoom.disconnect();
    this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
  }


  handleRoomNameChange = (event) => { 
    let roomName = event.target.value;
  
    this.setState({ roomName })
  }

  render() { 

    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className=""><div ref={this.localMedia}  /> </div>) : ''; 

    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <button onClick={this.leaveRoom}>Leave</button>) : (
      <button onClick={this.joinRoom}>Join</button>);

    return (
      <Aux>
        {showLocalTrack}
        {joinOrLeaveRoomButton}
        <input 
          className={classes.Input}
          onChange={this.handleRoomNameChange}
          value={this.state.roomName}/>
        <div className="" ref={this.remoteMedia} id="remote-media" />
      </Aux>
    );
  }  
  
}

export default VideoComponent; 