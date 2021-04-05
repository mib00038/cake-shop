import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from '../waracle-logo2.svg';

export default class AnimatedLogo extends Component {
  constructor( props ){
    super( props );
    this.state = {
    }
  }

  render() {
    return (
      <div
        style={{
          position:"relative", width: "200px", height: "200px"

        }}
      >
        <div style={{
          position: "absolute",
          bottom:"50px",
          right:"-100px",
          height: "2px",
          width: "400px",
          background: "cyan",
        }}>
        </div>
        <div style={{
          position: "absolute",
          bottom:"12px",
          right:"58px",
          height: "80px",
          width: "80px",
          background: "#272727",
          borderRadius: "50px",
          border: "2px solid cyan"
        }}>
        </div>
        <img
          src={logo}
          className="App-logo" alt="logo"
        />

      </div>
    );
  }
}

AnimatedLogo.contextTypes = {
  muiTheme: PropTypes.object.isRequired,
};