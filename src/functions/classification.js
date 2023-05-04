dummyDb = [
    { q: "apa itu ibukota jakarta?", a: "jakarta bukan negara goblok" },
    {
      q: "rava ganteng ngga?",
      a: "ganteng itu relatif, tapi menurut ku iya dong :3",
    },
    { q: "apakah itb susah?", a: "ngga gampang" },
  ];
  
  const inputDummy =
    "7-8+(9*4) dan 5*2*3 dan 7*(5/3) dan 2*(5*(5*2+2))";
  
  function classification(question) {
    //cocokin string input ke yang ada di db, kalo cocok update jawaban, kalo ngga cocok tambahin
    let typeArray = [];
    let questionArray = [];
    const equationRegex = /(\d+(\.\d+)?)(\s*[-+*/^]\s*(\d+(\.\d+)?|\((.*?)\)))+/g;
    const dateRegex = /\d{2,4}[-/\s]\d{2}[-/\s]\d{2,4}/g;
    const addQueryRegex = /(?<=tambah pertanyaan).*?(?= dan|$)/gi;
    const eraseQueryRegex = /(?<=hapus pertanyaan).*?(?= dan|$)/gi;
    const questionWithAndRegex = /.+?([.?!]\s*|$)/g;
    const questionRegex = /.+?(?:(?:[.?!]\s*)|(?:dan\s+)|$)/g;
    let equationMatches = question.match(equationRegex);
  //   let equationWithParenthesisMatches = question.match(equationWithParenthesisRegex)
    let questionWithAndMatches = question.match(questionWithAndRegex);
    let questionMatches = question.match(questionRegex);
    const dateMatches = question.match(dateRegex);
    const addQueryMatches = question.match(addQueryRegex);
    const eraseQueryMatches = question.match(eraseQueryRegex);
    if (dateMatches != null) {
      equationMatches = equationMatches.filter(
        (item) => !dateMatches.includes(item)
      );
    }
    // console.log(questionMatches)
    // console.log(questionWithAndMatches)
    if (dateMatches != null) {
      for (let date in dateMatches) {
        // console.log(getDayName(dateMatches[date]))
        typeArray.push(1);
        questionArray.push(dateMatches[date]);
      }
    }
  
    if (equationMatches != null) {
      for (let eq in equationMatches) {
        // console.log(calculate(equationMatches[eq]))
          typeArray.push(2);
          questionArray.push(equationMatches[eq]);
       }
      // for (let eq in equationWithParenthesisMatches){
      //     typeArray.push(2);
      //     questionArray.push(equationWithParenthesisMatches[eq]);
      // }
    }
  
    if (addQueryMatches != null) {
      for (let add in addQueryMatches) {
        typeArray.push(3);
        questionArray.push(addQueryMatches[add]);
      }
    }
  
    if (eraseQueryMatches != null) {
      for (let era in eraseQueryMatches) {
        typeArray.push(4);
        questionArray.push(eraseQueryMatches[era]);
      }
    }
    if (questionMatches != null && questionWithAndMatches != null) {
      // console.log(questionMatches.length)
      for (i = 0; i < questionMatches.length; i++) {
        // console.log(i)
        if (
          questionMatches[i].match(equationRegex) ||
          questionMatches[i].match(dateRegex) ||
          questionMatches[i].match(addQueryRegex) ||
          questionMatches[i].match(eraseQueryRegex)
        ) {
          continue;
        } else {
          typeArray.push(5);
          questionArray.push(questionMatches[i]);
        }
      }
  
      for (let ques in questionWithAndMatches) {
        if (
          questionWithAndMatches[ques].match(equationRegex) ||
          questionWithAndMatches[ques].match(dateRegex) ||
          questionWithAndMatches[ques].match(addQueryRegex) ||
          questionWithAndMatches[ques].match(eraseQueryRegex)
        ) {
          continue;
        } else {
          typeArray.push(5);
          questionArray.push(questionWithAndMatches[ques]);
        }
      }
    }
  
    // console.log(dateMatches)
    // console.log(addQueryMatches)
    // console.log(eraseQueryMatches)
    // console.log(filteredQM)
    // console.log(typeArray)
    // console.log(questionArray)
    // questionArray = [...new Set(questionArray)];
    return [typeArray, questionArray];
  }
  
  
  module.exports = { classification };
  
  