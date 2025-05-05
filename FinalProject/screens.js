function endScreen() {
    displayBackground();

    if(bossHealth <= 0 && playerFood > 0) {
        fill(0, 255, 0);
        textSize(50);
        textAlign(CENTER);
        text("CONGRATULATIONS!", windowWidth / 2, windowHeight / 2 - 200);
        text("YOU WON!", windowWidth / 2, windowHeight / 2 - 150);
        textSize(25);
        text("press the button to return to title screen", windowWidth / 2, windowHeight / 2 - 100)
    } else if(bossHealth > 0 && playerFood <= 0) {
        fill(255, 0, 0);
        textSize(50);
        textAlign(CENTER);
        text("GAME OVER", windowWidth / 2, windowHeight / 2 - 200);
        text("YOU LOST!", windowWidth / 2, windowHeight / 2 -150);
        textSize(25);
        text("press the button to return to title screen", windowWidth / 2, windowHeight / 2 - 100)
    } else if(bossHealth <= 0 && playerFood <= 0) {
        fill(0, 255, 0);
        textSize(50);
        textAlign(CENTER);
        text("CONGRATULATIONS!", windowWidth / 2, windowHeight / 2 - 200);
        text("YOU WON!", windowWidth / 2, windowHeight / 2 - 150);
        textSize(25);
        text("press the button to return to title screen", windowWidth / 2, windowHeight / 2 - 100)
    }

    
}