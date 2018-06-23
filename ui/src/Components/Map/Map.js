import React, { Component } from 'react'
import {Map, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    this.refs.map.map.setCenter(nextProps.center);
  }

  render() {
    return (
      <Map ref="map" google={this.props.google} style={this.props.style} initialCenter={this.props.initialCenter} zoom={this.props.zoom}>
        {this.props.children}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBx5TN8kdm3daCq7hfHCxwG864oCX1lW4g')
})(MapContainer)
