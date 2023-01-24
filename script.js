  // take refrence 
  const options = document.querySelector(".options").children;
  const answerTrackerContainer = document.querySelector(".answers-tracker");
  const questionNumberSpan = document.querySelector(".question-num-value");
  const totalQuestionSpan = document.querySelector(".total-question");
  const correctAnswerSpan = document.querySelector(".correct-answers");
  const totalQuestionSpan2 = document.querySelector(".total-question2");
  const percentage = document.querySelector(".percentage");
  const question = document.querySelector(".question");
  const op1 = document.querySelector(".option1");
  const op2 = document.querySelector(".option2");
  const op3 = document.querySelector(".option3");
  const op4 = document.querySelector(".option4");
  let questionIndex;
  let index = 0;
  let myArray = [];
  let myArr = [];
  let score = 0;

  // questions and options and answers
  // creat arrey of an object
  const questions = [{
          q: 'HTML stands for- ',
          options: ['A.HighText Machine Language', 'B.Hypertext Markup Language', 'C.HyperText and links Markup Language', 'D.none'],
          answer: 2
      },
      {
          q: 'The correct sequence of HTML tags for starting a webpage is -',
          options: ['A.Head, Title, HTML, body', 'B.HTML, Body, Title, Head', 'C.HTML, Head, Title, Body', 'D.HTML, Head, Title, Body'],
          answer: 3
      },
      {
          q: 'Which of the following element is responsible for making the text bold in HTML?',
          options: ['A.&ltpre&gt', 'B.&ltp&gt', 'C.&ltbr&gt', 'D.&ltb&gt'],
          answer: 4
      },
      {
          q: 'Which of the following tag is used for inserting the largest heading in HTML?',
          options: ['A.&lth1&gt', 'B.&lth2&gt', 'C.&lth3&gt', 'D.&lth4&gt'],
          answer: 1
      },
      {
          q: 'CSS stands for -',
          options: ['A.Cascade style sheets', 'B.Color and style sheets', 'C.Cascading style sheets', 'D.none'],
          answer: 3
      },
      {
          q: ' Which of the following is the correct syntax for referring the external style sheet?',
          options: ['A.&ltstyle src = example.css&gt', 'B.&ltstyle src = "example.css" &gt', 'C.&ltstylesheet&gt example.css &lt/stylesheet&gt', 'D.&ltlink rel="stylesheet" type="text/css" href="example.css"&gt'],
          answer: 4
      },
      {
          q: ' The CSS property used to specify the transparency of an element is -',
          options: ['A.opacity', 'B.filter', 'C.visibility', 'D.overlay'],
          answer: 1
      },
      {
          q: 'Which type of JavaScript language is _',
          options: ['A.Object-Oriented', 'B.Object-Based', 'C.Assembly-language', 'D.High-level'],
          answer: 2
      },
      {
          q: 'What Is fullform of CPU',
          options: ['A.Central preprocessing unit', 'B.Central processing unit', 'C.Center processing unit', 'D.none'],
          answer: 2
      },
      {
          q: 'How to select the elements with the class name "example"?',
          options: ['A.example', 'B.#example', 'C. .example', 'D.Class example'],
          answer: 3
      },




  ]

  // set questions and options and question number
  totalQuestionSpan.innerHTML = questions.length;

  function load() {
      questionNumberSpan.innerHTML = index + 1;
      question.innerHTML = questions[questionIndex].q;
      op1.innerHTML = questions[questionIndex].options[0];
      op2.innerHTML = questions[questionIndex].options[1];
      op3.innerHTML = questions[questionIndex].options[2];
      op4.innerHTML = questions[questionIndex].options[3];
      index++;
  }

  function check(element) {
      if (element.id == questions[questionIndex].answer) {
          element.classList.add("correct");
          updateAnswerTracker("correct")
          score++;
          console.log("score:" + score)
      } else {
          element.classList.add("wrong");
          updateAnswerTracker("wrong")

      }
      disabledOptions()
  }

  function disabledOptions() {
      for (let i = 0; i < options.length; i++) {
          options[i].classList.add("disabled");
          if (options[i].id == questions[questionIndex].answer) {
              options[i].classList.add("correct");
          }

      }
  }

  function enableOptions() {
      for (let i = 0; i < options.length; i++) {
          options[i].classList.remove("disabled", "correct", "wrong");
      }
  }

  function validate() {
      if (!options[0].classList.contains("disabled")) {
          alert("Please Select one option")
      } else {
          enableOptions();
          randomQuestion();
      }
  }

  function next() {
      validate();
  }

  function randomQuestion() {
      let randomNumber = Math.floor(Math.random() * questions.length);
      let hitDuplicate = 0;
      if (index == questions.length) {
          quizOver();
      } else {
          if (myArray.length > 0) {
              for (let i = 0; i < myArray.length; i++) {
                  if (myArray[i] == randomNumber) {
                      hitDuplicate = 1;
                      break;
                  }
              }
              if (hitDuplicate == 1) {
                  randomQuestion();
              } else {
                  questionIndex = randomNumber;
                  load();
                  myArr.push(questionIndex);
              }
          }
          if (myArray.length == 0) {
              questionIndex = randomNumber;
              load();
              myArr.push(questionIndex);
          }

          myArray.push(randomNumber);

      }
  }

  function answerTrakcer() {
      for (let i = 0; i < questions.length; i++) {
          const div = document.createElement("div")
          answerTrackerContainer.appendChild(div);
      }
  }

  function updateAnswerTracker(classNam) {
      answerTrackerContainer.children[index - 1].classList.add(classNam);
  }

  function quizOver() {
      document.querySelector(".quiz-over").classList.add("show");
      correctAnswerSpan.innerHTML = score;
      totalQuestionSpan2.innerHTML = questions.length;
      percentage.innerHTML = (score / questions.length) * 100 + "%";
  }

  function tryAgain() {
      window.location.reload();
  }

  window.onload = function() {
      randomQuestion();
      answerTrakcer();

  }