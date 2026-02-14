const secretWord const questions = [
    "Mi primera parte es una nación andina de 4 letras. Mi segunda parte es 2 elevado a la décima. Todo junto forma una clave alfanumérica. ¿Cuál es?",
    "Decodificá: País de las líneas de Nazca + 2^10 en decimal = ?",
    "Soy un país con una maravilla del mundo moderno. Si me unís con la base del kilobyte digital, ¿cómo me llamo?",
    "Mi nombre es un país sudamericano y mi número es una potencia de 2 usada en almacenamiento. ¿Cuál es la clave?"
];
 = "peru1024";
let guessedLetters = [];
let attempts = 6;
let wins = localStorage.getItem("wins") ? parseInt(localStorage.getItem("wins")) : 0;

const wordContainer = document.getElementById("word");
const attemptsText = document.getElementById("attempts");
const message = document.getElementById("message");
const keyboard = document.getElementById("keyboard");
const winsText = document.getElementById("wins");

const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

winsText.textContent = wins;

/* DIBUJO BASE */
function drawBase() {
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 240);
    ctx.lineTo(190, 240);
    ctx.moveTo(50, 240);
    ctx.lineTo(50, 20);
    ctx.lineTo(120, 20);
    ctx.lineTo(120, 40);
    ctx.stroke();
}

/* DIBUJO AHORCADO ANIMADO */
function drawHangman(step) {
    ctx.lineWidth = 2;

    setTimeout(() => {
        switch(step) {
            case 1:
                ctx.beginPath();
                ctx.arc(120, 60, 20, 0, Math.PI * 2);
                ctx.stroke();
                break;
            case 2:
                ctx.beginPath();
                ctx.moveTo(120, 80);
                ctx.lineTo(120, 140);
                ctx.stroke();
                break;
            case 3:
                ctx.beginPath();
                ctx.moveTo(120, 100);
                ctx.lineTo(90, 120);
                ctx.stroke();
                break;
            case 4:
                ctx.beginPath();
                ctx.moveTo(120, 100);
                ctx.lineTo(150, 120);
                ctx.stroke();
                break;
            case 5:
                ctx.beginPath();
                ctx.moveTo(120, 140);
                ctx.lineTo(90, 180);
                ctx.stroke();
                break;
            case 6:
                ctx.beginPath();
                ctx.moveTo(120, 140);
                ctx.lineTo(150, 180);
                ctx.stroke();
                break;
        }
    }, 150);
}

/* MOSTRAR PALABRA */
function displayWord() {
    let display = "";

    for (let letter of secretWord) {
        if (guessedLetters.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }

    wordContainer.textContent = display.trim();
}

/* CREAR TECLADO */
function createKeyboard() {
    const keys = "abcdefghijklmnopqrstuvwxyz0123456789";
    keyboard.innerHTML = "";

    keys.split("").forEach(k => {
        const btn = document.createElement("button");
        btn.textContent = k;
        btn.classList.add("key");
        btn.onclick = () => handleGuess(k, btn);
        keyboard.appendChild(btn);
    });
}

/* MANEJO DE LETRAS */
function handleGuess(letter, button) {
    if (guessedLetters.includes(letter) || attempts <= 0) return;

    guessedLetters.push(letter);

    if (secretWord.includes(letter)) {
        button.classList.add("correct");
    } else {
        button.classList.add("wrong");
        attempts--;
        attemptsText.textContent = attempts;
        drawHangman(6 - attempts);
    }

    checkGameStatus();
    displayWord();
}

/* ESTADO DEL JUEGO */
function checkGameStatus() {
    const won = secretWord.split("").every(l => guessedLetters.includes(l));

    if (won) {
        wins++;
        localStorage.setItem("wins", wins);
        winsText.textContent = wins;

        message.textContent = "🎉 ¡Ganaste!";
        disableKeyboard();
    } else if (attempts <= 0) {
        message.textContent = "💀 Perdiste. Era: " + secretWord;
        disableKeyboard();
    }
}

/* DESHABILITAR TECLADO */
function disableKeyboard() {
    document.querySelectorAll(".key").forEach(btn => btn.disabled = true);
}

/* REINICIAR */
function restartGame() {
    guessedLetters = [];
    attempts = 6;
    attemptsText.textContent = attempts;
    message.textContent = "";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();

    displayWord();
    createKeyboard();
}

/* INIT */
drawBase();
displayWord();
createKeyboard();

