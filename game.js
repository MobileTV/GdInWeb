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
        height: 400,
        wireframes: false,
        showDebug: true
    }
});
let player = Bodies.rectangle(250, 330, 50, 50);
var ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });
var ground1 = Bodies.rectangle(400, 20, 810, 60, { isStatic: true });
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        engine.world.gravity.y = -1;
    }
    else if (e.keyCode == '40') {
        engine.world.gravity.y  = 1;
    }
}
function l() {
    if (Matter.SAT.collides(player, ground1).collided) {
        console.log("loxxxxxxxxxxxx")
    }
}
setInterval(l, 1000 / 60)
World.add(engine.world, [ground,ground1, player]);
Engine.run(engine);
Render.run(render);