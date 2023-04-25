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

// example
// let source = "abcd";
// let pattern = "c";
let source = "abaabaCabaabaasarabaabacg";
let pattern = "abAabAC";
// change all pattern to lowercase
pattern = pattern.toLowerCase();

console.log("Knuth-Morris-Pratt");
let index = kmpMatch(source, pattern);
console.log(index); 

console.log("\nBoyer-Moore");
let index2 = bmMatch(source, pattern);
console.log(index2);

