/*
Det här importerar modulen Underscore.js
Det här fungerar inte rakt av i webbläsaren,
men det löser vi med hjälp av Webpack.
*/
const _ = require('underscore');

let stack = [];


/*
Moduler i JavaScript är enkla .js-filer som exponerar
funktioner i en variabel som heter exports.
Det vi gör här är helt enkelt att skapa en
funktion push som vi exporterar.
På samma sätt exporterar vi pull och pop.
*/

// Lägger ett element överst i stacken
exports.push = function (x) {
    stack.push(x);
};

// Returnerar det översta elementet i stacken och tar bort det
exports.pop = function () {
    return stack.pop();
}

// Returnerar det översta elementet i stacken
exports.peek = function () {
    return stack[0]; // Det här är medvetet felaktigt
}
