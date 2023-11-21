const canvas = document.getElementById('game');

const context = canvas.getContext('2d');

const grid = 10;
const N = 20;

let player = {'row':10, 'col':10};
let food = {'row':1, 'col':1};
let wall = {'row':19, 'col':19};
let direction = "right";
let count = 0; 

function loop() {
    rAF = requestAnimationFrame(loop);

    context.clearRect(0,0, canvas.width, canvas.height);
    if (++count === 7) {
        if (direction === 'right') player.col++;
        if (direction === 'left') player.col--;
        if (direction === 'up') player.row--;
        if (direction === 'down') player.row++;

        count = 0;
    }

    //wall 
    if (player.row === wall.row && player.col === wall.col) {
        cancelAnimationFrame(rAF);
    }
    //food
    if (player.row === food.row && player.col === food.col) {
        food.row = Math.floor(Math.random()*N);
        food.col = Math.floor(Math.random()*N);

        wall.row = Math.floor(Math.random()*N);
        wall.col = Math.floor(Math.random()*N);
    }

    //player
    context.fillStyle = 'yellow';
    context.fillRect(player.col * grid, player.row * grid, grid -1, grid -1);

    //food
    context.fillStyle = 'green';
    context.fillRect(food.col * grid, food.row * grid, grid -1, grid -1);

    //wall
    context.fillStyle = 'red';
    context.fillRect(wall.col * grid, wall.row * grid, grid -1, grid -1);
}


document.addEventListener('keydown', function(e) {
    if (e.which === 37) direction = "left"
    if (e.which === 39) direction = "right"
    if (e.which === 38) direction = "up"
    if (e.which === 40) direction = "down"
});
rAF = requestAnimationFrame(loop);