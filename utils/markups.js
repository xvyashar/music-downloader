const { Markup } = require('telegraf');
const { enDic, faDic } = require('./dialogs');

const langKeyoard = Markup.keyboard([
    [Markup.button.callback('En', 'En'), Markup.button.callback('Fa', 'Fa')],
]);

const mainKeyboard = (dic) => {
    return Markup.keyboard([
        [Markup.button.callback(dic.keyboardSearch, dic.keyboardSearch), Markup.button.callback(dic.keyboardSpotifyLink, dic.keyboardSpotifyLink)],
        [Markup.button.callback(dic.keyboardSoundcloudLink, dic.keyboardSoundcloudLink), Markup.button.callback(dic.keyboardYoutubeLink, dic.keyboardYoutubeLink)],
        [Markup.button.callback(dic.keyboardSettings, dic.keyboardSettings)],
    ]);
}

exports.langKeyoard = langKeyoard;
exports.mainKeyboard = mainKeyboard;