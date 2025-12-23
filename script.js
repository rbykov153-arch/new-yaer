function createSnowflakes() {
    const snowflakesContainer = document.getElementById('sniezinki');
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('sniezinka');
        
        const size = Math.random() * 10 + 5;
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;
        
        const duration = Math.random() * 10 + 10;
        snowflake.style.animationDuration = `${duration}s`;
        snowflake.style.animationDelay = `${Math.random() * 10}s`;
        
        snowflakesContainer.appendChild(snowflake);
    }
}

function updateTimer() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
    
    if (now.getMonth() === 0 && now.getDate() === 1) {
        newYear.setFullYear(now.getFullYear());
    }
    
    const diff = newYear - now;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function setupGifts() {
    const gifts = document.querySelectorAll('.podarok');
    const giftMessages = [
        "Пусть новый год принесет много радостных моментов!",
        "Желаю здоровья, счастья и благополучия в новом году!",
        "Пусть все мечты сбудутся, а планы осуществятся!",
        "Пусть 2025 год наполнит дом уютом, а сердце — теплом. Счастья, любви и чудес в каждом дне!",
        "Пусть Новый год станет годом ярких побед и крутых перемен. Только вперед, к заветным мечтам!",
        "С Новым годом! Мира, достатка и сказочного настроения вам и вашим близким!"
    ];
    
    gifts.forEach(gift => {
        gift.addEventListener('click', function() {
            const giftId = this.getAttribute('data-podarok') - 1;
            
            if (this.classList.contains('otkrit')) {
                document.getElementById('podarok-soobsheniya').innerHTML = 
                    `<p>Этот подарок уже открыт! Попробуйте другой.</p>`;
                return;
            }
            
            this.classList.add('otkrit');
            this.innerHTML = `<i class="fas fa-box-open"></i>`;
            
            document.getElementById('podarok-soobsheniya').innerHTML = 
                `<p style="color: #ffde59; font-weight: 600;">${giftMessages[giftId]}</p>`;
            
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

function setupLights() {
    const lights = document.querySelectorAll('.svetilnik');
    
    lights.forEach(light => {
        light.addEventListener('click', function() {
            const color = this.getAttribute('data-cvet');
            const isOn = this.classList.contains('vkluchen');
            
            if (isOn) {
                this.classList.remove('vkluchen');
                this.style.backgroundColor = '#555';
                this.style.boxShadow = 'none';
            } else {
                this.classList.add('vkluchen');
                this.style.backgroundColor = color;
                this.style.boxShadow = `0 0 20px 5px ${color}`;
            }
        });
    });
}

function setupThemeSwitcher() {
    const themeButtons = document.querySelectorAll('.tema-knopka');
    const body = document.body;
    const background = document.querySelector('.fon');
    
    const themeBackgrounds = {
        klassicheskaya: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        zimniaya: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
        volshebnaya: 'https://images.unsplash.com/photo-1513297887119-d46091b24bfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
    };
    
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-tema');
            
            themeButtons.forEach(btn => btn.classList.remove('aktivna'));
            this.classList.add('aktivna');
            background.style.backgroundImage = `url('${themeBackgrounds[theme]}')`;
            
            if (theme === 'zimniaya') {
                body.style.backgroundColor = '#1a237e';
                document.querySelector('.timer-sektsiya').style.borderColor = '#1565c0';
                document.querySelectorAll('.timer-edinitsa').forEach(unit => {
                    unit.style.borderColor = '#64b5f6';
                });
            } else if (theme === 'volshebnaya') {
                body.style.backgroundColor = '#4a148c';
                document.querySelector('.timer-sektsiya').style.borderColor = '#ff4081';
                document.querySelectorAll('.timer-edinitsa').forEach(unit => {
                    unit.style.borderColor = '#ba68c8';
                });
            } else {
                body.style.backgroundColor = '#0a2e38';
                document.querySelector('.timer-sektsiya').style.borderColor = '#ffde59';
                document.querySelectorAll('.timer-edinitsa').forEach(unit => {
                    unit.style.borderColor = '#4fc3f7';
                });
            }
        });
    });
}

function setupGame() {
    const gameContainer = document.getElementById('igra-konteiner');
    const scoreElement = document.getElementById('score');
    const resetButton = document.getElementById('igra-nachalo');
    let score = 0;
    let giftsFound = [];
    
    function createGifts() {
        gameContainer.innerHTML = '';
        giftsFound = [];
        score = 0;
        scoreElement.textContent = score;
        
        for (let i = 0; i < 5; i++) {
            const gift = document.createElement('div');
            gift.classList.add('igra-obekt');
            gift.setAttribute('data-id', i);
            const x = Math.random() * (gameContainer.clientWidth - 60);
            const y = Math.random() * (gameContainer.clientHeight - 60);
            
            gift.style.left = `${x}px`;
            gift.style.top = `${y}px`;
            gift.innerHTML = '<i class="fas fa-gift"></i>';
            
            gift.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                
                if (!giftsFound.includes(id)) {
                    giftsFound.push(id);
                    score++;
                    scoreElement.textContent = score;
                    this.style.transform = 'scale(1.5)';
                    this.style.opacity = '0.7';
                    this.innerHTML = '<i class="fas fa-star" style="color: #ffde59;"></i>';
                    
                    if (score === 5) {
                        setTimeout(() => {
                            alert('Поздравляем! Вы нашли все подарки! 🎁');
                        }, 300);
                    }
                }
            });
            
            gameContainer.appendChild(gift);
        }
    }
    
    createGifts();
    resetButton.addEventListener('click', createGifts);
}
function drawTree([line, symbol, delimetr]) {
  var maxLength = line * 2 - 1;

  for (var i = 1; i <= line; i++) {
    var string = '';
    for (var j = 1; j <= maxLength; j++) {
      var quantitySymbol = i * 2 - 1;
      var quantityDelimetr = maxLength - quantitySymbol;
      if (j <= quantityDelimetr / 2) {
        string = string + delimetr;
      }
      if (j > quantityDelimetr / 2 && j <= maxLength - quantityDelimetr / 2) {
        string = string + symbol;
      }
      if (j > maxLength - quantityDelimetr / 2) {
        string = string + delimetr;
      }
    }
    console.log(string);
  }
};

var myElka = {
  firstSection: [3, '*', ' '],
  secondSection: [4, '*', '-'],
  thirdSection: [5, '*', '=']
};

//  для вызова всех секций пробегаюсь по ключам
for (key in myElka) {
  drawTree(myElka[key]);
};
document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    updateTimer();
    setupGifts();
    setupLights();
    setupThemeSwitcher();
    setupGame();
    createChristmasTree();
    
    setInterval(updateTimer, 1000);
});