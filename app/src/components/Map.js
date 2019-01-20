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

  componentWillUnmount() {
    this.unloadMap();
  }

  initMap(googleMaps) {
    this.googleMaps = googleMaps;
    this.mapInstance = new googleMaps.Map(
      this.mapRef.current,
      this.props.options,
    );

    const { onClick } = this.props;

    if (onClick) {
      this.mapInstance.addListener('click', onClick);
    }
  }

  unloadMap() {
    if (this.mapInstance) {
      const { onClick } = this.props;

      if (onClick) {
        this.googleMaps.event.clearListeners(this.mapInstance, 'click');
      }
    }
  }

  render() {
    return (<div className="Map" ref={this.mapRef}></div>);
  }
}



Map.defaultProps = {
  options: {},
  onClick: null,
};

Map.propTypes = {
  apiKey: PropTypes.string.isRequired,
  options: PropTypes.object,
  onClick: PropTypes.func,
};

export default Map;
