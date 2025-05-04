function drawBossHealthBar() {
    fill(147, 0, 255);
    rect(windowWidth / 2 - 250, 50, 5 * bossHealth, 30);
    stroke(0);
    noFill();
    rect(windowWidth / 2 - 250, 50, 500, 30);
}