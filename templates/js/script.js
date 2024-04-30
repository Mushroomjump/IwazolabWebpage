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

function displayQuestion() {
    const quizContainer = document.getElementById('question');
    quizContainer.textContent = questions[currentQuestionIndex].question;

    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = ''; // Clear previous choices
    questions[currentQuestionIndex].choices.forEach((choice, index) => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.onclick = () => selectAnswer(index);
        choicesContainer.appendChild(li);
    });
}

function selectAnswer(index) {
    if (index === questions[currentQuestionIndex].correct) {
        alert('Correct!');
    } else {
        alert('Wrong!');
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        alert('Quiz completed!');
    }
}

function nextQuestion() {
    displayQuestion();
}

window.onload = displayQuestion;
