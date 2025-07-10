// File: script.js
let boyKissCount = 0;
let girlKissCount = 0;
let currentTurn = 'boy'; // 'boy' o 'girl'

const boy = document.getElementById('boy');
const girl = document.getElementById('girl');
const boyKissBtn = document.getElementById('boyKissBtn');
const girlKissBtn = document.getElementById('girlKissBtn');
const boyKissCountEl = document.getElementById('boyKissCount');
const girlKissCountEl = document.getElementById('girlKissCount');
const girlCounter = document.getElementById('girlCounter');
const message = document.getElementById('message');

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '💕';
    
    // Posicionar el corazón en el centro entre los personajes
    const charactersContainer = document.querySelector('.characters');
    const containerRect = charactersContainer.getBoundingClientRect();
    const sceneRect = document.querySelector('.scene-container').getBoundingClientRect();
    
    // Calcular posición relativa al contenedor de la escena
    const centerX = (containerRect.left + containerRect.width / 2) - sceneRect.left;
    const centerY = (containerRect.top + containerRect.height / 2) - sceneRect.top - 20; // -20 para que esté un poco más arriba
    
    heart.style.left = centerX + 'px';
    heart.style.top = centerY + 'px';
    
    document.querySelector('.scene-container').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

function switchTurn() {
    if (currentTurn === 'boy') {
        message.innerHTML = '¡Ehh, me merezco uno yo también! 😘';
        message.classList.add('show');
        boyKissBtn.disabled = true;
        
        setTimeout(() => {
            message.classList.remove('show');
            girlKissBtn.classList.remove('hidden');
            girlCounter.classList.remove('hidden');
            boyKissBtn.classList.add('hidden');
            document.querySelector('.counter').classList.add('hidden');
            currentTurn = 'girl';
            boyKissCount = 0; // Reset contador
            boyKissCountEl.textContent = boyKissCount;
        }, 3000);
    } else {
        message.innerHTML = '¡Ahora me toca a mí otra vez! 😊';
        message.classList.add('show');
        girlKissBtn.disabled = true;
        
        setTimeout(() => {
            message.classList.remove('show');
            boyKissBtn.classList.remove('hidden');
            document.querySelector('.counter').classList.remove('hidden');
            girlKissBtn.classList.add('hidden');
            girlCounter.classList.add('hidden');
            boyKissBtn.disabled = false;
            currentTurn = 'boy';
            girlKissCount = 0; // Reset contador
            girlKissCountEl.textContent = girlKissCount;
        }, 3000);
    }
}

boyKissBtn.addEventListener('click', () => {
    if (currentTurn === 'boy') {
        boyKissCount++;
        boyKissCountEl.textContent = boyKissCount;
        
        // Animación de beso del chico
        boy.classList.add('boy-kiss-animation');
        girl.classList.add('blush-animation');
        
        // Crear corazón
        createHeart();
        
        // Remover animaciones
        setTimeout(() => {
            boy.classList.remove('boy-kiss-animation');
            girl.classList.remove('blush-animation');
        }, 1000);
        
        // Cambiar turno después del tercer beso
        if (boyKissCount === 3) {
            setTimeout(switchTurn, 1000);
        }
    }
});

girlKissBtn.addEventListener('click', () => {
    if (currentTurn === 'girl') {
        girlKissCount++;
        girlKissCountEl.textContent = girlKissCount;
        
        // Animación de beso de la chica (se inclina hacia la derecha)
        girl.classList.add('girl-kiss-animation');
        boy.classList.add('blush-animation');
        
        // Crear corazón
        createHeart();
        
        // Remover animaciones
        setTimeout(() => {
            girl.classList.remove('girl-kiss-animation');
            boy.classList.remove('blush-animation');
        }, 1000);
        
        // Cambiar turno después del tercer beso
        if (girlKissCount === 3) {
            setTimeout(switchTurn, 1000);
        }
    }
});

const audio = document.getElementById('musicaFondo');
if (audio) {
    audio.volume = 0.05; // 5% del volumen

    document.body.addEventListener('click', function () {
        if (audio.paused) {
            audio.play().catch(e => console.log('Audio no se pudo reproducir:', e));
        }
    });
}

// Animaciones de parpadeo aleatorias
setInterval(() => {
    if (Math.random() < 0.1) {
        const eyes = document.querySelectorAll('.girl-eyes, .boy-eyes');
        eyes.forEach(eye => {
            eye.style.height = '1px';
            setTimeout(() => {
                eye.style.height = '4px';
            }, 150);
        });
    }
}, 3000);