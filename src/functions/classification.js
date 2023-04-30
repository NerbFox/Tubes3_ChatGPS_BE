const { calculate, calendar } = require ("./algo.js");
const inputDummy = "apa itu ibukota jakarta? apa itu ibukota inggris?";
const equationRegex = /(\d+(\.\d+)?)(\s*[-+*/^]\s*\d+(\.\d+)?)+/g;
const dateRegex =  /\d{2,4}[-/\s]\d{2}[-/\s]\d{2,4}/g;
const questionRegex = /.+?([.?!]\s*|$)/g


let equationMatches = inputDummy.match(equationRegex);
let questionMatches = inputDummy.match(questionRegex)
const dateMatches = inputDummy.match(dateRegex)
if(dateMatches != null){
    equationMatches = equationMatches.filter(item => !dateMatches.includes(item));
}

console.log(equationMatches)
console.log(dateMatches)
console.log(questionMatches)

for (let date in dateMatches){
    console.log(calendar(dateMatches[date]))
}

for(let eq in equationMatches){
    console.log(calculate(equationMatches[eq]))
}