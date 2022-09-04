// declaração das variáveis
const question = document.querySelector("#question");
const answerBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz-container");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a", "b", "c", "d"];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
    {
        "question": "PHP foi desenvolvido para qual fim?",
        "answers": [
            {
                "answer": "back-end",
                "correct": true
            },
            {
                "answer": "front-end",
                "correct": false
            },
            {
                "answer": "Sistema operacional",
                "correct": false
            },
            {
                "answer": "Banco de dados",
                "correct": false
            },
        ]
    },
    {
        "question": "Uma forma de declarar variável em JavaScript:",
        "answers": [
            {
                "answer": "$var",
                "correct": false
            },
            {
                "answer": "var",
                "correct": true
            },
            {
                "answer": "@var",
                "correct": false
            },
            {
                "answer": "#let",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de id no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": true
            },
            {
                "answer": ".",
                "correct": false
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    },
    {
        "question": "Quanto é 1 + 1?",
        "answers": [
            {
                "answer": "11",
                "correct": false
            },
            {
                "answer": "3",
                "correct": false
            },
            {
                "answer": "1",
                "correct": false
            },
            {
                "answer": "2",
                "correct": true
            },
        ]
    },
    {
        "question": "O que é JavaScript?",
        "answers": [
            {
                "answer": "Framework",
                "correct": false
            },
            {
                "answer": "IDE",
                "correct": false
            },
            {
                "answer": "Linguagem de programação",
                "correct": true
            },
            {
                "answer": "Um computador",
                "correct": false
            },
        ]
    },
    {
        "question": "Java é a mesma coisa que JavaScript?",
        "answers": [
            {
                "answer": "Sim",
                "correct": false
            },
            {
                "answer": "Não",
                "correct": true
            },
            {
                "answer": "As vezes",
                "correct": false
            },
            {
                "answer": "Sempre",
                "correct": false
            },
        ]
    },
    {
        "question": "_____ é uma linguagem de marcação!",
        "answers": [
            {
                "answer": "Python",
                "correct": false
            },
            {
                "answer": "JavaScript",
                "correct": false
            },
            {
                "answer": "HTML",
                "correct": true
            },
            {
                "answer": "IDE",
                "correct": false
            },
        ]
    },
    {
        "question": "Qual o seletor de classe no CSS?",
        "answers": [
            {
                "answer": "#",
                "correct": false
            },
            {
                "answer": ".",
                "correct": true
            },
            {
                "answer": "@",
                "correct": false
            },
            {
                "answer": "/",
                "correct": false
            },
        ]
    }
];

// substituição do quizz para a primeira pergunta
function init() {
    // criar a primeira pergunta
    createQuestion(0);
}

// cria uma pergunta
function createQuestion(i) {

    // limpar a questão anterior
    const oldButtons = answerBox.querySelectorAll("button");

    oldButtons.forEach(function(btn) {
        btn.remove();
    });

    // alterar o texto da pergunta
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // insere as alternativas
    questions[i].answers.forEach(function(answer, i) {

        // cria o template do botão do quizz
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

        const letterBtn = answerTemplate.querySelector('.btn-letter');
        const answerText = answerTemplate.querySelector('.question-answer');

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // remover hide e template class
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        // inserir a alternativa na tela
        answerBox.appendChild(answerTemplate);

        // inserir um evento de click no botão
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        });

    });

    // incrementar o número da questão
    actualQuestion++;

}

// Verificando resposta do usuário
function checkAnswer(btn) {
    
    // selecionar todos os botões
    const buttons = answerBox.querySelectorAll("button");

    // verifica se a resposta está correta e adiciona classes nos botões
    buttons.forEach(function(button) {

        if (button.getAttribute("correct-answer") === "true") {

            button.classList.add("correct-answer");

            // checa se o usuário acertou a pergunta
            if (btn === button) {
                // incremento dos pontos
                points++;
            }

        } else {
            button.classList.add("wrong-answer");
        }

    });

    // exibir próxima pergunta
    nextQuestion();
    
}

// exibe a próxima pergunta no quizz
function nextQuestion() {

    // timer para o usuário ver as respostas
    setTimeout(function() {

        // verifica se ainda há perguntas
        if (actualQuestion >= questions.length) {
            // apresenta a msg de sucesso
            showSuccessMessage();
            return;
        }

        createQuestion(actualQuestion);
    }, 1500);

}

// exibe a tela final 
function showSuccessMessage() {

    hideOrShowQuizz();

    // trocar dados da tela de sucesso

    // calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    //  alterar o número de perguntas corretas
    const correctAnswers = document.querySelector("#correct-answers");
    correctAnswers.textContent = points;

    // alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;

}

// mostra ou esconde o score
function hideOrShowQuizz() {
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

// reiniciar quizz
const restartBtn = document.querySelector("#restart");

restartBtn.addEventListener("click", function() {

    // zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();

})

// inicialização do quizzz
init();