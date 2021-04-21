const { Telegraf } = require('telegraf')
const bot = new Telegraf('1624459162:AAHHq3De38qWSvN2MoMHDyZtdV2x22WGqMs');
/*bot.on('message', ctx => {
    msg = ctx.message.text.toUpperCase()
    ctx.reply('Все говорят '+ msg + ', а ты купи слона ))')});*/
bot.hears(['привет', 'Привет'], ctx => ctx.reply('Привет!Напиши орел или решка. Или можешь сгенерировать пароль из 12 символов, просто напиши "Пароль".'));
bot.hears(['орел', 'решка', 'Орел', 'Решка','орёл', 'Орёл'], ctx => {
    const num = Math.floor(Math.random() * 2);
    ctx.reply(num == 0 ? 'Орел' : 'Решка')
})
bot.hears(['pass', 'Pass', 'Пароль', 'пароль'], ctx => {
    let pass = '';
    const simbols = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!#$%^&'
    for (let i = 0; i < 12; i++) {
        pass += simbols[Math.floor(Math.random() * simbols.length)]
    }
    ctx.reply(pass);
})
bot.launch();
