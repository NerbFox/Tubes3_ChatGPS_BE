const inputDummy = "hello can you compute this equation 40 * 5.5 - 2 / 3 + 4 + 5 * 70? and this date 02/02/0222";
const equationRegex = /(\d+(\.\d+)?)(\s*[-+*/]\s*\d+(\.\d+)?)+/;
const dateRegex =  /\d{2,4}[-/\s]\d{2}[-/\s]\d{2,4}/;

const equationMatches = inputDummy.match(equationRegex);
const dateMatches = inputDummy.match(dateRegex)


console.log(equationMatches[0])
console.log(dateMatches[0])