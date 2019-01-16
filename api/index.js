const app = require('./config/app');


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`listen on port: ${PORT}`);
});
