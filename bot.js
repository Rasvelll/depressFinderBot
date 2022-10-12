const {Telegraf} = require('telegraf')
require('dotenv').config()
const bot = new Telegraf(process.env.BOT_TOKEN);
let array = ['депрессия', 'депресс', 'грусть']
let array2 = ['синельников', 'макконелл', 'синьк', 'бабк']

bot.start((ctx) => ctx.reply(`Теперь я слежу за вами`));


bot.use((ctx) => {
    let message = ctx.message.text.toString().toLowerCase()
    let arr = array2.concat(array)
    for (let el of arr) {
        if (message.includes(el)) {
            sendMessage(ctx, el)
            break
        }
    }
})

function sendMessage(ctx, message) {
    if (array.indexOf(message) !== -1) {
        ctx.reply('@' + ctx.message.from.username + " держись. Вот тебе психолог")
        ctx.replyWithPhoto({source: 'images/1.jpg'})
    } else if (array2.indexOf(message) !== -1) {
        ctx.reply('@' + ctx.message.from.username + " тут даже я не в помощь")
    }
}

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));