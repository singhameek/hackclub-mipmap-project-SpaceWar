let pX = 400, pY = 700
let enemyX = []
let enemyY = []
let enemy, player
let playerSpin = 0
let boostLevel = 100
let speed = 1





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
    imageMode(CENTER)
}

function draw() {
    pX = constrain(pX, 10, 990)
    pY = constrain(pY, 10, 990)
    boostLevel = constrain(boostLevel,0,100)


    background(0);


    if (!enemy) return



    for (let j = 0; j < enemyX.length; j++) {


        if (enemyX[j] > pX) {
            enemyX[j] -= 0.5
        }
        else if (enemyX[j] < pX) {
            enemyX[j] += 0.5
        }

        if (enemyY[j] > pY) {
            enemyY[j] -= 0.5
        }
        else if (enemyY[j] < pY) {
            enemyY[j] += 0.5
        }



        for (let k = 0; k < enemyX.length; k++) {
            if (j != k) {
                let d = dist(enemyX[j], enemyY[j], enemyX[k], enemyY[k])

                if (d < 45) {
                    let stren = (45 - d) / 10
                    if (enemyX[j] > enemyX[k]) {
                        enemyX[j] += stren
                    } else {
                        enemyX[j] -= stren
                    }
                    if (enemyY[j] > enemyY[k]) {
                        enemyY[j] += stren
                    } else {
                        enemyY[j] -= stren
                    }
                }
            }
        }


        enemyX[j] = constrain(enemyX[j], 10, 990)
        enemyY[j] = constrain(enemyY[j], 10, 990)

        let enemySpin = 0
        let dx = pX - enemyX[j]
        let dy = pY - enemyY[j]
        enemySpin = degrees(Math.atan2(dy, dx)) + 90

        push()
        translate(enemyX[j], enemyY[j])
        rotate(enemySpin)
        image(enemy, 0, 0, 40, 40)



        pop()
    }




    push()
    translate(pX, pY)
    rotate(playerSpin)
    image(player, 0, 0, 40, 40)
    pop()





    if (mouseX > pX) {
        pX += speed
    }
    else if (mouseX < pX) {
        pX -= speed
    }

    if (mouseY > pY) {
        pY += speed
    }

    if (mouseY < pY) {
        pY -= speed
    }


    let dx = mouseX - pX
    let dy = mouseY - pY

    if (dx != 0 || dy != 0) {
        playerSpin = degrees(Math.atan2(dy, dx)) + 90
    }




    if (!keyIsDown('Space')) {
        speed = 1
        if (boostLevel < 100) {
            boostLevel += 0.2
        }
    }

    if (keyIsDown('Space') && boostLevel > 0) {
        boostLevel -= 1
        speed = 5
    }
    else{
        speed = 1
    }




    stroke(255)
    rect(50, 5, boostLevel, 2)
    noStroke()
    fill(255)
    text("Boost", 10, 10)


}


function mousePressed() {
    console.log(mouseX, mouseY)
}