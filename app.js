const output = document.querySelector('.poutput'),
    buttons = document.querySelector('.buttons'),
    history = document.querySelector('.phistory')

let a = '';
let b = '';
let act = ''; //действие
let sign = true; //знак +/-
let result = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
    action = ['-', '+', '*', '/'],
    actSign = ['+/-'] //НЕ ЗАБЫТЬ!

buttons.onclick = (e) => {
    if (!e.target.classList.contains('action') && !e.target.classList.contains('digit') && !e.target.classList.contains('equal')) return; 
    //если кнопка нажата но не является цифрой или действием, то здесь не обрабатываем событие
    if (e.target.classList.contains('clear')) return; //если нажали Очистить, то здесь не обрабатываем событие

    const but = e.target.textContent;

    if (digit.includes(but)) { //если вводят цифру
        if (but==='.')
        {
            if (a!='' && act === '' && !a.includes('.'))
            {
                a += but
                output.textContent = a
                history.textContent = a
            }
            if (a!='' && act != '' && b!='' && !result && !b.includes('.'))
            {
                b += but
                output.textContent = b
                history.textContent += but
            }
            return
        } else 
        if (b === '' && act === '' && !result) {
            a += but
            output.textContent = a
            history.textContent = a
        } else 
        if (result) {
            result = false
            a = but
            output.textContent = a
            history.textContent = a
        } 
        else {
            b += but
            output.textContent = b
            history.textContent += but
            return
        }
        
    } 

    if (a === '' && b === '' && act === '' && !result) //если первым ввели -
    {
        if (but === '-') {
            a = but
            output.textContent = a
            history.textContent = a
        }
        else return
    } 

    if (action.includes(but) && output.textContent != 'Ошибка' && a!='-' && b==='') { //если вводят действие
        let hist = history.textContent
        let last = hist.length - 1
        if (result) {
            result = false
            a = output.textContent
            act = but
            output.textContent = but
            history.textContent = a + act
        } else
            if (hist[last] !== action[0] && hist[last] !== action[1] && hist[last] !== action[2] && hist[last] !== action[3]) {
                act = but
                output.textContent = act
                history.textContent += act
            }
            else {
                act = but
                history.textContent = hist.slice(0,hist.length-1) + act //чтобы в исходной строке находилась ее измененная версия, необходимо заменить всю строку
                output.textContent = act
            }
        return;
    } 
    
    if (action.includes(but) && output.textContent === 'Ошибка') clearAll() //если вводят действие после вывода Ошибки

    if (actSign.includes(but)) { //если нажимают смену знака
        if ((output.textContent === 'Ошибка') || (a === '' && !result) || (a != '' && act != '' && b === '')) { //с результатом ещё посмотреть как будет
            return // output.textContent = 0
        }
        if (a != '' && act === '' ) { //с результатом ещё посмотреть как будет
            if (sign==true) {
                a = a*(-1)
                history.textContent = a
                output.textContent = a
                sign = false
            }
            else { 
                a = a*(-1)
                history.textContent = a
                output.textContent = a
                sign = true
            }
        }
        if (a != '' && act != '' && b != '' && !result) {
            if (sign==true) {
                b = b*(-1)
                history.textContent = a + act + b 
                output.textContent = b 
                sign = false
            }
            else { 
                b = b*(-1)
                history.textContent = a + act + b 
                output.textContent = b 
                sign = true
            }
        }
        if (result) {
            if (output.textContent>=0) {
                result = false
                a = '-' + output.textContent
                history.textContent = a
                output.textContent = a
                sign = false
            }
            else {
                result = false
                let otp = output.textContent
                a = otp.slice(1,otp.length)
                history.textContent = a
                output.textContent = a
                sign = true
            }
        }
    return
    } 

    if (but === '=') {
        if (b === '') { 
            if (action.includes(history.textContent[history.textContent.length - 1])) {output.textContent = act;}
            if (digit.includes(history.textContent[history.textContent.length - 1])) {output.textContent = a;}
            return
        }
        history.textContent += '='
        switch (act) {
            case '+':
                a = (+a) + (+b)
                break;
            case '-':
                a = a - b
                break;
            case '*':
                a = a * b
                break;
            case '/':
                if (b === '0') {
                    output.textContent = 'Ошибка'
                    a = ''
                    b = ''
                    act = ''
                    sign = true
                    result = false
                    return
                }
                a = a / b
                break;
        }
        result = true
        if (a % 1 != 0) {
            var str = Number(a)
            a = parseFloat(str.toFixed(5))
        }
        output.textContent = a
        a = ''
        b = ''
        act = ''
        sign = true
    }
    return
}


document.querySelector('#btnClear').onclick = clearAll;
function clearAll() {
    a = '';
    b = '';
    act = '';
    sign = true;
    result = false;
    output.textContent = 0;
    history.textContent = '';
}