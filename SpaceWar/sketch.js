let pX = 400, pY = 700
let enemyX = []
let enemyY = []



function setup() {
    createCanvas(800, 800);
    for (let i = 0; i <= 20; i++) {
        let cEX = floor(random(100, 700))
        let cEY = floor(random(100, 700))
        enemyX[i] = cEX
        enemyY[i] = cEY
        console.log(enemyX[i], enemyY[i])
    }
}

function draw() {
    background(0);
    



}
