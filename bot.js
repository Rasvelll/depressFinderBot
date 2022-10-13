const CHAT_JOURNALIST = -738141212
const CHAT_STUDENTS_GROUP = -1001489151844
const USERNAME = '@Rasvell'
const array = ['депрессия', 'депрес', 'груст']

const {Telegraf} = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);
const commands = require('./const')
bot.start((ctx) => ctx.reply('Теперь я слежу за вами'))
bot.command('gdmrng', (cxt) => {
    cxt.reply('Доброе утро!');
    cxt.replyWithVoice({source: 'sources/audio_2022-10-13_21-17-09.ogg'})
})
bot.on('text', (ctx) => {
    let line = ctx.message.text.toString().toLowerCase()

    let name = ''
    if (ctx.message.chat.type !== 'supergroup') {
        name = '@' + ctx.message.from.username
    }

    if (array.some(el => line.includes(el))) {
        ctx.reply(name + " Держись. Вот тебе психолог")
        ctx.replyWithPhoto({source: 'sources/1.jpg'})
    } else if (line.includes('иди ты')) {
        ctx.reply(name + " ля, та за шо?")
    } else if (line.includes('иди ты нахуй')) {
        ctx.reply(name + " сам иди")
    } else {
        let chatId = ctx.message.chat.id
        if (chatId === CHAT_STUDENTS_GROUP || name === USERNAME) {
            let array2 = ['синельников', 'макконелл', 'синьк', 'бабк']
            if (array2.some(el => line.includes(el))) {
                ctx.reply('' + name + " тут даже я не помогу")
            }
            array2 = ['горош', 'горохова', 'горохова', 'дед']
            if (array2.some(el => line.includes(el))) {
                ctx.reply(name + " , а пиво будем пить?")
            }
        }
        if (chatId === CHAT_JOURNALIST || name === USERNAME) {
            if (line.split(' ').some(el => Object.is(el, 'иб'))) {
                ctx.reply(name + " я понимаю,херово. Но держись")
            }
        }
    }
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
