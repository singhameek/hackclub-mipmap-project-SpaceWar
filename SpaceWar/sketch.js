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

        for(let b of enemybullets){
            fill(210,20,20)
            rect(b.x,b.y,5,10)
            b.x += b.vx
            b.y += b.vy
        }

        let tol = 25
        for(let b2 of enemybullets){
            if(abs(pX - b2.x) <= tol && abs(pY - b2.y) <= tol){
                playerHealth -= 10
            }
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
    rect(50, 5, boostLevel, 2)
    noStroke()
    fill(255)
    text("Boost", 10, 10)



    for (let b of bullets) {
        fill(210, 20, 20)
        rect(b.x, b.y, 4, 10)
        b.x += b.vx
        b.y += b.vy

        let tol = 25
        for (let a = 0; a < enemyX.length; a++) {
            for(let b2 of bullets)
            if (abs(enemyX[a] - b2.x) <= tol && abs(enemyY[a] - b2.y) <= tol) {
                if(dead.includes(a)) { continue }
                dead.push(a)
                enemyX[a] = -1000
                enemyY[a] = -1000
            }
        }
    }

    if(dead.length == enemyX.length){
        background(0)
        fill(255)
        textSize(100)
        textAlign(CENTER)
        text("You win!!", width/2, height/2)
        noLoop()
    }


    if(playerHealth <= 0){
        background(0)
        fill(255)
        textSize(100)
        textAlign(CENTER)
        text("You died :(", width/2, height/2)
        noLoop()
    }




    let rand = floor(random(0,1000))
    if(rand == 100){
        enemyFire()
    }





    push()
    translate(pX, pY)
    rotate(playerSpin)
    image(player, 0, 0, 40, 40)
    pop()

}


function mousePressed() {
    console.log(mouseX, mouseY)
    fire()
}


function fire() {
    let bulletX = pX
    let bulletY = pY

    let VbulletX = cos(playerSpin - 90) * 10
    let VbulletY = sin(playerSpin - 90) * 10




    bullets.push({ x: bulletX, y: bulletY, vx: VbulletX, vy: VbulletY })
}


function enemyFire(){
    let rand = floor(random(0, enemyX.length))
    let bulletX = enemyX[rand]
    let bulletY = enemyY[rand]

    let VbulletX = cos(enemySpin[a] - 90) * 10
    let VbulletY = sin(enemySpin[a] - 90) * 10




    enemybullets.push({ x: bulletX, y: bulletY, vx: VbulletX, vy: VbulletY })
}