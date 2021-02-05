Hangmon README.md

This is a monster themed hangman game. 

*Press any key to begin the game. *
*continue pressing letter keys to log your guesses. *
*The game will let you know when you've won or run out of guesses. *
*Then it will automatically select the next word to continue playing. *
*After playing through all the words, the game will restart and present the words to you again in a new order. *

Dev Notes:
*To add words to the database, you need to add the word to game.wordDB and also add an associated picture in the assets/images folder. The picture should be in .png format, and its name should exactly match the assicated word entered into the database.
*To change the number of guesses allowed, modify game.guessesEachTurn.
*The theme can be easily changed by moving the game object into a new page with different asthetics. 

Game Features:
*Utilizes event listeners to allow user to drive experience.
*Randomizes the order of the words, so the experience is different every time the user plays.
*Does not repeat a word until all the words in the database have been used.
*Only uses a turn if user guesses incorrectly.
*Does not allow user to guess the same letter twice on the same word.
*Does not allow non-letter guesses during gameplay (this feature still needs work because the game still allows volume-up and other media buttons through my conditional).
*Creepy background noises.
*Random monster sound effects when user wins or loses.
