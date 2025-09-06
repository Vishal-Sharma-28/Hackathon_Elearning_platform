const question = [
    {
      question: "What does the ++ operator do in C++? ",
      answers: [
            {text:"Decrements the value of a variable by 1",correct: false},
            {text:"Adds 1 to the value of a variable",correct: true},
            {text:" Multiplies the value of a variable by 2",correct: false},
            {text:"Divides the value of a variable by 2",correct: false},
        ]
    },
    {
      question: "Which of the following is not a valid data type in C++?",
      answers: [
            {text:" float",correct: false},
            {text:" real",correct: true},
            {text:"char",correct: false},
            {text:"string",correct: false},
        ]
    },
    {
        question: "What is the correct syntax for a function declaration in C++?",
        answers: [
              {text:"functionName(parameter1, parameter2)",correct: false},
              {text:"functionName(parameter1, parameter2) returnType",correct: false},
              {text:"returnType functionName(parameter1, parameter2)",correct: true},
              {text:"returnType functionName",correct: false},
          ]
      },
      {
        question: "How do you initialize an array in C++?",
        answers: [
              {text:"array_name[size];",correct: false},
              {text:"array_name[size] = {value1, value2, value3};",correct: true},
              {text:"array_name = {value1, value2, value3};",correct: false},
              {text:"array_name[] = {value1, value2, value3};",correct: false},
          ]
      },
      {
        question: "What is the purpose of the cin object in C++?",
        answers: [
              {text:"To display output to the console",correct: false},
              {text:"To read input from the keyboard",correct: true},
              {text:"To perform arithmetic operations",correct: false},
              {text:"To define a function",correct: false},
          ]
      },
  ];
  
  const questionElement = document.getElementById("question");
  const answerButton = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  let currentQuestionIndex=0;
  let score = 0;
  
  function startQuiz(){
    currentQuestionIndex=0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
  }

  function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("Button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answers.correct)
        {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
  }
  function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
  }

  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
  }

  function showScore(){
    resetState();
    questionElement.innerHTML= `You Scored ${score} out of ${question.length}!`;
    nextButton.innerHTML= "play Again";
    nextButton.style.display = "block";
}

  function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
  }

  nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }else{
        startQuiz();
    }
  })
  startQuiz();