// The 8 unique frequencies (in Hz) that represent musical notes C4 through C5
const TONES = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];

// Holds the single shared AudioContext — null until first sound is played
let audioCtx = null;

// The full 16-card deck: an array of frequencies, two of each tone, shuffled
let deck = [];

// Indices of the card(s) currently flipped but not yet matched (max 2 at a time)
let flipped = [];

// A Set of card indices that have been successfully matched and stay revealed
let matched = new Set();

// When true, all clicks are ignored — prevents clicking during the flip-back delay
let locked = false;

// Returns the shared AudioContext, creating it on the first call
function getAudioCtx() {
    // Browsers require AudioContext to be created after a user gesture, so we delay it until first click
    if (!audioCtx) audioCtx = new AudioContext();
    return audioCtx;
}

// Plays a sine wave tone at the given frequency (Hz) with a smooth fade-out
function playTone(freq) {
    const ctx = getAudioCtx();                          // get the shared audio context
    const osc = ctx.createOscillator();                 // oscillator is the sound source (generates a wave)
    const gain = ctx.createGain();                      // gain node controls the volume over time
    osc.connect(gain);                                  // route oscillator output → gain node
    gain.connect(ctx.destination);                      // route gain node → speakers (the final output)
    osc.type = 'sine';                                  // sine wave sounds smooth and musical (vs 'square', 'sawtooth')
    osc.frequency.value = freq;                         // set the pitch to the given frequency
    gain.gain.setValueAtTime(0, ctx.currentTime);                           // start at volume 0 (silent)
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05);        // ramp up to volume 0.4 over 50ms (attack)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);  // fade out to near-silence over 0.7s (decay)
    osc.start(ctx.currentTime);                         // start playing immediately
    osc.stop(ctx.currentTime + 0.7);                   // stop after 0.7 seconds (frees memory automatically)
}

// Returns a new shuffled copy of the given array (Fisher-Yates algorithm)
function shuffle(arr) {
    const a = [...arr];                                     // copy the array so we don't mutate the original
    for (let i = a.length - 1; i > 0; i--) {              // walk backwards from the last element
        const j = Math.floor(Math.random() * (i + 1));     // pick a random index from 0 to i (inclusive)
        [a[i], a[j]] = [a[j], a[i]];                       // swap elements at positions i and j
    }
    return a;                                               // return the shuffled copy
}

// Rebuilds the entire grid DOM from scratch based on current game state
function render() {
    const gridEl = document.getElementById('grid');  // find the grid container in the HTML
    gridEl.innerHTML = '';                            // wipe all existing card elements
    deck.forEach((freq, i) => {                       // loop over every card in the deck
        const cell = document.createElement('div');   // create a new div element for this card
        cell.className = 'cell';                      // give it the base 'cell' CSS class
        if (matched.has(i)) {                         // if this card index is in the matched set...
            cell.classList.add('matched');            // apply green 'matched' style
            cell.textContent = '♪';                  // show the musical note symbol (face-up)
        } else if (flipped.includes(i)) {            // else if this card is currently flipped...
            cell.classList.add('flipped');            // apply blue 'flipped' style
            cell.textContent = '♪';                  // show the musical note symbol (face-up)
        } else {                                      // otherwise the card is face-down
            cell.textContent = '?';                  // show a question mark
        }
        cell.addEventListener('click', () => onCellClick(i));  // attach click handler, capturing index i
        gridEl.appendChild(cell);                     // add the finished card element into the grid
    });
}

// Handles what happens when the player clicks a card at the given index
function onCellClick(index) {
    if (locked) return;                   // ignore clicks while waiting for a mismatch to flip back
    if (matched.has(index)) return;       // ignore clicks on already-matched cards
    if (flipped.includes(index)) return;  // ignore clicks on the card that's already flipped this turn

    playTone(deck[index]);   // play the tone assigned to this card
    flipped.push(index);     // add this card's index to the flipped list
    render();                // re-draw the grid to show this card as flipped

    if (flipped.length === 2) {       // if two cards are now flipped, check for a match
        locked = true;                // lock the board so no more clicks are accepted
        const [a, b] = flipped;       // destructure the two flipped indices into a and b
        if (deck[a] === deck[b]) {    // if both cards have the same frequency, they match!
            matched.add(a);           // permanently mark card a as matched
            matched.add(b);           // permanently mark card b as matched
            flipped = [];             // clear the flipped list (no cards are "in play" anymore)
            locked = false;           // unlock the board immediately (match doesn't need a delay)
            render();                 // re-draw to show both cards as green/matched
            if (matched.size === deck.length) {   // if every card in the deck is matched...
                setTimeout(showResult, 400);       // wait 400ms then show the win screen
            }
        } else {                           // the two cards don't match
            setTimeout(() => {             // wait 900ms so the player can see both cards before they flip back
                flipped = [];              // clear the flipped list
                locked = false;            // unlock the board
                render();                  // re-draw both cards as face-down again
            }, 900);
        }
    }
}

// Shows the end-of-game result overlay
function showResult() {
    document.getElementById('resultText').textContent =
        `You matched all 8 pairs!`;                          // set the message text
    document.getElementById('resultBox').style.display = 'block';  // make the result box visible
}

// Resets and starts a fresh game
function startGame() {
    deck = shuffle([...TONES, ...TONES]);               // build a 16-card deck (each tone twice) and shuffle it
    flipped = [];                                        // clear any flipped cards from a previous game
    matched = new Set();                                 // clear all matched cards
    locked = false;                                      // make sure the board is unlocked
    document.getElementById('resultBox').style.display = 'none';        // hide the result overlay
    document.getElementById('message').textContent = 'Find matching sounds!';  // show the instruction message
    render();                                            // draw the fresh grid
}

// Wire up the Start button on the main screen to startGame
document.getElementById('startBtn').addEventListener('click', startGame);

// Wire up the Restart button inside the result overlay to startGame

document.getElementById('restartBtn').addEventListener('click', startGame);
