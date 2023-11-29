
const words = ['distribucion', 'presencia', 'orientacion', 'resultado', 'vacaciones', 'cigarrillo', 'respuesta', 'comodidad', 'variedad',
                'desastre', 'construccion', 'posibilidad', 'universidad', 'problema', 'preocupacion', 'recomendacion', 'intencion',
                'estudiante', 'pensamiento', 'personalidad', 'reputacion', 'transporte', 'mermelada', 'temperatura', 'gobernador',
                'calculadora', 'movimiento', 'refrigerador', 'cachorro', 'martillo'];
let currentWord = '';
let guessedLetters = [];
let missedLetters = 0;

function startGame()
{
    // Reset game variables
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    missedLetters = 0;

    // Display initial state
    updateWordDisplay();
    updateMissedLetters();
    updateHangmanImage();
}

function updateWordDisplay()
{
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = currentWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');

    if (!wordDisplay.innerHTML.includes('_'))
    {
        alert('Yay! 🎉 You guessed the word.');
        startGame();
    }
}

function updateMissedLetters()
{
    const missedLettersElement = document.getElementById('missed-letters');
    missedLettersElement.textContent = `Letras Adivinadas: ${guessedLetters.join(', ')}`;

    if (missedLetters === 6)
    {
        alert(`Game Over 😔 The word was "${currentWord}".`);
        startGame();
    }
}

function updateHangmanImage()
{
    const hangmanImage = document.getElementById('hangman-image');
    hangmanImage.src = `images/Bflower_${missedLetters}.jpg`;
}

function guessLetter()
{
    const guessInput = document.getElementById('guess-input');
    const letter = guessInput.value.toLowerCase();

    if (letter && /^[a-z]$/.test(letter) && !guessedLetters.includes(letter))
    {
        guessedLetters.push(letter);

        if (!currentWord.includes(letter))
        {
            // Incorrect guess
            missedLetters++;
            document.getElementById('incorrectSound').play();
        } else
        {
            // Correct guess
            document.getElementById('correctSound').play();
        }

        updateWordDisplay();
        updateMissedLetters();
        updateHangmanImage();
    }

    guessInput.value = '';
}


function restartGame()
{
    startGame();
}

startGame();