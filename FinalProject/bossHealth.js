function drawBossHealthBar() {
    fill(0)
    rect(0, 0, windowWidth, 100);
    textSize(25);
    textAlign(CENTER);
    fill(147, 0, 255);
    text("MONSTER FISH", windowWidth / 2, 25);
    if(bossHealth > 0) {
        fill(147, 0, 255);
        rect(windowWidth / 2 - 250, 50, 5 * bossHealth, 30);
    }
        stroke(255, 255, 255);
        noFill();
        rect(windowWidth / 2 - 250, 50, 500, 30);
}