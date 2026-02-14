const messages = [
    "Are you sure? 🥺",
    "Really sure?? 💔",
    "Think about it... 🤔",
    "Pookie please... 🥹",
    "Just think about it! 💭",
    "I'll be really sad... 😢",
    "Very very sad... 😭",
    "My heart will break... 💔",
    "Ok fine... just kidding! 😊",
    "Please say yes! ❤️",
    "Pretty please? 🌹",
    "With sugar on top? 🍰",
    "I'll give you cookies! 🍪",
    "Last chance! ⚠️",
    "Come onnn! 🙏"
];

let messageIndex = 0;
let yesButtonScale = 1;

// Create floating hearts
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    document.getElementById('heartsBackground').appendChild(heart);
    
    setTimeout(() => heart.remove(), 10000);
}

// Generate hearts periodically
setInterval(createFloatingHeart, 500);
for (let i = 0; i < 15; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    document.getElementById('sparkles').appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

// Handle No button click
function handleNoClick() {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    
    // Change button text
    noButton.querySelector('span').textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    
    // Make Yes button bigger
    yesButtonScale += 0.15;
    yesButton.style.transform = `scale(${yesButtonScale})`;
    yesButton.style.fontSize = (1.6 * yesButtonScale) + 'em';
    
    // Add shake animation to No button
    noButton.style.animation = 'none';
    setTimeout(() => {
        noButton.style.animation = 'shake 0.5s ease-in-out';
    }, 10);
    
    // Create sparkles around Yes button
    const rect = yesButton.getBoundingClientRect();
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(
                rect.left + Math.random() * rect.width,
                rect.top + Math.random() * rect.height
            );
        }, i * 100);
    }
    
    // Move No button randomly on larger screens
    if (window.innerWidth > 600 && messageIndex > 5) {
        const maxX = window.innerWidth - noButton.offsetWidth - 100;
        const maxY = window.innerHeight - noButton.offsetHeight - 100;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        noButton.style.position = 'fixed';
        noButton.style.left = randomX + 'px';
        noButton.style.top = randomY + 'px';
    }
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Handle Yes button click
function handleYesClick() {
    // Create celebration effect
    for (let i = 0; i < 50; i++) {
        setTimeout(createFloatingHeart, i * 50);
    }
    
    // Add explosion effect
    const yesButton = document.getElementById('yesButton');
    const rect = yesButton.getBoundingClientRect();
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createSparkle(
                rect.left + rect.width / 2 + (Math.random() - 0.5) * 200,
                rect.top + rect.height / 2 + (Math.random() - 0.5) * 200
            );
        }, i * 50);
    }
    
    // Smooth transition to next page
    setTimeout(() => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            window.location.href = "thinking.html";
        }, 500);
    }, 800);
}

// Add sparkle trail on mouse move over Yes button
document.getElementById('yesButton').addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) {
        createSparkle(e.clientX, e.clientY);
    }
});