module.exports = function(syntaxTest) {
    var anymatch = require('anymatch');
    //pattterns matching using regular expressions
    var matchers = [/\b(BI|bi|Bi)$/, /\b(TR|tr)[ \t][0-9]{4}[ \t][1-9][0-9]{0,4}[ \t][9][8][0-9]{8}$/];
    return anymatch(matchers, syntaxTest, true);
}

// [ \t][0-9]{4}