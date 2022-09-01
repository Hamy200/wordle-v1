'use strict';
import {wordsArray} from "./wordsArray.js"
let letterIndex = 1;
let enteredArray = [];
const generatedWord = generateWord();
let tries = 5

document.querySelector("body").addEventListener("keydown", (e) => {
    let currentBox = "#box" + letterIndex;
    if (enteredArray.length === 4 && e.keyCode >= 65 && e.keyCode <= 90) {
        if(wordsArray.includes(enteredArray.join(""))){

        }
        enteredCharacter(e, currentBox)
        checkWord();
    }//if entered 5 letters will go to check
    else if (e.keyCode >= 65 && e.keyCode <= 90) { //A-Z and a-z
        enteredCharacter(e, currentBox)
    }
    else if (e.keyCode === 8 && letterIndex > 1) { //if backspace
        letterIndex--;
        currentBox = "#box" + letterIndex;
        enteredArray.pop();
        document.querySelector(currentBox).textContent = "";
        let classValue = document.querySelector(currentBox).classList.value
        if(classValue !== "")
        document.querySelector(currentBox).classList.remove(classValue)

    }
})

function checkWord() {
    console.log(tries);
    if(tries === 1 && enteredArray.join("") !== generatedWord){
        for(let i = 0; i < 5; i++){//amount of boxes
            let currentBox = "#box" + (i+1)
            let classValue = document.querySelector(currentBox).classList.value
            if(classValue !== "")
                document.querySelector(currentBox).classList.remove(classValue)
            document.querySelector(currentBox).classList.add("dead")
            document.querySelector("h1").textContent = "You Lose!"

        } 
        tries--;
        document.querySelector("#tries").textContent = "Tries Left: " + tries;
        return;
    }
    
    let winCount = 0;
    for (let [i, character] of enteredArray.entries()) {
        console.log(character, generatedWord);
        if (character !== generatedWord[i] && generatedWord.includes(character)) {
            document.querySelector("#box" + (i + 1)).classList.add("yellow")
        }
        else if (character === generatedWord[i]) {
            document.querySelector("#box" + (i + 1)).classList.add("correct")
            winCount++;
        }
    }
    if (winCount === 5) {
        console.log("You won");
        document.querySelector("body").removeEventListener("keydown",)
        return;

    }
    if(tries > 0)
        tries--;
    document.querySelector("#tries").textContent = "Tries Left: " + tries;

}

function generateWord() {
    return wordsArray[Math.trunc(Math.random()*wordsArray.length)].toUpperCase();
}

function enteredCharacter(e, currentBox) {
    document.querySelector(currentBox).textContent = e.key.toUpperCase();
    enteredArray.push(e.key.toUpperCase());
    letterIndex++;
}



