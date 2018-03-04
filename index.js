import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config';

const app = express();
const bot = new TelegramBot(config.token);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

bot.setWebHook(`${config.url}/bot${config.token}`);

bot.on('message', message => {
  const {chat: {id}} = message;

  bot.sendMessage(id, 'Сообщение получено');
});

app.post(`/bot${config.token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(config.port, () => {
  console.log(`Telegram bot use port ${config.port}`);
});
