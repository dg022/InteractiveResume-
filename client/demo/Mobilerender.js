import React, { Component } from "react";

export default class Mobilerender extends Component {
  componentWillUnmount() {
    this.stopMusic();
    this.keyListener.unsubscribe();
  }

  componentDidMount() {
    //ToDo, react to server side message that the connection worked
    this.props.socket.on("connected", (roomNumber) => {
      this.setState({ roomNumber: roomNumber }, () => {
        this.setState({ notConnected: false });
      });
    });

    this.props.socket.on("failed", () => {
      this.setState({ error: true });
    });
  }

  render() {
    const controller = () => {
      return (
        <div className="controller">
          <center>
            <i
              onTouchStart={() => {
                this.props.socket.emit(
                  "left",
                  socket.id,
                  this.state.roomNumber
                );
              }}
              onTouchEnd={() => {
                console.log("you let go of this button");
                this.props.socket.emit(
                  "stopMovingLeft",
                  socket.id,
                  this.state.roomNumber
                );
              }}
              class="chevron circle left icon"
            ></i>
            <i
              onTouchStart={() => {
                this.props.socket.emit(
                  "right",
                  socket.id,
                  this.state.roomNumber
                );
              }}
              onTouchEnd={() => {
                this.props.socket.emit(
                  "stopMovingRight",
                  socket.id,
                  this.state.roomNumber
                );
              }}
              class="chevron circle right icon"
            ></i>
          </center>
        </div>
      );
    };

    const submit = () => {
      this.props.socket.emit(
        "submitRoomNumber",
        this.state.textValue,
        this.props.sokcet.id
      );
    };

    if (this.state.notConnected) {
      return (
        <div className="centered">
          {this.state.error && <p> Wrong Code</p>}
          <p> Enter Code:</p>
          <input
            onChange={(e) => this.setState({ textValue: e.target.value })}
            value={this.state.textValue}
            type="text"
          ></input>
          <button
            onClick={() => submit()}
            type="button"
            class="nes-btn is-success"
          >
            Enter!
          </button>
          |
          <button type="button" class="nes-btn is-error">
            No thanks
          </button>
        </div>
      );
    }
    return controller();
  }

  constructor(props) {
    super(props);

    this.state = {
      notConnected: true,
      textValue: "",
      roomNumber: "",
      error: false,
    };
  }
}
