// Ορισμός των γρίφων
const riddles = [
    {
        question: "Ποιος ήταν ο ηγέτης της Αθήνας κατά τη δεκαπενταετία 446-431 π.Χ.;",
        answer: "Περικλής"
    },
    {
        question: "Ποιο ήταν το κυρίαρχο σώμα στο αθηναϊκό πολίτευμα;",
        answer: "Εκκλησία του Δήμου"
    },
    {
        question: "Ποιος ήταν ο σκοπός των Μεγάλων Παναθηναίων;",
        answer: "Ψυχαγωγία των πολιτών και επίδειξη δύναμης και πλούτου της πόλης"
    },
    {
        question: "Ποιος ήταν ο σκοπός της εκπαίδευσης στην αρχαία Αθήνα;",
        answer: "Αρμονική καλλιέργεια σώματος και πνεύματος"
    },
    {
        question: "Ποιος ήταν ο ρόλος της Βουλής των Πεντακοσίων;",
        answer: "Προετοίμαζε τα κείμενα των νόμων (προβούλευμα)"
    },
    {
        question: "Ποια ήταν η βασική μονάδα του στρατού ξηράς στην αρχαία Αθήνα;",
        answer: "Φάλαγγα"
    },
    {
        question: "Ποιος ήταν ο ρόλος των μετοίκων στην Αθήνα;",
        answer: "Ασχολούνταν με το εμπόριο και τη βιοτεχνία"
    }
];

// Ορισμός των χρωματισμών για τους παίκτες
const playerColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"];

let currentRiddleIndex = 0;
let activePlayers = [];
let playerTimes = {};

// Αρχικοποίηση του παιχνιδιού
function initializeGame() {
    const numPlayers = parseInt(prompt("Εισάγετε τον αριθμό των παικτών (1-4):"));
    if (numPlayers < 1 || numPlayers > 4) {
        alert("Μη έγκυρος αριθμός παικτών. Το παιχνίδι τερματίζεται.");
        return;
    }

    activePlayers = Array.from({ length: numPlayers }, (_, i) => i + 1);
    playerTimes = activePlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {});

    displayPlayers();
    displayRiddle();
}

// Εμφάνιση των παικτών
function displayPlayers() {
    const playersDiv = document.getElementById("players");
    playersDiv.innerHTML = activePlayers.map(player => `
        <div class="player" style="background-color: ${playerColors[player - 1]}">
            Παίκτης ${player}
        </div>
    `).join("");
}

// Εμφάνιση του γρίφου
function displayRiddle() {
    const riddle = riddles[currentRiddleIndex];
    document.getElementById("riddle-text").textContent = riddle.question;
}

// Έλεγχος της απάντησης
function checkAnswer(answer) {
    const riddle = riddles[currentRiddleIndex];
    return answer.trim().toLowerCase() === riddle.answer.toLowerCase();
}

// Υποβολή απάντησης
document.getElementById("submit-answer").addEventListener("click", () => {
    const answer = document.getElementById("answer-input").value;
    if (checkAnswer(answer)) {
        alert("Σωστή απάντηση! 🎉");
        currentRiddleIndex++;
        if (currentRiddleIndex >= riddles.length) {
            endGame();
        } else {
            displayRiddle();
        }
    } else {
        alert("Λάθος απάντηση! 😞");
        new Audio("sounds/fail-sound.mp3").play();
    }
});

// Τέλος του παιχνιδιού
function endGame() {
    const winner = Object.keys(playerTimes).reduce((a, b) => playerTimes[a] < playerTimes[b] ? a : b);
    document.getElementById("result").innerHTML = `
        <p>Μπράβο! Παίκτης ${winner}, είσαι πραγματικά ταλαντούχος/α ερευνητής/τρια! 🎉🏆</p>
    `;
    new Audio("sounds/success-sound2.mp3").play();
}

// Έναρξη του παιχνιδιού
initializeGame();
