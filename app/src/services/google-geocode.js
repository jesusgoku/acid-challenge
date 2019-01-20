import GoogleGeocode from '../libraries/google-geocode';


const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const googleGeocode = new GoogleGeocode(API_KEY);

export default googleGeocode;
