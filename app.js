//* Import External Modules
const { Telegraf } = require('telegraf');

//* Init Configs
require('dotenv').config({path: 'config/config.env'});

const bot = new Telegraf(process.env.BOT_TOKEN);

//? START CODING HERE



//? END CODING HERE