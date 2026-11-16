let pX = 400, pY = 700
let enemyX = []
let enemyY = []
let dead = []
let bullets = [], enemybullets = []
let enemy, player
let playerSpin = 0
let boostLevel = 100
let speed = 1
let playerHealth = 100
let enemySpin = []
let playing = 0 // 0 -> home screen, 1-> playing, 2-> win/lose screen
let image1X = 200  // function home variables
let im2X = 800 // function home variables
let rot = 1 // function home variables




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
    player = await loadImage("player.png")
    angleMode(DEGREES)
    imageMode(CENTER)
}

function draw() {
    if (playing == 0) {
        home()
    }
    else if (playing == 1) {
        gameLogic()
    }
    else if (playing == 2) {
        gameEnd()
    }





}


function mousePressed() {
    console.log(mouseX, mouseY)
    if (playing == 1) { fire() }
    if (playing == 0 && mouseX > 450 && mouseX < 550 && mouseY > 475 && mouseY < 525) { playing = 1 }
}


function fire() {
    let bulletX = pX
    let bulletY = pY

    let VbulletX = cos(playerSpin - 90) * 10
    let VbulletY = sin(playerSpin - 90) * 10




    bullets.push({ x: bulletX, y: bulletY, vx: VbulletX, vy: VbulletY })
}


function enemyFire() {
    let rand = floor(random(0, enemyX.length))
    while (dead.includes(rand)) { rand = floor(random(0, enemyX.length)) }
    let bulletX = enemyX[rand]
    let bulletY = enemyY[rand]

    let VbulletX = cos(enemySpin[rand] - 90) * 10
    let VbulletY = sin(enemySpin[rand] - 90) * 10




    enemybullets.push({ x: bulletX, y: bulletY, vx: VbulletX, vy: VbulletY })
}


function gameLogic() {
    pX = constrain(pX, 10, 990)
    pY = constrain(pY, 10, 990)
    boostLevel = constrain(boostLevel, 0, 100)


    background(0);


    if (!enemy) return



    for (let j = 0; j < enemyX.length; j++) {
        if (dead.includes(j)) { continue }


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
            if (dead.includes(k)) { continue }
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


        let dx = pX - enemyX[j]
        let dy = pY - enemyY[j]
        enemySpin[j] = degrees(Math.atan2(dy, dx)) + 90

        push()
        translate(enemyX[j], enemyY[j])
        rotate(enemySpin[j])
        image(enemy, 0, 0, 40, 40)



        pop()


    }

    for (let b of enemybullets) {
        fill(210, 20, 20)
        rect(b.x, b.y, 5, 10)
        b.x += b.vx
        b.y += b.vy
    }

    let tol = 25
    for (let i = enemybullets.length - 1; i >= 0; i--) {
        if (abs(pX - enemybullets[i].x) <= tol && abs(pY - enemybullets[i].y) <= tol) {
            playerHealth -= 10
            enemybullets.splice(i, 1)
        }
    }



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


    if (keyIsDown('Space') && boostLevel > 0) {
        boostLevel -= 1
        speed = 5
    }
    else {
        speed = 1
        if (boostLevel < 100) {
            boostLevel += 0.2
        }
    }




    stroke(255)
    fill(255)
    rect(50, 5, 100, 2)
    rect(200, 5, 100, 2)
    fill(255, 0, 0)
    rect(50, 5, boostLevel, 2)
    rect(200, 5, playerHealth, 2)
    noStroke()
    fill(255)
    text("Boost", 10, 10)
    text("Health", 160, 10)



    for (let i = bullets.length - 1; i >= 0; i--) {
        fill(210, 20, 20)
        rect(bullets[i].x, bullets[i].y, 4, 10)
        bullets[i].x += bullets[i].vx
        bullets[i].y += bullets[i].vy

        let tol = 25
        for (let a = enemyX.length - 1; a >= 0; a--) {
            if (abs(enemyX[a] - bullets[i].x) <= tol && abs(enemyY[a] - bullets[i].y) <= tol) {
                if (dead.includes(a)) { continue }
                dead.push(a)
                enemyX[a] = -1000
                enemyY[a] = -1000
                bullets.splice(i, 1)
                break
            }
        }
    }

    if (dead.length == enemyX.length || playerHealth <= 0) {
        playing = 2
    }





    let rand = floor(random(0, 100))
    if (rand == 10) {
        enemyFire()
    }





    push()
    translate(pX, pY)
    rotate(playerSpin)
    image(player, 0, 0, 40, 40)
    pop()

}


function home() {
    background(0)

    push()
    translate(image1X, 70)
    rotate(90 * rot)
    image(player, 0, 0, 50, 50)
    pop()

    push()
    translate(im2X, 120)
    rotate(-90 * rot)
    image(enemy, 0, 0, 50, 50)
    pop()

    image1X += 3 * rot
    im2X -= 3 * rot

    if (image1X > 1050 || image1X < -50) { rot *= -1 }




    textSize(50)
    fill(255)
    textAlign(CENTER, CENTER)
    text("SpaceWar", width / 2, 200)
    textSize(25)
    rectMode(CENTER)
    fill(20, 210, 20)
    rect(width / 2, 500, 100, 50, 10, 10, 10, 10)
    fill(255)
    text("Play", width / 2, 505)
}

function gameEnd() {
    if (dead.length == enemyX.length) {
        background(0)
        fill(255)
        textSize(100)
        textAlign(CENTER)
        text("You win!!", width / 2, height / 2)
        noLoop()
        return
    }
    else {
        background(0)
        fill(255)
        textSize(100)
        textAlign(CENTER)
        text("You died :(", width / 2, height / 2)
        noLoop()
        return
    }
}