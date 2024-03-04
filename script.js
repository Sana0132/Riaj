 const quizData = [
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris'
      },
      {
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
        correctAnswer: 'Mars'
      },
      // Add more questions as needed
    ];

    let currentQuestion = 0;
    let timer;

    function loadQuestion() {
      const questionContainer = document.getElementById('question-container');
      const optionsContainer = document.getElementById('options-container');
      const timerContainer = document.getElementById('timer-container');

      questionContainer.textContent = quizData[currentQuestion].question;
      optionsContainer.innerHTML = '';

      quizData[currentQuestion].options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', checkAnswer);
        optionsContainer.appendChild(button);
      });

      // Reset the timer and hide the timer container
      clearTimeout(timer);
      timerContainer.style.display = 'none';
    }

    function checkAnswer(event) {
      const userAnswer = event.target.textContent;
      const correctAnswer = quizData[currentQuestion].correctAnswer;

      const options = document.querySelectorAll('button');
      options.forEach(option => option.removeEventListener('click', checkAnswer));

      if (userAnswer === correctAnswer) {
        // Handle correct answer logic
        alert('Correct!');
        // Move to the next question
        currentQuestion++;
        if (currentQuestion < quizData.length) {
          loadQuestion();
        } else {
          alert('Quiz completed!');
        }
      } else {
        // Handle incorrect answer logic
        alert('Incorrect. Try again!');
        // Lock options for 10 seconds
        lockOptions(10);
      }
    }

    function lockOptions(seconds) {
      const timerContainer = document.getElementById('timer-container');
      let remainingTime = seconds;

      timerContainer.style.display = 'block';

      function updateTimer() {
        timerContainer.textContent = `Retry in ${remainingTime} seconds`;
        remainingTime--;

        if (remainingTime < 0) {
          clearTimeout(timer);
          timerContainer.style.display = 'none';
          loadQuestion();
        } else {
          timer = setTimeout(updateTimer, 1000);
        }
      }

      updateTimer();
    }

    function nextQuestion() {
      if (currentQuestion < quizData.length) {
        loadQuestion();
      } else {
        alert('Quiz completed!');
      }
    }

    // Load the first question on page load
    loadQuestion();
  
