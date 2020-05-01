import React, { createRef } from 'react';
// import axios from 'axios';
import classes from './Video.module.css';
import Aux from '../../hoc/Aux/Aux';
import {connect } from 'twilio-video';

class VideoComponent extends React.Component {
  constructor(props) { 
    super(props)
    this.state = {
      identity: null,
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzgyOGY2M2EwNTE0YzY3ZDk5OGExM2Y5MzdhYzlmZjg4LTE1ODgyNzkzMjMiLCJpc3MiOiJTSzgyOGY2M2EwNTE0YzY3ZDk5OGExM2Y5MzdhYzlmZjg4Iiwic3ViIjoiQUNmMDQwMzgxOGJlMmI0YTg4NjgzODhmNzQxOWEzYzNkNCIsImV4cCI6MTU4ODI4MjkyMywiZ3JhbnRzIjp7ImlkZW50aXR5IjoiQ2hyaXMgRGV0bWVyaW5nIiwidmlkZW8iOnsicm9vbSI6InRlc3QifX19.LPSxYWLMLE2IItReGynl8YnSmR13KFZ7fXxIhHVJ9W0',
      roomName: 'Test',   
      roomNameErr: false,
      localMediaAvailable: true, 
      hasJoinedRoom: false
    };
    this.localMedia = createRef();
    this.remoteMedia = createRef();
  }
  
  
  componentDidMount() {
    // axios.get('/token').then(results => {
    //   const { identity, token } = results.data;
    //   this.setState({ identity, token });

    // }).catch(error => { 
    //   console.log(error)
    // });
  }


  joinRoom = () => { 
    let connectOptions = {
      name: this.state.roomName
    };

    connect(this.state.token, connectOptions).then(this.roomJoined, error => {
      alert(error.message);
    });
  }


  joinLocalPerticipant = (room) => { 
    let publications = Array.from(room.localParticipant.tracks.values())
    let mediaContainer = this.localMedia.current

    publications.forEach(publication => {
      mediaContainer.appendChild(publication.track.attach())
    })
  }


  roomJoined = (room) => {
    this.joinLocalPerticipant(room)
    console.log(room.participants)
    room.participants.forEach(participant => {
      console.log(participant.identity);
    });

  }


  leaveRoom = () => {
    
  }


  handleRoomNameChange = (event) => { 
    let roomName = event.target.value;
    this.setState({ roomName })
  }


  render() { 

    let showLocalTrack = this.state.localMediaAvailable ? (
      <div><div ref={this.localMedia}  /> </div>) : null; 

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