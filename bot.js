//import {sinelnikova,gorohovatskiy,inure,howDoYouFeel,fuckOff,whoAreYou,talks} from '/phrases.js'

const CHAT_JOURNALIST = -738141212
const CHAT_STUDENTS_GROUP = -1001489151844
const USERNAME = '@Rasvell'
const array = ['депрессия', 'депрес', 'груст']

const {Telegraf} = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);
const commands = require('./const')
const phrases = require('./phrases')
let rand
let talkative = false, saidGoodMorning = false
let date
bot.start((ctx) => ctx.reply('Теперь я слежу за вами'))

bot.on('text', (ctx) => {
    let line = ctx.message.text.toString().toLowerCase()
    date = new Date();
    if ((date.getDay() !== 6 && date.getDay() !== 0 && date.getHours() === 7 && !saidGoodMorning) || line.includes('доброе утро')) {
        sayGoodMorning(ctx)
        saidGoodMorning = true
    }
    if (line.match(new RegExp('хехе'))) {
        laugh(ctx)
    }

    let name = '@' + ctx.message.from.username


    if (array.some(el => line.includes(el))) {
        ctx.reply(name + " Держись. Вот тебе психолог")
        ctx.replyWithPhoto({source: 'sources/1.jpg'})
    } else if (line.includes('иди ты')) {
        ctx.reply(name + " ля, та за шо?")
    } else if (line.match(new RegExp('бот[,. ]+?иди нах'))) {
        ctx.reply(name + ' ' + phrases.get('отвали')[randomise(0, phrases.get('отвали').length)])
    } else {
        let chatId = ctx.message.chat.id
        if (chatId === CHAT_STUDENTS_GROUP || chatId === CHAT_JOURNALIST || name === USERNAME) {
            let array2 = ['синельников', 'макконелл', 'синьк', 'бабк']

            if (array2.some(el => line.includes(el))) {
                ctx.reply(name + ' ' + phrases.get('синька')[randomise(0, phrases.get('синька').length)])
            }

            array2 = ['горош', 'горохова', 'горохова', 'дед']
            if (array2.some(el => line.includes(el))) {
                ctx.reply(name + ' ' + phrases.get('горошек')[randomise(0, phrases.get('горошек').length)])
            }
        }
        if (chatId === CHAT_JOURNALIST || name === USERNAME) {

            if (line.split(' ').some(el => Object.is(el, 'иб'))) {
                ctx.reply(name + ' ' + phrases.get('ИБ')[randomise(0, phrases.get('ИБ').length)])
            }
        }
    }

    if (line.match(new RegExp('бот[,. ]+?давай поговорим'))) {
        if (talkative) {
            ctx.reply('НУ ДАВАЙ')
        } else {
            talkative = true
            ctx.reply(name + " давай")
        }

    } else if (line.match(new RegExp('бот[,. ]+?помолчи'))) {
        if (!talkative) {
            ctx.reply('та я ж молчу')
        } else {
            talkative = false
            ctx.reply('ок')
        }

    } else if (talkative) {
        let answer = talk(line)
        if (answer !== null) {
            ctx.reply(answer)
        }
    }


})

function talk(line) {
    const arrHowAreYou = ['как ты?', 'что ты сегодня', 'что думаешь?', 'что скажешь?', 'расскажи что-то']
    const arrWhoAreYou = ['кто ты?', 'ты кто?']

    if (arrHowAreYou.some(el => line.includes(el))) {
        return phrases.get('как ты')[randomise(0, phrases.get('как ты').length)]
    } else if (arrHowAreYou.some(el => line.includes(el))) {
        return phrases.get('кто ты')[randomise(0, phrases.get('кто ты').length)]
    } else {
        return phrases.get('разговоры')[randomise(0, phrases.get('разговоры').length)]
    }


    return null
}

function sayGoodMorning(cxt) {
    cxt.reply('Доброе утро!');
    cxt.replyWithVoice({source: 'sources/audio_2022-10-13_21-17-09.ogg'})
}

function laugh(cxt) {
    cxt.reply('хехе');
    cxt.replyWithVoice({source: 'sources/Mashtalir.mp3'})
}

function randomise(min, max) {
    return Math.floor(Math.random() * max) + min

}

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
