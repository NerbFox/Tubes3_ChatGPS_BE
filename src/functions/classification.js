dummyDb = [
    { q: "apa itu ibukota jakarta?", a: "jakarta bukan negara goblok" },
    {
      q: "rava ganteng ngga?",
      a: "ganteng itu relatif, tapi menurut ku iya dong :3",
    },
    { q: "apakah itb susah?", a: "ngga gampang" },
  ];
  
  const inputDummy =
    "10/20/2023/20";
    // -1+1+7-8+(9*4)+5*2*3+7*(5/3)+2*(5*(5*2+2 2(5*(5*2+2)))+(5*2) -1+1+5+2 -1+1
  
  function classification(question) {
    //cocokin string input ke yang ada di db, kalo cocok update jawaban, kalo ngga cocok tambahin
    let typeArray = [];
    let questionArray = [];
    let notFilQues = []
    let andQues = []
    const equationRegex =  /(\((.*?)\)?|-?\d+(\.\d+)?)(\s*[-+*/^]\s*(\((.*?)\)|\d+(\.\d+)?))+(\))*/g
    // /(\((.*?)\)?|-?\d+(\.\d+)?)(\s*[-+*/(^]\s*(\((.*?)\)|\d+(\.\d+)?))+(\))*/g
    // /(\((.*?)\)?|\d+(\.\d+)?)(\s*[-+*/(^]\s*(\((.*?)\)|\d+(\.\d+)?))+(\))*/g


    const dateRegex = /\d{2,4}[-/]\d{1,2}[-/]\d{2,4}/g;
    const addQueryRegex =  /(?<=tambah pertanyaan).*?(?=\.\s|$)/gi // /(?<=tambah pertanyaan).*?(?=tambah pertanyaan|$)/gis
    // /(?<=tambah pertanyaan).*?(?= dan|$)/gi;
    const eraseQueryRegex = /(?<=hapus pertanyaan).*?(?=\.\s|$)/gi// /(?<=hapus pertanyaan).*?(?= dan|$)/gi;
    const questionWithAndRegex = /.+?([.?!]\s*|$)/g;
    const questionRegex = /.+?(?:(?:[.?!]\s*)|(?:dan\s+)|$)/g;
    let equationMatches = question.match(equationRegex);
  //   let equationWithParenthesisMatches = question.match(equationWithParenthesisRegex)
    let questionWithAndMatches = question.match(questionWithAndRegex);
    let questionMatches = question.match(questionRegex);
    const dateMatches = question.match(dateRegex);
    const addQueryMatches = question.match(addQueryRegex);
    const eraseQueryMatches = question.match(eraseQueryRegex);
    if (dateMatches != null && equationMatches != null) {
      equationMatches = equationMatches.filter(
        (item) => !dateMatches.includes(item)
      );
    }
    for(let eq in equationMatches){
        for(let date in dateMatches){
          if (equationMatches[eq].includes(dateMatches[date])) {
              dateMatches.splice(date, 1);
            }
        }
      }
    
    // for (let i = equationMatches.length - 1; i >= 0; i--) {
    //   if (str.includes(arr[i])) {
    //     arr.splice(i, 1);
    //   }
    // }
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
      for (i = 0; i < questionMatches.length; i++) {
        if (
          questionMatches[i].match(equationRegex) ||
          questionMatches[i].match(dateRegex) ||
          questionMatches[i].match(addQueryRegex) ||
          questionMatches[i].match(eraseQueryRegex)
        ) {
          continue;
        } else {
          let trim = questionMatches[i].trim()
          const substring = 'dan';
          let resQues = trim.replace(new RegExp('^' + substring + '|' + substring + '$', 'g'), '');
          resQues = resQues.trim()
          resQues = resQues.replace(/\.$/, "");
          // typeArray.push(5);
          // questionArray.push(resQues);
          notFilQues.push(resQues);
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
          console.log(questionWithAndMatches[ques])
          let trim = questionWithAndMatches[ques].trim()
          const substring = 'dan';
          let resQues = trim.replace(new RegExp('^' + substring + '|' + substring + '$', 'g'), '');
          resQues = resQues.trim()
          resQues = resQues.replace(/\.$/, "");
          andQues.push(resQues);
          // typeArray.push(5);
          // questionArray.push(resQues);
        }
      }
      //filter questions
      if(addQueryMatches != null){
        for(let i in addQueryMatches){
          notFilQues = notFilQues.filter(item => !addQueryMatches[i].includes(item));
          andQues = andQues.filter(item => !addQueryMatches[i].includes(item));
        }
      }
      if(andQues != null){
        for(let i in andQues){
          notFilQues = notFilQues.filter(item => !andQues[i].includes(item));
        }
      }
      questionArray = questionArray.concat(notFilQues)
      questionArray = questionArray.concat(andQues)
      let n = notFilQues.length + andQues.length
      const filledArr = new Array(n).fill(5);
      typeArray = typeArray.concat(filledArr);

    }
    
    // console.log(equationMatches)
    // console.log(dateMatches)
    // console.log(questionArray)
    // console.log(addQueryMatches)
    // console.log(eraseQueryMatches)
    // console.log(questionMatches, questionMatches)
    // console.log(filteredQM)
    // questionArray = [...new Set(questionArray)];
    return [typeArray, questionArray];
  }
  
  classification(inputDummy)
  module.exports = { classification };

  
  
  