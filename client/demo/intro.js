import React, { Component } from "react";
import PropTypes from "prop-types";
import { AudioPlayer } from "../src";

export default class Intro extends Component {
  static propTypes = {
    onStart: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      blink: false,
      screenNumber: 0,
    };

    this.startUpdate = this.startUpdate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    const roomNumber = Math.floor(Math.random() * 100000);
    this.props.socket.emit("newRoom", roomNumber);
    this.startNoise = new AudioPlayer("/assets/start.wav");
    window.addEventListener("keypress", this.handleKeyPress);
    this.animationFrame = requestAnimationFrame(this.startUpdate);
    this.interval = setInterval(() => {
      this.setState({
        blink: !this.state.blink,
        roomNumber: roomNumber,
      });
    }, 500);

    this.props.socket.on("connected", () => {
      this.startNoise.play();
      this.props.onStart();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keypress", this.handleKeyPress);
    cancelAnimationFrame(this.animationFrame);
    clearInterval(this.interval);
  }

  render() {
    const setRoomNumber = () => {
      const term = Math.floor(Math.random() * 100000);
    };

    if (this.state.screenNumber === 0) {
      return (
        <div>
          <img className="intro" src="assets/introOo1.png" />
          <p
            className="start"
            style={{ display: this.state.blink ? "block" : "none" }}
          >
            Press Start
          </p>
        </div>
      );
    }

    if (this.state.screenNumber === 1) {
      return (
        <div>
          <center> Choose Controller Option</center>
          <div className="centered">
            {" "}
            <button type="button" class="nes-btn is-primary">
              Keyboard
            </button>
            |
            <button
              onClick={() => this.setState({ screenNumber: 2 })}
              type="button"
              className="nes-btn is-primary"
            >
              Phone
            </button>
          </div>
        </div>
      );
    }

    if (this.state.screenNumber === 2) {
      return (
        <div className="centered">
          <p>Room Code: {this.state.roomNumber}</p>
        </div>
      );
    }
  }

  startUpdate() {
    this.animationFrame = requestAnimationFrame(this.startUpdate);
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      if (this.state.screenNumber === 0) {
        this.setState({ screenNumber: 1 });
      } else {
        this.startNoise.play();
        this.props.onStart();
      }
    }
  }
}
