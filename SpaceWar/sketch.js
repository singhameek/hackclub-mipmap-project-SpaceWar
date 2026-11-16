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
    pX = constrain(pX, 10, 990)
    pY = constrain(pY, 10, 990)



    background(0);


    if (!enemy) return



    for (let j = 0; j < enemyX.length; j++) {
        

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



        for(let k = 0; k < enemy)


        enemyX[j] = constrain(enemyX[j], 10, 990)
        enemyY[j] = constrain(enemyY[j], 10, 990)


        image(enemy, enemyX[j], enemyY[j], 40, 40)
    }




    push()
    translate(pX + 10, pY)
    rotate(playerSpin)
    image(player, 0, 0, 40, 40)
    pop()





    if(mouseX > pX){
        pX ++
    }
    else if(mouseX < pX){
        pX--
    }

    if(mouseY > pY){
        pY ++
    }

    if(mouseY < pY){
        pY--
    }


}


function mousePressed() {
    console.log(mouseX, mouseY)
}