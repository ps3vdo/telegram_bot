const { Telegraf } = require('telegraf')
const bot = new Telegraf('1624459162:AAHHq3De38qWSvN2MoMHDyZtdV2x22WGqMs');
// bot.on('message', ctx => {
//     msg = ctx.message.text.toUpperCase()
//     ctx.reply('Все говорят '+ msg + ', а ты купи слона ))')});
	
	
bot.hears(['привет', 'Привет'], ctx => ctx.reply('Привет!Напиши орел или решка. Или можешь сгенерировать пароль из 12 символов, просто напиши "Пароль". Или напиши пример (операторы и операнды пиши через пробел!).'));
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

bot.on('message', ctx => {
	const userDataEntries = ctx.message.text.split(' ');
	const userMsg = ctx.message.text

//цифра?
const isNumber = (i) => (i >= -99999 && i <= 99999);
//оператор?
const isOperator = (i) => (i === '/' || i === '*' || i === '+' || i === '-' || i === ')' || i === '(');
//приоритет оператора
const prOp = function (i) {
	switch (i) {
		case '*':
		case '/':
			return 3
		case '+':
		case '-':
			return 2
		case '(':
			return 1
		case ')':
			return 0
	}
}
//Проверка на скобки
const isOperatorBracket = (i) => (i === ')');
//вычисление выражения	
const counting = function (arr, operatorTmp) {
	switch (operatorTmp) {
		case '+':
			return +arr[0] + +arr[1];
		case '-':
			return +arr[0] - +arr[1];
		case '*':
			return +arr[0] * +arr[1];
		case '/':
			return +arr[0] / +arr[1];
	}
}
// Считываем выражение
let str = userDataEntries;
let arrayExit = [];
let operatorArrTmp = [];
let operatorTmp;
let numTmp = [];
let testNum = [];
let exitNum = [];
let arrayTemp = [];
try {
	for (let i of str) {
		if (!isNumber(i) && !isOperator(i) || i === ' ') throw 'Символ не опознан. Операция остановлена';
		else if (isNumber(i)) arrayExit.push(i);
		else if (isOperator(i)) {
			if (operatorArrTmp.length === 0) operatorArrTmp.push(i);
			else if (isOperatorBracket(i)) {
				while (operatorTmp !== '(') {
					operatorTmp = operatorArrTmp.pop()
					if (operatorTmp === '(') {
						operatorTmp = 0;
						break;
					}
					else {
						arrayExit.push(operatorTmp);
						operatorTmp = 0;
					}
				}
			}
			else if (i === '(') operatorArrTmp.push(i);
			else {
				operatorTmp = operatorArrTmp.pop();
				if (prOp(operatorTmp) > prOp(i)) {
					arrayExit.push(operatorTmp);
					operatorArrTmp.push(i);
					operatorTmp = 0;
				}
				else if (prOp(operatorTmp) < prOp(i)) {
					operatorArrTmp.push(operatorTmp);
					operatorArrTmp.push(i);
					operatorTmp = 0;
				}
				else {
					arrayExit.push(operatorTmp);
					operatorArrTmp.push(i);
					operatorTmp = 0;
				}
			}
		}
		else throw 'Символ не опознан. Операция остановлена';
	}
	while (operatorArrTmp.length !== 0) {
		arrayExit.push(operatorArrTmp.pop());
	}
	operatorTmp = 0;
	str = arrayExit.join(' ');
	ctx.reply('Обратная польская нотация: ' +str);
	console.log('Пример пользователя: ' +userMsg);
	console.log('Обратная польская нотация: ' +str); //TODO заменить на вывод в чат
	while (arrayExit.length !== 1) {
		for (let j of arrayExit) {
			if (isNumber(j) && operatorTmp === 0 && numTmp.length < 2) {
				numTmp.push(j);
			}
			else if (isOperator(j) && numTmp.length === 2) {
				operatorTmp = j;
				arrayTemp.push(counting(numTmp, operatorTmp));
				operatorTmp = 0;
				numTmp = [];
			}
			else if (isNumber(j) && numTmp.length === 2) {
				arrayTemp.push(numTmp.shift());
				numTmp.push(j);
			}
			else if (isOperator(j) && numTmp.length === 1) {
				arrayTemp.push(numTmp.pop())
				operatorTmp = j;
				arrayTemp.push(operatorTmp);
				operatorTmp = 0;
			}
			else if (isOperator(j) && numTmp.length === 0) {
				arrayTemp.push(j);
			}
			else if (!isNumber(i) && !isOperator(i)) throw 'Символ не опознан. Операция остановлена в вычислении суммы выражения.';
		}
		arrayExit = arrayTemp;
		arrayTemp = [];
	}
	ctx.reply('Сумма выражения: ' + arrayExit);
	console.log('Сумма выражения:' + arrayExit);
} catch (e) {
	console.error(e);
	ctx.reply(e);
}
}
)
bot.launch();
