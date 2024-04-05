import express, {Request, Response, NextFunction} from "express";
const multer = require('multer');
import config from './envconfig';

const app = express();
const upload = multer({ dest: 'uploads/' });
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
