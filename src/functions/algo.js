const maxDistance = 0;
// if exact match, maxDistance = 0
// if similarity match, input maxDistance with maximum percentage of differences
const maxSimilarity = 0.9;
const maxRow = 3;
const maxCol = 2;

/* addSimilarity Function */
// Fungsi untuk menambahkan index dan dist ke ListOfSimilarity dengan penambahan yang terurut dari dist terkecil ke terbesar dan terbatas dengan 3 elemen list
function addSimilarity(index, dist, ListOfSimilarity) {
  // add  tuple index and dist to ListOfSimilarity
  // if list empty, add to first index
  // if list not empty and not full add with ascending order
  // if list full, add with ascending order and remove last index
  if (ListOfSimilarity[0][0] == null) {
    ListOfSimilarity[0][0] = index;
    ListOfSimilarity[0][1] = dist;
  } else {
    for (let i = 0; i < maxRow; i++) {
      if (ListOfSimilarity[i][0] == null) {
        ListOfSimilarity[i][0] = index;
        ListOfSimilarity[i][1] = dist;
        break;
      }
      if (ListOfSimilarity[i][1] >= dist) {
        for (let j = maxRow - 1; j > i; j--) {
          ListOfSimilarity[j][0] = ListOfSimilarity[j - 1][0];
          ListOfSimilarity[j][1] = ListOfSimilarity[j - 1][1];
        }
        ListOfSimilarity[i][0] = index;
        ListOfSimilarity[i][1] = dist;
        break;
      }
    }
  }
}

/* computeBorder Function for KMPMatch */
// Fungsi untuk menghitung border dari pattern yang digunakan untuk algoritma KMP. Border adalah panjang suffix terpanjang dari prefix pattern yang merupakan prefix pattern juga.
function computeBorder(pattern) {
  let border = [];
  border[0] = 0;

  let n = pattern.length;
  let j = 0;
  i = 1;
  while (i < n) {
    if (pattern[i] === pattern[j]) {
      // j + 1 characters match
      border[i] = j + 1;
      i++;
      j++;
    } else if (j > 0) {
      // j follows matching prefix
      j = border[j - 1];
    } else {
      // no matching prefix
      border[i] = 0;
      i++;
    }
  }
  return border;
}

/* Knuth-Morris-Pratt Algorithm */
// Fungsi untuk mencari pattern dalam source dengan algoritma Knuth-Morris-Pratt. Algoritma ini menggunakan border function untuk menghitung border dari pattern yang digunakan untuk mempercepat pencarian pattern dalam source.
function kmpMatch(source, pattern, maxDist = maxDistance) {
  // array of answer posibilities
  let answers = [];

  // initialize variables
  let n = source.length;
  let m = pattern.length;
  let border = computeBorder(pattern);
  let dist = 0;
  let maxD = Math.round(maxDist * m);
  let i = 0;
  let j = 0;
  // search for pattern in source
  while (i < n) {
    if (pattern[j] != source[i]) {
      dist++;
    }
    if (pattern[j] === source[i] || dist <= maxD) {
      if (j === m - 1) {
        return i - m + 1;
      }
      i++;
      j++;
    } else if (j > 0) {
      // reuse suffix of P[0..j-1]
      j = border[j - 1];
    } else {
      // no match found starting at i
      i++;
    }
  }
  // no match found
  return -1;
}

/* buildLast Function for Boyer-Moore */
// Fungsi untuk membuat last occurence dari setiap karakter dalam pattern yang digunakan untuk algoritma Boyer-Moore. Last occurence adalah index terakhir dari suatu karakter dalam pattern.
function buildLast(pattern) {
  // initialize array of length 256 with default value -1
  let last = Array(256).fill(-1);
  // calculate last occurence of each character in pattern
  for (let i = 0; i < pattern.length; i++) {
    // assign ASCII value of character as index
    last[pattern[i].charCodeAt(0)] = i;
  }
  return last;
}
/* The Boyer-Moore Algorithm */
// Fungsi untuk mencari pattern dalam source dengan algoritma Boyer-Moore. Algoritma ini menggunakan last occurence dari setiap karakter dalam pattern untuk mempercepat pencarian pattern dalam source.
function bmMatch(source, pattern, maxDist = maxDistance) {
  // initialize variables
  let last = buildLast(pattern);
  let n = source.length;
  let m = pattern.length;
  let dist = 0;
  let maxD = Math.round(maxDist * m);
  let i = m - 1;
  let j = m - 1;
  // search for pattern in source
  if (i > n - 1) {
    // pattern is longer than source
    return -1;
  }
  do {
    if (pattern[j] != source[i]) {
      dist++;
    }
    if (pattern[j] === source[i] || dist <= maxD) {
      if (j === 0) {
        // match found
        return i;
      } else {
        // looking-glass technique
        i--;
        j--;
      }
    } else {
      // character jump technique
      let lo = last[source[i].charCodeAt(0)];
      i = i + m - Math.min(j, 1 + lo);
      j = m - 1;
    }
  } while (i <= n - 1);
  // no match found
  return -1;
}

/* Hamming Distance */
// Fungsi untuk menghitung hamming distance dari dua string. Hamming distance adalah jumlah karakter yang berbeda dari dua string yang memiliki panjang yang sama.
function hammingDistance(s1, s2) {
  let n = s1.length;
  let m = s2.length;
  let distance = 0;
  if (n != m) {
    return -1;
  } else {
    for (let i = 0; i < n; i++) {
      if (s1[i] != s2[i]) {
        distance++;
      }
    }
  }
  return distance;
}

// Distance in hammingDistance with source and pattern
// Fungsi untuk mencari jarak terdekat dari pattern dengan source. Jarak terdekat adalah hamming distance terkecil dari pattern dengan substring dari source yang memiliki panjang yang sama dengan pattern.
function Distance(source, pattern) {
  let ns = source.length;
  let np = pattern.length;
  let distance = np;
  let s1 = "";
  let s2 = pattern;
  for (let i = 0; i < ns - np; i++) {
    s1 = source.substring(i, i + np);
    let distTemp = hammingDistance(s1, s2);
    if (distTemp < distance) {
      distance = distTemp;
    }
  }
  if (ns === np) {
    return hammingDistance(source, pattern);
  }
  return distance;
}

/* Levenshtein Distance */
function levenshteinDistance(s1, s2) {
  let m = s1.length;
  let n = s2.length;
  let dp = [];
  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  return dp[m][n];
}

/* Calculator +, -, *, /, ^, (, ) from string */
function calculate(expression) {
    
  // Convert the expression string to an array of tokens
  let tokens = expression.match(/\d+|\+|\-|\*|\/|\^|\(|\)/g);

  // change if there is negative number 
  if (tokens[0]=='-'){
    tokens[0] = '0'
    tokens[1] = '-' + tokens[1]
    tokens.shift();
  }
  // change all (-a) to (0-a)
  for (let i = 0; i < tokens.length; i++) {
      if (tokens[i] == '(' && tokens[i+1] == '-'){
          tokens.splice(i+1, 0, '0');
      }
  }

  // Define a function to handle exponentiation
  function power(base, exponent) {
    return Math.pow(base, exponent);
  }

  // Define a function to handle multiplication and division
  function multiplyOrDivide(a, op, b) {
    if (op === "*") {
      return a * b;
    } else if (op === "/") {
      return a / b;
    }
  }

  // Define a function to handle addition and subtraction
  function addOrSubtract(a, op, b) {
    if (op === "+") {
      return a + b;
    } else if (op === "-") {
      return a - b;
    }
  }

  // calculate the expression using the Shunting Yard algorithm
  let outputQueue = [];
  let operatorStack = [];

  let precedence = {
    "+": 1,
    "-": 1,
    "*": 2,
    "/": 2,
    "^": 3,
  };
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];
    if (/\d+/.test(token)) {
      outputQueue.push(Number(token));
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.pop();
    } else if (token in precedence) {
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] in precedence &&
        precedence[token] <= precedence[operatorStack[operatorStack.length - 1]]
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  }

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop());
  }

  // calculate the expression using Reverse Polish notation
  let stack = [];

  for (let i = 0; i < outputQueue.length; i++) {
    let token = outputQueue[i];

    if (typeof token === "number") {
      stack.push(token);
    } else {
      let b = stack.pop();
      let a = stack.pop();

      if (token === "+") {
        stack.push(addOrSubtract(a, token, b));
      } else if (token === "-") {
        stack.push(addOrSubtract(a, token, b));
      } else if (token === "*") {
        stack.push(multiplyOrDivide(a, token, b));
      } else if (token === "/") {
        stack.push(multiplyOrDivide(a, token, b));
      } else if (token === "^") {
        stack.push(power(a, b));
      }
    }
  }
  // Return the result
  return stack.pop();
}

/* Calender */
function getDayName(str) {
  /* Pengguna memasukkan input berupa tanggal, lalu chatbot akan 
    merespon dengan hari apa di tanggal tersebut. Contohnya adalah 
    25/08/2023 maka chatbot akan menjawab dengan hari senin. */
  //  format check
  // 2023-08-25 or 25-08-2023
  // wrong format 25-08-2023
  if ((str[2] == "-" || str[2] == "/") && (str[5] == "-" || str[5] == "/")) {
    // re-arrange to correct format
    // split "-" and "/"
    let temp = str.split(/[-/]/);
    if (temp[0].length == 4) {
      str = temp[0] + "-" + temp[1] + "-" + temp[2];
    } else {
      str = temp[2] + "-" + temp[1] + "-" + temp[0];
    }
  }
  let date = new Date(str);
  let day = date.getDay();
  let dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let namaHari = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  return namaHari[day];
}

// database berisi element berupa object yang memiliki atribut question dan answer
// question berisi string yang berisi pertanyaan dari user
// algorithm berisi string yang berisi function algoritma yang digunakan untuk menjawab pertanyaan tersebut

// Fungsi untuk mencari jawaban dari pertanyaan yang diberikan oleh user dengan menggunakan algoritma yang dipilih oleh user.
function getIdResponse(question, database, algorithm) {
  // search for exact question
  // return boolean and (index of database or list of index of database)
  // convert to lowercase the question
  question = question.toLowerCase();
  for (let idx = 0; idx < database.length; idx++) {
    // algorithm(source, pattern) -> the source should be longer than or equal to pattern
    let source = database[idx].question;
    let pattern = question;
    let temp = "";
    // convert to lowercase the source
    source = source.toLowerCase();
    // ASUMSI: source lebih panjang dari pattern, jika tidak maka tukar
    if (source.length < pattern.length) {
      temp = source;
      source = pattern;
      pattern = temp;
    }
    let answer = algorithm(source, pattern);
    if (answer != -1) {
      // Found the answer
      return [true, idx];
    }
  }

  // if not found, search for similar question
  let ListOfSim = new Array(maxRow);
  for (let i = 0; i < 3; i++) {
    ListOfSim[i] = new Array(maxCol);
  }
  let dist = 0;
  for (let idx = 0; idx < database.length; idx++) {
    // algorithm(source, pattern) -> the source should be longer than or equal to pattern
    let source = database[idx].question;
    let pattern = question;
    let temp = "";
    // convert to lowercase the source
    source = source.toLowerCase();
    // ASUMSI: source lebih panjang dari pattern, jika tidak maka tukar
    if (source.length < pattern.length) {
      temp = source;
      source = pattern;
      pattern = temp;
    }
    // add to ListOfSim
    dist = Distance(source, pattern);
    addSimilarity(idx, dist, ListOfSim);
      "source: " + source,
      "pattern: " + pattern,
      "idx: " + idx,
      "question: " + question,
      "dist: " + dist
  }
  // first: top one at least 90% similar
  let m = question.length; // length of question
  let similarity_question = m - ListOfSim[0][1];
  similarity_question = similarity_question / m;
  if (similarity_question >= maxSimilarity) {
    return [true, ListOfSim[0][0]];
  }
  // second: top three in order of similarity
  return [false, ListOfSim];
}

// Fungsi untuk mengecek apakah pertanyaan yang diberikan oleh user sudah ada di database atau belum dengan menggunakan algoritma hammingDistance.
function isThereQuestion(question, database) {
    // search for exact question
    // return boolean
    let found = false;
    question = question.toLowerCase();
    for (let idx = 0; idx < database.length; idx++) {
        qDb = database[idx].question;
        qDb = qDb.toLowerCase();
        if (hammingDistance(question, qDb) == 0) {
            found = true;
            break;
        }
    }
    return found;
}

let myArray = [
    { question: 'What is your name?', answer: 'My name is John.' },
    { question: 'Where do you live?', answer: 'I live in New York.' },
    { question: 'What is your FAVORITE color?', answer: 'My favorite color is blue.' },
    { question: 'Ibukota Indonesia', answer: 'Jakarta' },
    { question: 'Ibukota Inggris', answer: 'London' },
    { question: '1234567890', answer: 'My n is 10.'}
  ];

module.exports = { calculate, getDayName, getIdResponse, bmMatch, kmpMatch, isThereQuestion };
