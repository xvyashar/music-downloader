//* Import External Modules
const { Telegraf, Markup } = require('telegraf');

//* Init Configs
require('dotenv').config({path: 'config/config.env'});
const keyboards = require('./utils/markups');
const connectDB = require('./config/db');
const { enDic, faDic } = require('./utils/dialogs');

//* DB
connectDB();
const { getStatus, createUser, setStatus, setLang, getLang } = require('./utils/user');

const bot = new Telegraf(process.env.BOT_TOKEN);

//? START CODING HERE

bot.start(ctx => {
    ctx.reply(`Welcome ${ctx.chat.first_name}!\nPlease choose your language`, {
        reply_markup: keyboards.langKeyoard.reply_markup
    });
    createUser(ctx, { chatId: ctx.chat.id, firstName: ctx.chat.first_name, status: 'IN_LANG_MENU', lang: 'EN' });
});

bot.hears('En', async ctx => {
    if (await getStatus(ctx) === 'IN_LANG_MENU') {
        setLang(ctx, 'EN')
        setStatus(ctx, 'MAIN');
        ctx.reply(`Language set's to EN`, {
            reply_to_message_id: ctx.message.message_id
        });

        ctx.reply(enDic.dialogInMainMenu, {
            reply_markup: keyboards.mainKeyboard(enDic).reply_markup
        });
    }
});

bot.hears('Fa', async ctx => {
    if (await getStatus(ctx) === 'IN_LANG_MENU') {
        setLang(ctx, 'FA')
        setStatus(ctx, 'MAIN');
        ctx.reply('زبان به فارسی تغییر کرد', {
            reply_to_message_id: ctx.message.message_id,
            reply_markup: Markup.removeKeyboard().reply_markup
        });

        ctx.reply(faDic.dialogInMainMenu, {
            reply_markup: keyboards.mainKeyboard(faDic).reply_markup
        });
    }
});

//? END CODING HERE

bot.launch().then(res => console.log('🤖 Bot is online!'));