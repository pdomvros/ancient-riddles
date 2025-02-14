// Ορισμός των γρίφων με πολλαπλής επιλογής
const riddles = [
    {
        question: "Ποιος ήταν ο ηγέτης της Αθήνας κατά τη δεκαπενταετία 446-431 π.Χ.;",
        options: ["Σωκράτης", "Περικλής", "Θεμιστοκλής", "Αριστοτέλης"],
        answer: "Περικλής"
    },
    {
        question: "Ποιο ήταν το κυρίαρχο σώμα στο αθηναϊκό πολίτευμα;",
        options: ["Βουλή των Πεντακοσίων", "Εκκλησία του Δήμου", "Άρειος Πάγος", "Στρατηγοί"],
        answer: "Εκκλησία του Δήμου"
    },
    {
        question: "Ποιος ήταν ο σκοπός των Μεγάλων Παναθηναίων;",
        options: ["Επίδειξη πολιτικής δύναμης", "Ψυχαγωγία των πολιτών", "Εορτασμός της νίκης επί των Περσών", "Εμπόριο"],
        answer: "Ψυχαγωγία των πολιτών"
    },
    {
        question: "Ποιος ήταν ο σκοπός της εκπαίδευσης στην αρχαία Αθήνα;",
        options: ["Στρατιωτική εκπαίδευση", "Αρμονική καλλιέργεια σώματος και πνεύματος", "Θρησκευτική εκπαίδευση", "Εμπορική εκπαίδευση"],
        answer: "Αρμονική καλλιέργεια σώματος και πνεύματος"
    }
];

// Ορισμός των χρωματισμών για τους παίκτες
const playerColors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1"];

let currentRiddleIndex = 0;
let activePlayers = [];
let playerAnswers = {};
let playerScores = {};

// Αρχικοποίηση του παιχνιδιού
function initializeGame() {
    const numPlayers = parseInt(prompt("Εισάγετε τον αριθμό των παικτών (1-4):"));
    if (numPlayers < 1 || numPlayers > 4) {
        alert("Μη έγκυρος αριθμός παικτών. Το παιχνίδι τερματίζεται.");
        return;
    }

    activePlayers = Array.from({ length: numPlayers }, (_, i) => i + 1);
    playerAnswers = activePlayers.reduce((acc, player) => ({ ...acc, [player]: null }), {});
    playerScores = activePlayers.reduce((acc, player) => ({ ...acc, [player]: 0 }), {});

    displayPlayers();
    displayRiddle();
}

// Εμφάνιση των παικτών
function displayPlayers() {
    const playersDiv = document.getElementById("players");
    playersDiv.innerHTML = activePlayers.map(player => `
        <div class="player" style="background-color: ${playerColors[player - 1]}">
            Παίκτης ${player} (Σκορ: ${playerScores[player]})
        </div>
    `).join("");
}

// Εμφάνιση του γρίφου
function displayRiddle() {
    const riddle = riddles[currentRiddleIndex];
    document.getElementById("riddle-text").textContent = riddle.question;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = riddle.options.map((option, index) => `
        <div class="option" data-index="${index}">${option}</div>
    `).join("");

    // Επιλογή απάντησης για κάθε παίκτη
    document.querySelectorAll(".option").forEach(option => {
        option.addEventListener("click", () => {
            const selectedPlayer = prompt("Εισάγετε τον αριθμό του παίκτη (1-4):");
            if (activePlayers.includes(Number(selectedPlayer))) {
                playerAnswers[selectedPlayer] = option.textContent;
                option.style.backgroundColor = playerColors[selectedPlayer - 1];
                checkAnswers();
            } else {
                alert("Μη έγκυρος αριθμός παίκτη!");
            }
        });
    });
}

// Έλεγχος των απαντήσεων
function checkAnswers() {
    const riddle = riddles[currentRiddleIndex];
    activePlayers.forEach(player => {
        if (playerAnswers[player] === riddle.answer) {
            playerScores[player]++;
        }
    });

    // Εμφάνιση νέου γρίφου ή τέλος του παιχνιδιού
    currentRiddleIndex++;
    if (currentRiddleIndex >= riddles.length) {
        endGame();
    } else {
        displayRiddle();
    }
}

// Τέλος του παιχνιδιού
function endGame() {
    const winner = Object.keys(playerScores).reduce((a, b) => playerScores[a] > playerScores[b] ? a : b);
    document.getElementById("result").innerHTML = `
        <p>Μπράβο! Παίκτης ${winner}, είσαι πραγματικά ταλαντούχος/α ερευνητής/τρια! 🎉🏆</p>
    `;
    new Audio("sounds/success-sound2.mp3").play();
}

// Έναρξη του παιχνιδιού
initializeGame();
