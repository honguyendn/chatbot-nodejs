import winston from 'winston';
require('dotenv').config();

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: `log/${process.env.NODE_ENV || 'development'}.log` }),
  ],
});

export default { logger }
