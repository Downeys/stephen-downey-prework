const bgSounds = new Audio("assets/sounds/background-noise.wav");
const soundEffect1 = new Audio("assets/sounds/monster-sound-1.wav");
const soundEffect2 = new Audio("assets/sounds/monster-sound-2.wav");
const soundEffect3 = new Audio("assets/sounds/monster-sound-3.wav");
const soundEffect4 = new Audio("assets/sounds/monster-sound-4.wav");
const soundEffect5 = new Audio("assets/sounds/monster-sound-5.wav");
const randomSoundEffect = [soundEffect1, soundEffect2, soundEffect3, soundEffect4, soundEffect5];

function playerWins(){
    $('#left-frame').append(`<img class="img img-flex" src="assets/images/${game.currentWord}.png" id="monsterPic"/>`);
    game.removeCurrentWord();
    playRandomSoundEffect();
    game.gameStatus= 'ready';
}

function playerLoses(){
    $('#left-frame').append(`<img class="img img-flex" src="assets/images/${game.currentWord}.png" id="monsterPic"/>`);
    game.removeCurrentWord();
    playRandomSoundEffect();
    game.gameStatus= 'ready';
}

function updateGameBoard(currentWord, wins, guessesLeft, lettersGuessed){
    $('#messageBoard').text(game.gameMessage[game.gameStatus]);
    $('#wins').text(wins);
    $('#currentWord').text(game.formatCurrentWord(currentWord));
    $('#guessesLeft').text(guessesLeft);
    $('#lettersGuessed').text(lettersGuessed);
}

function playRandomSoundEffect(){
    let randomIndex = Math.floor(Math.random()*randomSoundEffect.length);
    randomSoundEffect[randomIndex].play();
}

let game = {
    gameStatus: 'ready',
    gameMessage: {'ready': 'Press any key to get started!', 'playing': 'Press any key to continue.', 'win': 'YOU WIN!! Press any key to play again!', 'lose': 'You lose. Press any key to play again!'},
    currentWord: '',
    wins: 0,
    guessesEachTurn: 12,
    guessesLeft: 0,
    scoreToWin: 0,
    score: 0,
    lettersGuessed: [],
    wordBank: [],
    imageRoute: [],
    wordDB: ['banshee', 'basilisk', 'bigfoot', 'chimera', 'chupacabra', 'cyclops', 'daemon', 'dragon', 'ghoul', 'goblin',
    'godzilla', 'golem', 'gorgon', 'graboid', 'hodag', 'hydra', 'imp', 'kaiju', 'king kong', 'lich', 'loch ness',
    'manticore', 'mothman', 'mummy', 'ogre', 'orc', 'poltergeist', 'sasquatch', 'shade', 'siren', 'sphinx', 'succubus',
    'thunderbird', 'troll', 'vampire', 'werewolf', 'wraith', 'yeti', 'zombie',
    ],
    initializeWordBank: function(){
        for(let i=0; i<this.wordDB.length; i++){
            this.wordBank[i] = this.wordDB[i];
        }
        this.randomizeList();
    },
    initializeImageRoutes: function(){
        for(let i=0; i<this.wordBank.length; i++){
            this.imageRoute[i] = `assets/images/${this.wordBank[i]}.png`;
        }
    },
    randomizeList: function(){
        let lstPosition = [];
        let randomizedList = [];
        //create a list of the possible positions within the list
        for(let i=0; i<this.wordBank.length; i++){
            lstPosition[i] = i;
        }
        for(let i=0; i<this.wordBank.length; i++){
            //assign each word in the list to a random position in the new list
            let randomPosition = Math.floor(Math.random()*lstPosition.length);
            randomizedList[i] = this.wordBank[lstPosition[randomPosition]];
            //remove that possible position from the pool of future options
            lstPosition.splice(randomPosition,1);
        }
        //return the new, randomized list
    },
    resetLettersGuessed: function(){
        while(this.lettersGuessed.length > 0){
            this.lettersGuessed.pop();
        }
    },
    randomWord: function(wordList){
        let randomPosition = Math.floor(Math.random()*wordList.length);
        return(wordList[randomPosition]);
    },
    removeCurrentWord: function(){
        this.wordBank.splice(this.wordBank.indexOf(this.currentWord), 1);
        this.imageRoute.splice(this.imageRoute.indexOf(this.currentWord), 1);
    },
    initiateGame: function(){
        if(this.wordBank.length == 0){
            this.initializeWordBank();
            this.initializeImageRoutes();
        }
        game.currentWord = game.randomWord(game.wordBank);
        game.score = 0;
        game.scoreToWin = 0;
        for(let i=0; i<game.currentWord.length; i++){
            if(game.currentWord[i] != ' '){
                game.scoreToWin++;
            }
        }
        game.guessesLeft = game.guessesEachTurn;
        game.resetLettersGuessed();
        game.gameStatus = 'playing';
    },
    checkForLetter: function(charToCheck){
        if(this.currentWord.indexOf(charToCheck) > -1){
            return true;
        }else{
            return false;
        }
    },
    checkIfGuessed: function(charToCheck){
        if(this.lettersGuessed.indexOf(charToCheck) > -1){
            return true;
        }else{
            return false;
        }
    },
    formatCurrentWord: function(){
        let formattedActiveWord = '';
        for(let i=0; i<this.currentWord.length; i++){
            if(this.checkIfGuessed(this.currentWord[i])){
                formattedActiveWord += this.currentWord[i];
            }else if(this.currentWord[i] == ' '){
                formattedActiveWord += '  ';//can't figure out how to get this to work with any font
            }else{
                formattedActiveWord += '_ ';
            }
        }
        return formattedActiveWord;
    },
    updateScore: function(guess){
        for(let i=0; i<this.currentWord.length; i++){
            if(this.currentWord[i] == guess){
                this.score++;
            }
        }
    },
    win: function(){
        this.wins++;
        this.gameStatus = 'win';
    },
    lose: function(){
        this.gameStatus = 'lose';
    },
    gameLogic: function(guess){
        if(!this.checkIfGuessed(guess)){
            this.lettersGuessed.push(guess);
            if(this.checkForLetter(guess)){
                this.updateScore(guess);
                if(this.score == this.scoreToWin){
                    this.win();
                }
            }else{
                this.guessesLeft--;
            }
            if(this.gameStatus == 'playing' && this.guessesLeft == 0){
                this.lose();
            }
        }
    },
};

$(document).keyup(function(event){
    
    let letters = /^[A-Za-z]+$/;
    if (game.gameStatus == 'ready'){
        game.initiateGame();
        $('#monsterPic').remove();
        bgSounds.play();
    }else if(game.gameStatus == 'playing' && event.key.toString().match(letters)){
        game.gameLogic(event.key);
    };
    updateGameBoard(game.currentWord, game.wins, game.guessesLeft, game.lettersGuessed);      
    
    if(game.gameStatus == 'win'){
        playerWins();
    }else if(game.gameStatus == 'lose'){
        playerLoses();
    };
    
});