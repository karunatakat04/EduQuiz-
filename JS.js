const quizData = {
  tech: [
    { q: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language"], answer: 1 },
    { q: "Which language is used for styling web pages?", options: ["HTML", "CSS", "Python", "PHP"], answer: 1 },
    { q: "Inside which HTML element do we put JavaScript?", options: ["<js>", "<scripting>", "<script>", "<javascript>"], answer: 2 },
    { q: "Which company developed Java?", options: ["Microsoft", "Google", "Sun Microsystems", "IBM"], answer: 2 },
    { q: "Which symbol is used for comments in JavaScript?", options: ["//", "/*", "#", "<!--"], answer: 0 },
    { q: "Which of these is NOT a programming language?", options: ["Python", "Ruby", "Linux", "Java"], answer: 2 },
    { q: "Which HTML tag is used to link CSS?", options: ["<style>", "<css>", "<link>", "<script>"], answer: 2 },
    { q: "Which operator is used for strict equality in JS?", options: ["==", "===", "=", "!="], answer: 1 },
    { q: "React is a ___?", options: ["Library", "Framework", "Language", "Database"], answer: 0 },
    { q: "SQL stands for?", options: ["Strong Query Language", "Structured Query Language", "Stylish Question Language", "Standard Query List"], answer: 1 },
  ],

  gk: [
    { q: "Which is the largest continent?", options: ["Africa", "Asia", "Europe", "Australia"], answer: 1 },
    { q: "Who is known as the Father of the Nation (India)?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "B. R. Ambedkar", "Subhash Chandra Bose"], answer: 1 },
    { q: "Capital of Australia?", options: ["Sydney", "Canberra", "Melbourne", "Brisbane"], answer: 1 },
    { q: "National animal of India?", options: ["Lion", "Tiger", "Elephant", "Peacock"], answer: 1 },
    { q: "Which ocean is the largest?", options: ["Indian", "Atlantic", "Pacific", "Arctic"], answer: 2 },
    { q: "Who invented the telephone?", options: ["Edison", "Alexander Graham Bell", "Tesla", "Marconi"], answer: 1 },
    { q: "Currency of Japan?", options: ["Yen", "Dollar", "Won", "Rupee"], answer: 0 },
    { q: "Which country hosted the 2016 Olympics?", options: ["China", "Brazil", "UK", "Japan"], answer: 1 },
    { q: "Taj Mahal is located in?", options: ["Delhi", "Jaipur", "Agra", "Mumbai"], answer: 2 },
    { q: "Who wrote the Ramayana?", options: ["Valmiki", "Vyasa", "Tulsidas", "Kalidasa"], answer: 0 },
  ],

  fun: [
    { q: "Which is Mickey Mouse’s pet dog?", options: ["Goofy", "Pluto", "Scooby", "Tom"], answer: 1 },
    { q: "Which superhero is also called the Dark Knight?", options: ["Superman", "Batman", "Iron Man", "Hulk"], answer: 1 },
    { q: "Which fruit keeps doctors away?", options: ["Banana", "Apple", "Mango", "Orange"], answer: 1 },
    { q: "Harry Potter’s pet owl name?", options: ["Hedwig", "Errol", "Scabbers", "Fawkes"], answer: 0 },
    { q: "Which cartoon has a character named Nobita?", options: ["Shinchan", "Doraemon", "Pokemon", "Dragon Ball"], answer: 1 },
    { q: "SpongeBob lives in a?", options: ["Coconut", "Mango", "Pineapple", "Apple"], answer: 2 },
    { q: "Which Disney movie has Elsa?", options: ["Frozen", "Moana", "Cinderella", "Tangled"], answer: 0 },
    { q: "Tom is a ___?", options: ["Dog", "Cat", "Rat", "Rabbit"], answer: 1 },
    { q: "Which is the fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Tiger"], answer: 0 },
    { q: "Minions are from which movie?", options: ["Toy Story", "Frozen", "Despicable Me", "Cars"], answer: 2 },
  ],

  science: [
    { q: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
    { q: "What gas do humans need to survive?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"], answer: 0 },
    { q: "H2O is the chemical formula for?", options: ["Hydrogen", "Salt", "Water", "Oxygen"], answer: 2 },
    { q: "Which is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Shark"], answer: 1 },
    { q: "Earth’s gravity pulls objects?", options: ["Upward", "Downward", "Sideways", "No direction"], answer: 1 },
    { q: "What vitamin do we get from sunlight?", options: ["A", "B", "C", "D"], answer: 3 },
    { q: "What is photosynthesis?", options: ["Process of breathing", "Process of making food in plants", "Water cycle", "Evaporation"], answer: 1 },
    { q: "Which organ pumps blood?", options: ["Liver", "Heart", "Brain", "Kidney"], answer: 1 },
    { q: "Which is the fastest bird?", options: ["Eagle", "Pigeon", "Peregrine Falcon", "Parrot"], answer: 2 },
    { q: "Who proposed gravity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: 0 },
  ]
};

document.querySelectorAll('.category').forEach(el => {
  el.addEventListener('click', () => startQuiz(el.getAttribute('data-type')));
});

const nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', nextQuestion);


let currentCategory, currentQuestion = 0, score = 0, timer, timeLeft = 30;



function startQuiz(category) {
  currentCategory = category;
  currentQuestion = 0;
  score = 0;
  document.querySelector('.categories').classList.add('hidden');
  document.getElementById('quiz-section').classList.remove('hidden');
  loadQuestion();
  startTimer();
}

function loadQuestion() {
  const quiz = quizData[currentCategory][currentQuestion];
  document.getElementById('question-number').textContent = `Q${currentQuestion + 1}/10`;
  document.getElementById('question').textContent = quiz.q;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  quiz.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optionsDiv.appendChild(btn);
  });
  document.getElementById('progress').textContent = `Score: ${score}`;
}

function checkAnswer(selected, btn) {
  const quiz = quizData[currentCategory][currentQuestion];
  if (selected === quiz.answer) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
  }
  document.querySelectorAll('#options button').forEach(b => b.disabled = true);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < 10) {
    loadQuestion();
    resetTimer();
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeLeft = 30;
  document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) nextQuestion();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById('quiz-section').classList.add('hidden');
  document.getElementById('result-section').classList.remove('hidden');
  document.getElementById('score').textContent = `Your Score: ${score}/10`;
}

