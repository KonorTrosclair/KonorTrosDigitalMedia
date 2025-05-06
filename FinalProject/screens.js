let isScoreMultiplied = false;
function endScreen() {
    displayBackground();

    

    if(bossHealth <= 0 && playerFood > 0) {
        if(timer < 80) {
            scoreMultiplier = 80 - timer;
        }
        if(!isScoreMultiplied) {
            score = score * scoreMultiplier;
            if(playerFood > 66) {
                score = score + playerFood * 3;
            } else if(playerFood > 33) {
                score = score + playerFood * 2;
            } else if(playerFood > 0) {
                score = score + playerFood;
            }
            isScoreMultiplied = true;
        }

        fill(0, 255, 0);
        textSize(50);
        textAlign(CENTER);
        text("CONGRATULATIONS!", windowWidth / 2, windowHeight / 2 - 350);
        text("YOU WON!", windowWidth / 2, windowHeight / 2 - 300);
        textSize(25);
        text("press the button to return to title screen", windowWidth / 2, windowHeight / 2 - 250)
        fill(0, 0, 0);
        text("you beat the boss in " + timer + " seconds", windowWidth / 2, windowHeight / 2 - 200);
        text("Your score is " + Math.floor(score), windowWidth / 2, windowHeight / 2 - 150);
    } else if(bossHealth > 0 && playerFood <= 0) {
        fill(255, 0, 0);
        textSize(50);
        textAlign(CENTER);
        text("GAME OVER", windowWidth / 2, windowHeight / 2 - 350);
        text("YOU LOST!", windowWidth / 2, windowHeight / 2 - 300);
        textSize(25);
        text("press the button to return to title screen", windowWidth / 2, windowHeight / 2 - 250)
        fill(0);
        text("You ran out of food!", windowWidth / 2, windowHeight / 2 - 150);
        text("Your score is " + Math.floor(score), windowWidth / 2, windowHeight / 2 - 200);
    } else if(bossHealth <= 0 && playerFood <= 0) {
        if(timer < 80) {
            scoreMultiplier = 80 - timer;
        }
        if(!isScoreMultiplied) {
            score = score * scoreMultiplier;
            if(playerFood > 66) {
                score = score + playerFood * 3;
            } else if(playerFood > 33) {
                score = score + playerFood * 2;
            } else if(playerFood > 0) {
                score = score + playerFood;
            }
            isScoreMultiplied = true;
        }

        fill(0, 255, 0);
        textSize(50);
        textAlign(CENTER);
        text("CONGRATULATIONS!", windowWidth / 2, windowHeight / 2 - 350);
        text("YOU WON!", windowWidth / 2, windowHeight / 2 - 300);
        textSize(25);
        text("press the button to return to title screen", windowWidth / 2, windowHeight / 2 - 250)
        fill(0, 0, 0);
        text("you beat the boss in " + timer + " seconds", windowWidth / 2, windowHeight / 2 - 200);
        text("Your score is " + Math.floor(score), windowWidth / 2, windowHeight / 2 - 150);
    }   

    
}