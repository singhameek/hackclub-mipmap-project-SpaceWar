let pX = 400, pY = 700
let enemyX = []
let enemyY = []
let enemy





async function setup() {
    createCanvas(800, 800);
    for (let i = 0; i < 20; i++) {
        let cEX = floor(random(100, 700))
        let cEY = floor(random(100, 700))
        enemyX[i] = cEX
        enemyY[i] = cEY
        console.log(enemyX[i], enemyY[i])
    }
    enemy = await loadImage("enemy.png")
    console.log(enemy)
}

function draw() {
    background(0);
    if (!enemy) return // as of right now (early dev) enemy throws undefined error so this skips function draw until it is defined
    for (let j = 0; j < enemyX.length; j++) {
        image(enemy, enemyX[j], enemyY[j], 20, 20)
        
        if(enemyX[j] > pX){
            enemyX[j]--
        }
        else if (enemyX[j] < pX){
            enemyX[j]++
        }

        if(enemyY[j] > pY){
            enemyY[j]--
        }
        else if (enemyY[j] < pY){
            enemyY[j]++
        }


        enemyX[j] = constrain(enemyX[j], 10, 790)
        enemyY[j] = constrain(enemyY[j], 10, 790)
    }

    


}


function mousePressed(){
    console.log(mouseX, mouseY)
}