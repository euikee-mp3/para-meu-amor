document.addEventListener('DOMContentLoaded', function() {
    const message = `Cariño, cada dia ao seu lado é um presente que guardo com todo cuidado. Sua presença ilumina meus dias, transforma meus momentos comuns em algo extraordinário.\n\nVocê trouxe para minha vida um amor que eu nem sabia ser possível. Cada riso, cada olhar, cada gesto seu me faz amar você mais profundamente.\n\nPrometo estar ao seu lado em todos os momentos, te apoiando, te amando e fazendo de cada dia uma nova razão para sorrir. Você é meu maior tesouro.`;
    
    const photos = [
        'images/foto1.jpg',
        'images/foto2.jpg',
        'images/foto3.jpg'
    ];
    
    const songs = [
        {
            title: "Nossa Música",
            icon: "fa-music",
            src: "music/Alinhamento_Milenar.mp3",
            description: "A música que sempre me lembra a gente"
        },
        {
            title: "Sua Canção",
            icon: "fa-heart",
            src: "music/Heaven.mp3",
            description: "Aquela que você me mandou quando estávamos nos conhecendo"
        },
        {
            title: "Nosso Momento",
            icon: "fa-star",
            src: "music/VELUDO_MARROM.mp3",
            description: "A que ficaria ouvindo ao seu lado"
        }
    ];
    
    const typedTextElement = document.getElementById('typed-text');
    const galleryElement = document.querySelector('.gallery');
    const playerContainer = document.querySelector('.player-container');
    const heartsContainer = document.querySelector('.hearts-container');
    const music = document.getElementById('background-music');
    const buttons = document.querySelectorAll('.btn');
    
    function nextScreen() {
        document.getElementById('home').classList.remove('active');
        document.getElementById('message').classList.add('active');
        typeWriter(message, 0);
        music.volume = 0.2;
        music.play().catch(e => console.log("Autoplay bloqueado:", e));
    }
    
    function showPhotos() {
        document.getElementById('message').classList.remove('active');
        document.getElementById('memories').classList.add('active');
        loadPhotos();
    }
    
    function showSongs() {
        document.getElementById('memories').classList.remove('active');
        document.getElementById('songs').classList.add('active');
        loadSongs();
    }
    
    function showFinal() {
        document.getElementById('songs').classList.remove('active');
        document.getElementById('final').classList.add('active');
        createHearts();
    }
    
    function restart() {
        document.getElementById('final').classList.remove('active');
        document.getElementById('home').classList.add('active');
        music.currentTime = 0;
        typedTextElement.innerHTML = '';
    }
    
    function typeWriter(text, i) {
        if (i < text.length) {
            const char = text.charAt(i);
            let html;
            
            if (i === 0) {
                html = `<span class="first-letter">${char}</span>`;
            } else if (char === '\n') {
                html = '<br>' + (i+1 < text.length ? text.charAt(i+1) : '');
                i++;
            } else {
                html = char;
            }
            
            typedTextElement.innerHTML = text.substring(0, i) + html + '<span aria-hidden="true"></span>';
            
            const speed = char.match(/[.,;!?]/) ? 300 : 
                         (i === 0 ? 400 : 30 + Math.random() * 40);
            
            setTimeout(() => typeWriter(text, i + 1), speed);
        }
    }
    
    function loadPhotos() {
        galleryElement.innerHTML = '';
        
        photos.forEach((photo, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'photo-container';
            
            const img = document.createElement('img');
            img.src = photo;
            img.alt = 'Nossa memória';
            img.loading = 'lazy';
            
            img.onload = function() {
                this.classList.add('loaded');
            };
            
            imgContainer.appendChild(img);
            galleryElement.appendChild(imgContainer);
        });
    }
    
    function loadSongs() {
        playerContainer.innerHTML = '';
        
        songs.forEach((song, index) => {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.style.opacity = '0';
            songCard.style.transform = 'translateY(20px)';
            songCard.style.transition = `all 0.5s ease ${index * 0.2}s`;
            
            songCard.innerHTML = `
                <h3><i class="fas ${song.icon}"></i> ${song.title}</h3>
                <p>${song.description}</p>
                <audio controls>
                    <source src="${song.src}" type="audio/mpeg">
                    Seu navegador não suporta áudio.
                </audio>
            `;
            
            playerContainer.appendChild(songCard);
            
            setTimeout(() => {
                songCard.style.opacity = '1';
                songCard.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    function createHearts() {
        const heartColors = ['#ff6b8b', '#ff8e9e', '#ffb3c1', '#ffd6de'];
        let heartCount = 0;
        const maxHearts = 80;
        
        const heartInterval = setInterval(() => {
            if (heartCount++ >= maxHearts) {
                clearInterval(heartInterval);
                return;
            }
            
            const heart = document.createElement('i');
            heart.classList.add('fas', 'fa-heart');
            
            const size = Math.random() * 30 + 15;
            const color = heartColors[Math.floor(Math.random() * heartColors.length)];
            const duration = Math.random() * 3 + 2;
            
            heart.style.cssText = `
                left: ${Math.random() * 100}vw;
                font-size: ${size}px;
                color: ${color};
                animation-duration: ${duration}s;
                opacity: 0.8;
                transform: scale(${Math.random() * 0.5 + 0.5});
                z-index: ${Math.floor(size)};
            `;
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, duration * 1000);
        }, 150);
    }
    
    document.querySelector('.heart').addEventListener('click', nextScreen);
    buttons[0].addEventListener('click', showPhotos);
    buttons[1].addEventListener('click', showSongs);
    buttons[2].addEventListener('click', showFinal);
    buttons[3].addEventListener('click', restart);
    
    document.querySelector('.heart').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') nextScreen();
    });
    
    document.addEventListener('play', function(e) {
        if(e.target.tagName === 'AUDIO') {
            const playerRect = e.target.getBoundingClientRect();
            const centerX = playerRect.left + playerRect.width / 2;
            const centerY = playerRect.top + playerRect.height / 2;
            
            for(let i = 0; i < 15; i++) {
                createMusicStar(centerX, centerY);
            }
        }
    }, true);
    
    function createMusicStar(centerX, centerY) {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star');
        
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 100 + 50;
        const size = Math.random() * 20 + 10;
        const duration = Math.random() * 1.5 + 0.5;
        
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200 - 100;
        
        star.style.cssText = `
            position: fixed;
            color: #ffd700;
            font-size: ${size}px;
            left: ${centerX}px;
            top: ${centerY}px;
            animation: float ${duration}s ease-out forwards;
            opacity: 0;
            --tx: ${tx}px;
            --ty: ${ty}px;
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(star);
        
        setTimeout(() => {
            star.style.opacity = '0.9';
            setTimeout(() => {
                star.remove();
            }, duration * 900);
        }, 10);
    }
    
    if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});