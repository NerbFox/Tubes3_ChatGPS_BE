
  function classification(question) {
    //cocokin string input ke yang ada di db, kalo cocok update jawaban, kalo ngga cocok tambahin
    let typeArray = [];
    let questionArray = [];
    let notFilQues = []
    let andQues = []
    const equationRegex =  /(\((.*?)\)?|-?\d+(\.\d+)?)(\s*[-+*/^]\s*(\((.*?)\)|\d+(\.\d+)?))+(\))*/g


    const dateRegex = /\d{2,4}[-/]\d{1,2}[-/]\d{2,4}/g;
    const addQueryRegex =  /(?<=tambah pertanyaan).*?(?=\.\s|$)/gi
    const eraseQueryRegex = /(?<=hapus pertanyaan).*?(?=\.\s|$)/gi
    const questionWithAndRegex = /.+?([.?!]\s*|$)/g;
    const questionRegex = /.+?(?:(?:[.?!]\s*)|(?:dan\s+)|$)/g;
    let equationMatches = question.match(equationRegex);

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
  
    if (dateMatches != null) {
      for (let date in dateMatches) {
        typeArray.push(1);
        questionArray.push(dateMatches[date]);
      }
    }
  
    if (equationMatches != null) {
      for (let eq in equationMatches) {
          typeArray.push(2);
          questionArray.push(equationMatches[eq]);
       }
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
          resQues = resQues.replace(/\.$/, "");;
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
        // console.log(questionWithAndMatches[ques])
          let trim = questionWithAndMatches[ques].trim()
          const substring = 'dan';
          let resQues = trim.replace(new RegExp('^' + substring + '|' + substring + '$', 'g'), '');
          resQues = resQues.trim()
          resQues = resQues.replace(/\.$/, "");
          andQues.push(resQues);
        }
      }
      //filter questions
      if(addQueryMatches != null){
        for(let i in addQueryMatches){
          notFilQues = notFilQues.filter(item => !addQueryMatches[i].includes(item));
          andQues = andQues.filter(item => !addQueryMatches[i].includes(item));
        }
      }
      if(eraseQueryMatches != null){
        for(let i in eraseQueryMatches){
          notFilQues = notFilQues.filter(item => !eraseQueryMatches[i].includes(item));
          andQues = andQues.filter(item => !eraseQueryMatches[i].includes(item));
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

    return [typeArray, questionArray];
  }
  

  module.exports = { classification };

  

  
  
  