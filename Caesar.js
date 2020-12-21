var fs = require('fs');
var text = fs.readFileSync('Alice.txt');
text = text.toString();
var realFrequency = {
    'e': 12.7, 't': 9.06, 'a': 8.17,
    'o': 7.51, 'i': 6.97, 'n': 6.75,
    's': 6.33, 'h': 6.09, 'r': 5.99,
    'd': 4.25, 'l': 4.03, 'c': 2.78,
    'u': 2.76, 'm': 2.41, 'w': 2.36,
    'f': 2.23, 'g': 2.02, 'y': 1.97,
    'p': 1.93, 'b': 1.49, 'v': 0.98,
    'k': 0.77, 'x': 0.15, 'j': 0.15,
    'q': 0.1, 'z': 0.05
};
console.log(caesarDecode(caesarCode(text, 20)));//Второй аргумент к функции caesarCode - Сдвиг
function caesarCode(text, shift) {
    var codedMessage = new String;
    if (shift > 25)
        shift = shift % 26;
    else if (shift < 0) {
        shift = (26 + shift % 26) % 26
    }
    var isLetter = /[a-z]/i;
    for (let i = 0; i < text.length; i++) {
        var codedChar = new String;
        var charCodeWithShift = text.charCodeAt(i) + shift;
        if (text.charAt(i).match(isLetter)) {
            if (text.charCodeAt(i) > 64 && text.charCodeAt(i) < 91) {
                if (charCodeWithShift < 91)
                    codedChar = String.fromCharCode(charCodeWithShift);
                else
                    codedChar = String.fromCharCode(charCodeWithShift - 26)
            }
            else if (text.charCodeAt(i) > 96 && text.charCodeAt(i) < 123) {
                if (charCodeWithShift < 123)
                    codedChar = String.fromCharCode(charCodeWithShift);
                else
                    codedChar = String.fromCharCode(charCodeWithShift - 26)
            }
        }
        else codedChar = text[i]
        codedMessage += codedChar;
    }
    return codedMessage
}

function caesarDecode(text) {
    var requiredShift;
    var minDifference = Number.MAX_VALUE;
    for (var i = 0; i <= 25; i++) {
        var currentFrequency = frequencyInText(caesarCode(text, i));
        var currentDiffernce = 0;
        for (var letter in currentFrequency) {
            currentDiffernce += Math.abs(currentFrequency[letter] - realFrequency[letter]);
        }
        if (currentDiffernce < minDifference) {
            requiredShift = i;
            minDifference = currentDiffernce;            
        }
    }
    var decodedMessage = new String;
    decodedMessage = caesarCode(text, requiredShift)
    console.log('Shift was ' + (26 - requiredShift))
    return decodedMessage;
}

function frequencyInText(text) {
    var currentFrequency = new Array;
    var isLetter = /[a-z]/i;
    for (var i = 0; i < text.length; i++) {
        if (currentFrequency[text.charAt(i).toLowerCase()] == undefined && text.charAt(i).match(isLetter)) {
            currentFrequency[text.charAt(i).toLowerCase()] = 1;
        }
        else if (text.charAt(i).match(isLetter)) {
            currentFrequency[text.charAt(i).toLowerCase()]++;
        }        
    }    
    for (var letter in currentFrequency) {
        currentFrequency[letter] = 100 * currentFrequency[letter] / text.length;        
    }    
    return currentFrequency;
}
