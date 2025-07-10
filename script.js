        let boyKissCount = 0;
        let girlKissCount = 0;
        let currentTurn = 'boy';

        const boy = document.getElementById('boy');
        const girl = document.getElementById('girl');
        const boyKissBtn = document.getElementById('boyKissBtn');
        const girlKissBtn = document.getElementById('girlKissBtn');
        const boyKissCountEl = document.getElementById('boyKissCount');
        const girlKissCountEl = document.getElementById('girlKissCount');
        const boyCounter = document.getElementById('boyCounter');
        const girlCounter = document.getElementById('girlCounter');
        const message = document.getElementById('message');

        function createHeart() {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = '💕';
            
            const charactersContainer = document.querySelector('.characters');
            const containerRect = charactersContainer.getBoundingClientRect();
            const sceneRect = document.querySelector('.scene-container').getBoundingClientRect();
            
            const centerX = (containerRect.left + containerRect.width / 2) - sceneRect.left;
            const centerY = (containerRect.top + containerRect.height / 2) - sceneRect.top - 20;
            
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
                    boyCounter.classList.add('hidden');
                    currentTurn = 'girl';
                    boyKissCount = 0;
                    boyKissCountEl.textContent = boyKissCount;
                }, 3000);
            } else {
                message.innerHTML = '¡Ahora me toca a mí otra vez! 😊';
                message.classList.add('show');
                girlKissBtn.disabled = true;
                
                setTimeout(() => {
                    message.classList.remove('show');
                    boyKissBtn.classList.remove('hidden');
                    boyCounter.classList.remove('hidden');
                    girlKissBtn.classList.add('hidden');
                    girlCounter.classList.add('hidden');
                    boyKissBtn.disabled = false;
                    currentTurn = 'boy';
                    girlKissCount = 0;
                    girlKissCountEl.textContent = girlKissCount;
                }, 3000);
            }
        }

        boyKissBtn.addEventListener('click', () => {
            if (currentTurn === 'boy') {
                boyKissCount++;
                boyKissCountEl.textContent = boyKissCount;
                
                boy.classList.add('boy-kiss-animation');
                girl.classList.add('blush-animation');
                
                createHeart();
                
                setTimeout(() => {
                    boy.classList.remove('boy-kiss-animation');
                    girl.classList.remove('blush-animation');
                }, 1000);
                
                if (boyKissCount === 3) {
                    setTimeout(switchTurn, 1000);
                }
            }
        });

        girlKissBtn.addEventListener('click', () => {
            if (currentTurn === 'girl') {
                girlKissCount++;
                girlKissCountEl.textContent = girlKissCount;
                
                girl.classList.add('girl-kiss-animation');
                boy.classList.add('blush-animation');
                
                createHeart();
                
                setTimeout(() => {
                    girl.classList.remove('girl-kiss-animation');
                    boy.classList.remove('blush-animation');
                }, 1000);
                
                if (girlKissCount === 3) {
                    setTimeout(switchTurn, 1000);
                }
            }
        });

        // Parpadeo aleatorio
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


        const audio = document.getElementById('musicaFondo');
        if (audio) {
            audio.volume = 1.0; // 100% del volumen

            document.body.addEventListener('click', function () {
                if (audio.paused) {
                    audio.play().catch(e => console.log('Audio no se pudo reproducir:', e));
                }
            });
        }
        // Prevenir zoom en dispositivos móviles
        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });

        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
