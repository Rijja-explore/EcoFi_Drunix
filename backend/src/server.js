import dotenv from 'dotenv';
import app from './app.js';
import { config } from './config.js';

dotenv.config();

app.listen(config.port, () => {
  console.log(`EcoFi Drunix gateway listening on http://localhost:${config.port}`);
});
