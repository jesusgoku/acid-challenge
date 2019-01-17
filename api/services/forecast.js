import DarkSky from '../libraries/darksky';
import config from '../config/config';


const DARK_SKY_API_KEY = config.API.DARK_SKY_API_KEY;

export default new DarkSky(DARK_SKY_API_KEY);
