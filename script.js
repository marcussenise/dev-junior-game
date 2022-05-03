const char = document.querySelector('.char');
const background = document.querySelector('.background');
const gameOver = document.querySelector('.game-over');
const restartButton = document.querySelector('.restart');
const start = document.querySelector('.start');
const playButton = document.querySelector('.play');
const bugsImgs = ['imgs/bug1.png','imgs/bug2.png', 'imgs/bug3.png' ]
let isJumping = false;
let isGameOver = false;
let position = 0;
let pontos = 0;
let projetos = 0;
var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

function handleKeyDown(event){
    if(event.keyCode === 32){
        if(!isJumping){
            jump();
        }
    }
}

function jump(){
    const char = document.querySelector('.char');
    isJumping = true;
    let upInterval = setInterval(() => {
        if(position >= 150){
            clearInterval(upInterval);
            //descendo
            
            let downInterval = setInterval(() => {
                if(position <= 0){
                    clearInterval(downInterval)
                    isJumping = false;
                } else{
                    position -= 10;
                    char.style.bottom = position+'px';
                }
            }, 20);
            
            
        } else {
            //subindo
            position += 20;
            char.style.bottom = position+'px';        
        }
    }, 20);
    
}

function createbug(){
    if(isGameOver) return;

    const background = document.querySelector('.background');
    let newBug = document.createElement('img');
    let bugSprite = bugsImgs[Math.floor(Math.random()* bugsImgs.length)];
    newBug.src = bugSprite;
    newBug.classList.add('bug');
    let bugPosition = 95;
    let randomTime = Math.random() * 6000;
    
    
    // bug.classList.add('bug');
    newBug.style.left = 95+'%';
    background.appendChild(newBug);
    
    let leftInterval = setInterval(() => {
        if(bugPosition < -0){
            clearInterval(leftInterval);
            background.removeChild(newBug);
        } else if(bugPosition > 0 && bugPosition < 4.8 && position < 60){
            //game over
            background.removeChild(newBug);
            clearInterval(leftInterval);
            clearTimeout(criarbug);
            if(isGameOver) return;
            document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1><h3 class="resultado">'+pontos+' dias de experiência</h3><h4 class="mensagem"></h4><h2 class="restart" onclick="restart()">Restart<h2>';
            const mensagem = document.querySelector('.mensagem');
            isGameOver = true;
            document.removeEventListener('keydown', handleKeyDown);  
            
            if(pontos<365 && projetos<10){
                mensagem.innerHTML = '"Júnior com menos de 1 ano de experiência e nada no Github? Guardaremos seu currículo para a próxima..."'
            } else if(pontos>=365 && projetos<10){
                mensagem.innerHTML = 'Experiência ok, mas faltam projetos. Crie pelo menos 10 projetos inovadores para ser entrevistado.'
            } else if(pontos>= 365 && projetos>=10){
                mensagem.innerHTML = 'Muito bem, você passou na primeira etapa do nosso processo. Só faltam 9! Boa sorte!'
            } else if(pontos<365 && projetos>= 10){
                mensagem.innerHTML = 'Muitos projetos legais, mas falta experiência! Júnior na nossa empresa só com experiência!'
            }
        } else{
            bugPosition -=1.2;
            newBug.style.left = bugPosition+'%';
        }
    }, 20);

    const criarbug = setTimeout(createbug, randomTime+100);
}

function createGithub(){
    const background = document.querySelector('.background');
    const github = document.createElement('div');

    let githubPosition = 95;
    let randomTime = Math.random() * 10000;
    
    if(isGameOver) return;
    
    github.classList.add('github');
    github.style.left = 95+'%';
    background.appendChild(github);
    
    let leftIntervalGit = setInterval(() => {
        if(githubPosition < -5){
            clearInterval(leftIntervalGit);
            background.removeChild(github);
        } else if(githubPosition > 0 && githubPosition < 5 && position < 150 && position > 90){
            clearInterval(leftIntervalGit);
            background.removeChild(github);
            projetos += 1;
        } else{
            githubPosition -=1.5;
            github.style.left = githubPosition+'%';
        }
    }, 20);

    const criarGithub = setTimeout(createGithub, randomTime+500)
}

function runProjetos(){
    projetos = 0;
    const numsProjetos = document.createElement('h4');
    numsProjetos.classList.add('numsProjetos');
    background.appendChild(numsProjetos);

    numsProjetos.innerHTML = projetos+' projetos';
    // createGithub();
    let intervaloPontos = setInterval(() => {
        if(isGameOver){
            numsProjetos.classList.remove('numsProjetos');
            clearInterval(intervaloPontos);
            return;
        }
        let classeNumsProjetos = document.querySelector('.numsProjetos');
        classeNumsProjetos.innerHTML = projetos+' projeto(s)';

    }, 20);
}

function runScore(){
    pontos = 0;

    const placar = document.createElement('h4');
    placar.classList.add('placar');
    background.appendChild(placar);
    
    let intervaloPontos = setInterval(() => {
        if(isGameOver){
            placar.classList.remove('placar');
            clearInterval(intervaloPontos);
            return;
        }

        pontos+=1;
        let classePlacar = document.querySelector('.placar');
        classePlacar.innerHTML = pontos+ ' dias de experiência';
    }, 100);
} 

function restart(){
    const gameOver = document.querySelector('.game-over');
    const restartButton = document.querySelector('.restart');
    gameOver.style.display = 'none';
    restartButton.style.display = 'none';
    document.body.innerHTML = '<div class="background"><div class="char"></div></div>'
    isGameOver = false;

    const char = document.querySelector('.char');
    const background = document.querySelector('.background');
    background.style.display = 'block';
    background.addEventListener('click', jump);
    char.style.display = 'block';
    document.addEventListener('keydown', handleKeyDown);
    
    const placar = document.createElement('h4');
    placar.classList.add('placar');
    background.appendChild(placar);
    pontos = 0;
    placar.innerHTML = pontos;
    
    const numsProjetos = document.createElement('h4');
    numsProjetos.classList.add('numsProjetos');
    background.appendChild(numsProjetos);
    createbug();
    runScore();
    runProjetos();
    createGithub();
}

function play(){
    start.style.display = 'none';
    playButton.style.display = 'none';
    background.style.display = 'block';
    char.style.display = 'block';
    createbug();
    document.addEventListener('keydown', handleKeyDown);
    runScore();
    runProjetos();
    createGithub();
}
