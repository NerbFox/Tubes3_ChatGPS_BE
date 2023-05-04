const arr = ["dengan jawaban iyalah masa engga",
'apakah itb gampang? ',
'dan apakah fajar sabi?'];
const str = 'rava kece ga? dengan jawaban iyalah masa engga';

const filteredArr = arr.filter(item => !str.includes(item));

console.log(filteredArr); // ['banana', 'orange', 'kiwi']

const str2 = 'aku dan dia';
const substring = 'dan';

const result = str2.replace(new RegExp('^' + substring + '|' + substring + '$', 'g'), '');

console.log(result); // ' a '