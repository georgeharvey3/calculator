
let num_words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero'];

let screen_data = document.getElementById("result");

let store = null;
let opReq = null;
let decimalPressed = false;
let calcJustMade = false;
let lastCalc = null;
let lastPressed = null;
let lastStore = null;

let remember = null;


const numPress = function (e) {

    if (lastPressed == 'op') {
        screen_data.textContent = ''; 
    }
    
    if (screen_data.textContent.length < 20) {
        screen_data.textContent = screen_data.textContent + e.srcElement.textContent.trim();
    }

    lastPressed = 'num';
    calcJustMade = false;
}

num_words.forEach(word => {
    elem = document.getElementById(word);
    elem.addEventListener('click', numPress);
})

const decPress = function (e) {
    if (lastPressed == 'op') {
        screen_data.textContent = ''; 
    }
    
    if (decimalPressed == false) {
        if (lastPressed != num) {
            screen_data.textContent = '0.';
        } else {
            screen_data.textContent = screen_data.textContent + '.';
        }
        decimalPressed = true;
        calcJustMade = false;
    }

}

const decButton = document.getElementById("dec");
decButton.addEventListener('click', decPress);


const clearPress = function (e) {
    screen_data.textContent = '';
    store = null;
    opReq = null;
    lastPressed = null;
    calcJustMade = false;
    lastCalc = null;
}

const clearButton = document.getElementById("ac");
clearButton.addEventListener('click', clearPress);

const delPress = function (e) {
    screen_data.textContent = screen_data.textContent.slice(0, -1)
    calcJustMade = false;
}

const delButton = document.getElementById("del");
delButton.addEventListener('click', delPress);

const opPress = function (e) {

    if (store && lastPressed != 'op') {
        evaluate()
    }
    store = screen_data.textContent;
    opReq = e.srcElement.dataset.opval;
    lastPressed = 'op';
}

const plusButton = document.getElementById("plus");
plusButton.addEventListener('click', opPress);

const minButton = document.getElementById("minus");
minButton.addEventListener('click', opPress);

const mulButton = document.getElementById("times");
mulButton.addEventListener('click', opPress);

const divButton = document.getElementById("divide");
divButton.addEventListener('click', opPress);

const eqPress = function (e) {

    if (lastPressed != 'eq') {
        remember = screen_data.textContent;
    }

    if (lastPressed != 'eq') {
        evaluateParams(store, screen_data.textContent)
    }

    if (lastPressed == 'eq') {
        evaluateParams(screen_data.textContent, remember)
    }

    decimalPressed = false;
    lastPressed = 'eq';
}

const eqButton = document.getElementById("equal");
eqButton.addEventListener('click', eqPress);

const evaluate = function () {
    if (opReq == 'plus') {
        screen_data.textContent = plusFunc(store, screen_data.textContent)
    } else if (opReq == 'minus') {
        screen_data.textContent = minFunc(store, screen_data.textContent)
    } else if (opReq == 'times') {
        screen_data.textContent = mulFunc(store, screen_data.textContent)
    } else if (opReq == 'divide') {
        screen_data.textContent = divFunc(store, screen_data.textContent)
    }

}

const evaluateParams = function (a, b) {
    if (opReq == 'plus') {
        screen_data.textContent = plusFunc(a, b)
    } else if (opReq == 'minus') {
        screen_data.textContent = minFunc(a, b)
    } else if (opReq == 'times') {
        screen_data.textContent = mulFunc(a, b)
    } else if (opReq == 'divide') {
        screen_data.textContent = divFunc(a, b)
    }

}

const plusFunc = function (a, b) {
    aFlt = parseFloat(a);
    bFlt = parseFloat(b);
    if (isNaN(aFlt) || isNaN(bFlt)) {
        return ''
    }
    return aFlt + bFlt
}

const minFunc = function (a, b) {
    aFlt = parseFloat(a);
    bFlt = parseFloat(b);
    if (isNaN(aFlt) || isNaN(bFlt)) {
        return ''
    }
    return aFlt - bFlt
}

const mulFunc = function (a, b) {
    aFlt = parseFloat(a);
    bFlt = parseFloat(b);
    if (isNaN(aFlt) || isNaN(bFlt)) {
        return ''
    }
    return aFlt * bFlt
}
const divFunc = function (a, b) {

    aFlt = parseFloat(a);
    bFlt = parseFloat(b);
    if (isNaN(aFlt) || isNaN(bFlt)) {
        return ''
    }

    if (bFlt === 0) {
        clearScreenVar = true
        return 'Nice try'
    }
    return aFlt / bFlt
}

var down = false;
window.addEventListener("keydown", function(event) {
    if(down) return;
    down = true;

    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    if (key) {
        key.click()
        key.classList.add('pressed');
    }
}, false);

window.addEventListener("keyup", function(event) {
    down = false;
    const key = document.querySelector(`div[data-key="${event.keyCode}"]`);
    if (key) {
    key.classList.remove('pressed')
    }
}, false);