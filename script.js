const interactiveButton = document.querySelector('.interactive-button');
const dynamicText = document.getElementById('dynamic-text');
const changeTextButton = document.getElementById('change-text-button');

interactiveButton.addEventListener('click', () => {
    alert('Button clicked!');
});

const phrases = [
    "Welcome to our website!",
    "Explore the latest in web design.",
    "Interactive elements make it fun!",
    "Thanks for visiting!"
];

let currentPhraseIndex = 0;

changeTextButton.addEventListener('click', () => {
    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
    dynamicText.textContent = phrases[currentPhraseIndex];
});
