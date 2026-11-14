let pX = 400, pY = 700
let enemyX = []
let enemyY = []
let enemy, player
let playerSpin = 0





async function setup() {
    createCanvas(1000, 1000);
    for (let i = 0; i < 10; i++) {
        let cEX = floor(random(10, 990))
        let cEY = floor(random(10, 990))
        enemyX[i] = cEX
        enemyY[i] = cEY
        console.log(enemyX[i], enemyY[i])
    }
    enemy = await loadImage("enemy.png")
    player = await loadImage("image.png")
    console.log(enemy, player)
    angleMode(DEGREES)
}

function draw() {
    background(0);
    if (!enemy) return // as of right now (early dev) enemy throws undefined error so this skips function draw until it is defined
    for (let j = 0; j < enemyX.length; j++) {
        image(enemy, enemyX[j], enemyY[j], 40, 40)

        if (enemyX[j] > pX) {
            enemyX[j]--
        }
        else if (enemyX[j] < pX) {
            enemyX[j]++
        }

        if (enemyY[j] > pY) {
            enemyY[j]--
        }
        else if (enemyY[j] < pY) {
            enemyY[j]++
        }


        enemyX[j] = constrain(enemyX[j], 10, 990)
        enemyY[j] = constrain(enemyY[j], 10, 990)
    }

    push()
    translate(pX, pY)
    rotate(playerSpin)
    image(player, 0, 0, 40, 40)
    pop()


    if (keyIsDown(UP_ARROW)) {
        pY -= 2
        playerSpin = 0
    }

    else if (keyIsDown(DOWN_ARROW)) {
        pY += 2
        playerSpin = 180
    }

    else if (keyIsDown(LEFT_ARROW)) {
        pX -= 2
        playerSpin = 270
    }

    else if (keyIsDown(RIGHT_ARROW)) {
        pX += 2
        playerSpin = 90
    }


}


function mousePressed() {
    console.log(mouseX, mouseY)
}