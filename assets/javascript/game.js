    // DOM
    var $newGameButton = document.getElementById('new-game-button');
    var $placeholders = document.getElementById('placeholders');
    var $guessedLetters = document.getElementById('guessed-letters');
    var $guessesLeft = document.getElementById('guesses-left');
    var $wins = document.getElementById('wins');
    var $losses = document.getElementById('losses');



    // declare variables- wordbank, wins, losses, picked word, guesses left,...
        //...game running, picked word placeholder, guessed letter bank, incorrect letter bank. 
    var wordBank = ["Red Raiders", "Longhorns", "Sooners", "Horned Frogs"];
    var wins = 0;
    var losses = 0;
    var guessesLeft = 8;
    var gameRunning = false;
    var pickedWord = '';
    var pickedWordPlaceholderArr = [];
    var guessedLetterBank = [];
    var incorrectLetterBank = [];



   //newGame function to reset all stats, pick new word and create placeholder.
    function newGame() {
        //Reset all game info
        gameRunning = true;
        guessesLeft = 8;
        guessedLetterBank = [];
        incorrectLetterBank = [];
        pickedWordPlaceholderArr = [];
    
        //pick new word
        pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

        //For loop to Create palceholders out of new pickedWord
        for (var i = 0; i < pickedWord.length; i++) {
            if (pickedWord[i] === ' ') {
                pickedWordPlaceholderArr.push(' ');
            } else {
                pickedWordPlaceholderArr.push('_');
            }
        }
        // Write all new game info to DOM
        $guessesLeft.textContent = guessesLeft;
        $placeholders.textContent = pickedWordPlaceholderArr.join('');
        $guessedLetters.textContent = incorrectLetterBank;
        }








    // letterGuess function, takes in letter you pressed and sees if in selected words
        function letterGuess(letter) {
            console.log(letter);

            if (gameRunning === true && guessedLetterBank.indexOf(letter) === -1) {
                //Run Game Logic
                guessedLetterBank.push(letter);

                //check if guessed letter is in picked word
                for (var i = 0; i < pickedWord.length; i++) {

                    // Convert both values to lower case so I can compare them correctly
                    if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {

                        //if match, swap out character with letter
                        pickedWordPlaceholderArr[i] = pickedWord[i];
                    }
                }

                $placeholders.textContent = pickedWordPlaceholderArr.join('');
                checkIncorrect(letter);
            }
        
            else {
                if (!gameRunning) {
                    alert("The game isn't running, click New Game button to start/continue or refresh page to start over.");
                } else {
                    alert("You've already guessed this letter, try a new one.");
                }
            }
        }






        
    // check for incorrect letter
        function checkIncorrect(letter) {
            //check to see if letter didn't make it into oickedWordPlaceholder, and is incorrect guess.
            if (pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 &&
            pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
                //decrease guessesLeft value
                guessesLeft--;
                //add incorrect letter to incorrectLetterBank
                incorrectLetterBank.push(letter);
                //Send new bank of incorrect letters guessed to DOM
                $guessedLetters.textContent = incorrectLetterBank.join(' ');
                //Send new amount of guesses left to DOM
                $guessesLeft.textContent = guessesLeft;
            }
            checkLoss();
        }



    //checkLose
        function checkLoss() {
            if (guessesLeft === 0) {
                losses++;
                gameRunning = false;
                $losses.textContent = losses;
            }
            checkWin();
        }


    //checkWin
        function checkWin() {
            if(pickedWord.toLowerCase() === pickedWordPlaceholderArr.join('').toLowerCase())
            {
                wins++;
                gameRunning = false;
                $wins.textContent = wins;
            }
        }

    // add event listener for new game button
    $newGameButton.addEventListener('click', newGame);



    // add onkeyup event to trigger letterGuess
        document.onkeyup = function(event) {
            if (event.keyCode >= 65 && event.keyCode <= 90) {
                letterGuess(event.key);
            }
        }



