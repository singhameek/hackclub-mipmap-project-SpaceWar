let pX = 400, pY = 700
let enemyX = []
let enemyY = []
let enemy



function preload() {
    enemy = loadImage("/workspaces/hackclub-mipmap-project-SpaceWar/SpaceWar/enemy.png")
}

function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 20; i++) {
        let cEX = floor(random(100, 700))
        let cEY = floor(random(100, 700))
        enemyX[i] = cEX
        enemyY[i] = cEY
        console.log(enemyX[i], enemyY[i])
    }
    console.log(enemy)
}

function draw() {


    background(0);
    if (!enemy) return // as of right now (early dev) enemy throws undefined error so this skips function draw until it is defined
    for (let j = 0; j < enemyX.length; j++) {
        image(enemy, enemyX[j], enemyY[j])
        let changeX = floor(random(-3, 3))
        enemyX[j] += changeX
        let changeY = floor(random(-3, 3))
        enemyY[j] += changeY


        enemyX[j] = constrain(enemyX[j], 100, 700)
        enemyY[j] = constrain(enemyY[j], 100, 700)
    }




}
