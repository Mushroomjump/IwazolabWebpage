const questions = [
    {
        question: "What is the purpose of creating a budget?",
        choices: ["To track your daily expenses", "To limit your spending", "To plan and manage your finances", "To impress your friends with financial jargon"],
        correct: 2
    },
    {
        question: "Which of the following is an example of a fixed expense?",
        choices: ["Groceries", "Entertainment", "Rent or mortgage", "Impulse purchases"],
        correct: 2
    },
    {
        question: "What does the term “emergency fund” refer to?",
        choices: ["Money set aside for vacations", "Savings for retirement", "Funds for unexpected expenses", "A secret stash of chocolate"],
        correct: 2
    },
    {
        question:  "When creating a budget, what percentage of your income should ideally be allocated to savings?",
        choices: [" 0%", "10%", "20%", "As much as you can afford"],
        correct: 3
    },
    {
        question: "Which of the following is considered a variable expense?",
        choices: ["Rent", "Utility bills", "Dining out", "Loan payments"],
        correct: 2
    },
];

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
    const questionContainer = document.getElementById('question');
    questionContainer.textContent = questions[currentQuestionIndex].question;

    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = ''; // Clear previous choices

    questions[currentQuestionIndex].choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.className = 'choice-button'; // Ensure this class is styled in CSS
        button.onclick = () => selectAnswer(index);
        choicesContainer.appendChild(button);
    });
}

function selectAnswer(index) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (index === correctIndex) {
        score++; // Increment score for correct answers
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const scorePanel = document.getElementById('score-panel');
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = score;
    scorePanel.style.display = 'block'; // Show score panel

    // Optionally store the score in session storage
    sessionStorage.setItem('userScore', score);
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

window.onload = function() {
    // Reset score and question index if revisiting the quiz
    score = 0;
    currentQuestionIndex = 0;
    displayQuestion();
};
