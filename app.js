//* Import External Modules
const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');

//* Init Configs
require('dotenv').config({path: 'config/config.env'});
const keyboards = require('./utils/markups');
const connectDB = require('./config/db');
const { enDic, faDic } = require('./utils/dialogs');

//* DB
connectDB();
const { getStatus, createUser, setStatus, setLang, getLang } = require('./utils/user');

const bot = new Telegraf(process.env.BOT_TOKEN);

//* START CODING HERE

//? AUTH USER
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

//? EN
bot.hears(enDic.keyboardSearch, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        await setStatus(ctx, 'IN_SEARCHING');
        ctx.reply(enDic.dialogEnterMusicNameToSearch, {
            reply_markup: Markup.removeKeyboard().reply_markup
        });
    }
});

bot.hears(enDic.keyboardSpotifyLink, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        //TODO DOWNLOAD MUSIC VIA SPOTIFY LINK
    }
});

bot.hears(enDic.keyboardSoundcloudLink, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        //TODO DOWNLOAD MUSIC VIA SOUNDCLOUD LINK
    }
});

bot.hears(enDic.keyboardYoutubeLink, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        //TODO DOWNLOAD MUSIC VIA YOUTUBE LINK
    }
});

bot.hears(enDic.keyboardSettings, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        //TODO CHANGE SETTINGS
    }
});

//? FA
bot.hears(faDic.keyboardSearch, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        if (await getStatus(ctx) === 'MAIN') {
            await setStatus(ctx, 'IN_SEARCHING');
            ctx.reply(faDic.dialogEnterMusicNameToSearch);
        }
    }
});

bot.hears(faDic.keyboardSpotifyLink, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        //TODO DOWNLOAD MUSIC VIA SPOTIFY LINK
    }
});

bot.hears(faDic.keyboardSoundcloudLink, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        //TODO DOWNLOAD MUSIC VIA SOUNDCLOUD LINK
    }
});

bot.hears(faDic.keyboardYoutubeLink, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        //TODO DOWNLOAD MUSIC VIA YOUTUBE LINK
    }
});

bot.hears(faDic.keyboardSettings, async ctx => {
    if (await getStatus(ctx) === 'MAIN') {
        //TODO CHANGE SETTINGS
    }
});

//? EVENT'S
bot.on('message', async ctx => {
    if (await getStatus(ctx) === 'IN_SEARCHING') {
        try {
            const res = await axios.get(`https://api.spotify.com/v1/search?q=${ctx.message.text}&type=track&include_external=audio`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SPOTIFY_TOKEN}`
                }
            });

            //! NOT COMPLETED
            await setStatus(ctx, 'MAIN');
            ctx.reply(`Answer from spotify:\n${res}`);
        } catch (err) {
            const dic = await getLang(ctx) === 'EN' ? enDic : faDic;

            if (err.code === 'ERR_BAD_REQUEST') {
                await setStatus(ctx, 'MAIN');
                return ctx.reply(dic.dialogForbinned, {
                    reply_markup: keyboards.mainKeyboard(dic).reply_markup
                });
            }
            await setStatus(ctx, 'MAIN');
            console.log(err);
        }
    }
});

//* END CODING HERE

const start = async () => {
    try {
        await bot.launch();
        console.log('Bot is online!')
    } catch (err) {
        console.log(err);
    }
}

start();