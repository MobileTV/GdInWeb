var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
Body = Matter.Body;
var engine = Engine.create();
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 600,
        wireframes: false,
        showDebug: true
    }
});
let lastjump = true
let player = Bodies.rectangle(250, 330, 50, 50);
let player1 = Bodies.rectangle(900, 330, 50, 50, {isStatic: true});
var ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });
let i = player1.position.x;
let GameOver = false
//document.onkeydown = checkKey;

/*function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        engine.world.gravity.y = -1;
    }
    else if (e.keyCode == '40') {
        engine.world.gravity.y  = 1;
    }
}
*/

function obstacle() {
    i--
    Body.setPosition(player1, { x: i, y: player1.position.y});
    if (Matter.SAT.collides(player, player1).collided) {
        GameOver = true
    }
    if (player1.position.x <= -200) {
        Body.setPosition(player1, { x: 900, y: player1.position.y});
        i = 900
    }
    if (GameOver) {
        Matter.Body.setStatic(ground, false)
        Matter.Body.setStatic(player1, false)
        Body.setAngularVelocity(ground, Math.PI/480);
        Body.setAngularVelocity(player1, Math.PI/480);
        if (lastjump) {
            Body.applyForce( player, {x: player.position.x, y: player.position.y}, {x: 0, y: -0.07});
            Body.setAngularVelocity(player, Math.PI/80);
        }
        lastjump = false
    }
}
function control_cube() {
    if (!GameOver) {
        player.position.x = 250;
    }
    onclick = function() {
        if (Matter.SAT.collides(player, ground).collided) {
            Body.applyForce( player, {x: player.position.x, y: player.position.y}, {x: 0, y: -0.07});
            Body.setAngularVelocity(player, Math.PI/80);
        }
    }
}

setInterval(control_cube, 1)
World.add(engine.world, [ground,player1, player]);
setInterval(obstacle, 1)
Engine.run(engine);
Render.run(render);