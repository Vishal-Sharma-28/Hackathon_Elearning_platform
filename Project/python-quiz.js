const question = [
    {
      question: "What does the following code output? my_list = [1, 2, 3, 4, 5] print(my_list[1:3]) ",
      answers: [
            {text:"[1, 2]",correct: false},
            {text:"[2, 3]",correct: true},
            {text:"[2, 3, 4]",correct: false},
            {text:"[1, 3]",correct: false},
        ]
    },
    {
      question: "Which of the following is not a valid variable name in Python?",
      answers: [
            {text:" my_variable",correct: false},
            {text:"123variable",correct: true},
            {text:"variable_123",correct: false},
            {text:"_variable",correct: false},
        ]
    },
    {
        question: "Which of the following is used to open a file in Python for writing?",
        answers: [
              {text:"open('file.txt', 'r')",correct: false},
              {text:"open('file.txt', 'w')",correct: false},
              {text:"open('file.txt', 'a')",correct: true},
              {text:"open('file.txt', 'x')",correct: false},
          ]
      },
      {
        question: "What does the len() function in Python return?",
        answers: [
              {text:"The total length of all elements in a list",correct: false},
              {text:"The length of a string",correct: true},
              {text:"The number of elements in a dictionary",correct: false},
              {text:"The length of an integer",correct: false},
          ]
      },
      {
        question: "What will be the output of the following code snippet? x = 5y = 2result = x ** yprint(result)",
        answers: [
              {text:"25",correct: true},
              {text:"10",correct: false},
              {text:"2.5",correct: false},
              {text:"7",correct: false},
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