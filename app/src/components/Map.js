import React, { Component } from 'react';
import PropTypes from 'prop-types';

import googleMapsLoadAsync from '../utils/google-maps-load-async';

import './Map.css';


class Map extends Component {
  constructor(props) {
    super(props);

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    googleMapsLoadAsync(this.props.apiKey)
      .then(this.initMap.bind(this))
    ;
  }

  initMap(googleMaps) {
    this.mapInstance = new googleMaps.Map(
      this.mapRef.current,
      this.props.options,
    );
  }

  render() {
    return (<div className="Map" ref={this.mapRef}></div>);
  }
}

Map.defaultProps = {
  options: {},
};

Map.propTypes = {
  apiKey: PropTypes.string.isRequired,
  options: PropTypes.object,
};

export default Map;
