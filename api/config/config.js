import rc from 'rc';

const config = rc('acidchallenge', {
  API: {
    PORT: 8000,

    DARK_SKY_API_KEY: '',
  },
});

export default config;
