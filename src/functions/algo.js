const maxDistance = 0.2;
/* computeBorder Function for KMPMatch */
function computeBorder(pattern) {
    let border = [];
    border[0] = 0;

    let n = pattern.length;
    let j = 0; i = 1;
    while (i < n) {
        if (pattern[i] == pattern[j]) {
            // j + 1 characters match
            border[i] = j + 1;
            i++; j++;
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
function kmpMatch(source, pattern, maxDist = maxDistance) {
    console.log("kmpMatch");
    // initialize variables
    let n = source.length;
    let m = pattern.length;
    let border = computeBorder(pattern);
    let dist = 0;
    let maxD = Math.round(maxDist * m);
    let i = 0; let j = 0;
    console.log("maxD : " + maxD);
    console.log("border : " + border);
    console.log("length source  : " + n);
    console.log("length pattern : " + m);
    // search for pattern in source
    while (i < n) {
        // console.log("i : " + i);
        // console.log("j : " + j);
        // console.log("n : " + n);
        if (pattern[j] != source[i]) {
            dist++;
        }
        if (pattern[j] == source[i] || dist <= maxD) {
            // match found at i - m + 1, if j == m - 1
            // console.log("enter match " + i + " " + j);
            if (j == m - 1) {
                return i - m + 1;
            }
            i++; j++;
        } else if (j > 0) {
            // console.log("reuse suffix")
            // reuse suffix of P[0..j-1]
            j = border[j - 1]; 
        } else {
            // console.log("enter else");
            // no match found starting at i
            i++;
        }
    }
    // no match found
    return -1; 
}

/* buildLast Function for Boyer-Moore */
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
function bmMatch(source, pattern, maxDist = maxDistance) {
    console.log("bmMatch");
    // initialize variables
    let last = buildLast(pattern);
    let n = source.length;
    let m = pattern.length;
    let dist = 0;
    let maxD = Math.round(maxDist * m);
    let i = m - 1; let j = m - 1;
    console.log("maxD : " + maxD);
    console.log("length source  : " + n);
    console.log("length pattern : " + m);
    // search for pattern in source
    if (i > n - 1) {
        // pattern is longer than source
        return -1;
    }
    do {
        if (pattern[j] != source[i]) {
            dist++;
        }
        if (pattern[j] == source[i] || dist <= maxD) {
            if (j == 0) {
                // match found
                return i;
            } else {
                // looking-glass technique
                i--; j--;
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
    console.log("tokens : " + tokens);  

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
    console.log("tokens.length : " + tokens.length);
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        // console.log("token : " + token);
        if (/\d+/.test(token)) {
            outputQueue.push(Number(token));
        } else if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
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
    console.log("outputQueue : " + outputQueue);

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

function calc(str) {    
    return eval(str);
}

/* Calender */
function calendar(str){
    /* Pengguna memasukkan input berupa tanggal, lalu chatbot akan 
    merespon dengan hari apa di tanggal tersebut. Contohnya adalah 
    25/08/2023 maka chatbot akan menjawab dengan hari senin. */
    //  format check
    // 2023-08-25 or 25-08-2023
    // wrong format 25-08-2023
    if ((str[2] == "-" || str[2]=="/") && (str[5] == "-" || str[5]=="/")){
        // re-arrange to correct format
        // split "-" and "/"
        let temp = str.split(/[-/]/);
        if (temp[0].length == 4){
            str = temp[0] + "-" + temp[1] + "-" + temp[2];
        } else {
            str = temp[2] + "-" + temp[1] + "-" + temp[0];
        }
    }
    let date = new Date(str);
    let day = date.getDay();
    let dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let namaHari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return namaHari[day];
}

// example
// let source = "abcd";
// let pattern = "c";
// let source = "KKabaabacaBaabaasarabaabacg";
// let pattern = "abAabAC";
// // change all pattern to lowercase
// pattern = pattern.toLowerCase();

// console.log("Knuth-Morris-Pratt");
// let index = kmpMatch(source, pattern);
// console.log(index); 

// console.log("\nBoyer-Moore");
// let index2 = bmMatch(source, pattern);
// console.log(index2);

// console.log("\nCalculator");
// let str = "kalkulasikan ini 3*((1   + 1) ^3)*(7+3)+1";
// console.log(calculate(str));

// console.log("\nCalender");
// let str2 = "25-08/2053";
// console.log(calendar(str2));
// let str3 = "2023/08-25";
// console.log(calendar(str3));
// let str4 = "2023p08-25";
// if (calendar(str4) == undefined){
//     console.log("Wrong format");
// } else {
// console.log(calendar(str4));
// }
// let str5 = "2023-04-25";
// console.log(calendar(str5));

module.exports = {calculate, calendar}
