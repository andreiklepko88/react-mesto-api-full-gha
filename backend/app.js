const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const errorHandler = require('./middlewares/error-handler');
const limiter = require('./middlewares/rate-limiter');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://mestoproject-klepkoas.nomoredomains.xyz',
  credentials: true,
}));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', { autoIndex: true }).then(() => {
  console.log('Connected to database!');
});
app.use(limiter);
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
