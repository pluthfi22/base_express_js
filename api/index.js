var express = require('express');
var router = express.Router();


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '2012325488:AAEhUAGCInp0a1YFK7kSIVykFlY9_kihDbA';
const bot = new TelegramBot(token, {polling: true});


let global_msg_id;
// Main Menu Bot
bot.onText(/\/start/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `hello ${msg.chat.first_name}, welcome...\n
        click /ShowUrlPls`
    );
});

bot.onText(/\/ShowUrlPls/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `
        hello ${msg.chat.first_name}, welcome...\n
        https://f12-telebot.herokuapp.com/api/test/f12Done
        
        `
    );
});
bot.on('message', (msg) => {
  console.log(msg);
});


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    "status": 202,
    "messgae": "Success"
  });
});


router.get('/sensor/:sensor1:sensor2', (req, res, next) => {
  try {
      res.json({
        "status": 202,
        "messgae": "Success",
        "data": {
          "sensor_1": req.params.sensor1,
          "sensor_2": req.params.sensor2
        }
      });
  } catch (err) {
      next(err);
  }
});

//https://f12-telebot.herokuapp.com/api/test/f12Done
router.get('/test/:key', function(req, res, next){
    bot.sendMessage(
            global_msg_id, //msg.id
            `${req.params.key}`
    );
    res.json(req.params.key);
});


module.exports = router;
