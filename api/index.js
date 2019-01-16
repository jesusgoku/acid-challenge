import app from './config/app';
import config from './config/config';


const PORT = config.API.PORT;

app.listen(PORT, () => {
  console.log(`listen on port: ${PORT}`);
});
