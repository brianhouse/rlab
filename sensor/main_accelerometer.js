var gesture = null;
var collection = "test";
var accel_x = 0.5;
var accel_y = 0.5;
var accel_z = 0.5;

// prevent scrolling
document.ontouchmove = function(event) {
    event.preventDefault();
}

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

// accelerometer Data
window.addEventListener('devicemotion', function(e) {
    accel_x = ((parseFloat(e.acceleration.x) / 20.0).clamp(-1.0, 1.0) + 1.0) / 2.0;
    accel_y = ((parseFloat(e.acceleration.y) / 20.0).clamp(-1.0, 1.0) + 1.0) / 2.0;
    accel_z = ((parseFloat(e.acceleration.z) / 20.0).clamp(-1.0, 1.0) + 1.0) / 2.0;
    // console.log(accel_x + "," + accel_y + "," + accel_z); 
});

function setup() {
    console.log("Hello world");
    var canvas = createCanvas(displayWidth, displayHeight);
    canvas.parent('p5');
    collection_input = createInput();
    collection_input.position(0, 0);
    collection_input.size(displayWidth / 2);
    collection_input.input(onInput);
    collection_set = createButton('set');
    collection_set.position(displayWidth / 2, 0);
    collection_set.mousePressed(setCollection);

    start_accel = createButton('start');
    start_accel.position(0, 25);
    start_accel.mousePressed(startAccel);

    stop_accel = createButton('stop');
    stop_accel.position(50, 25);
    stop_accel.mousePressed(stopAccel);

    var t = Date.now() / 1000.0;
}

function onInput() {
    collection_input.style('color', "blue");
}

function setCollection() {
    collection = collection_input.value().trim();
    collection_input.style('color', "gray");
}

function startAccel() {
    console.log('startAccel');
    var gesture_id = Math.floor(Date.now() / 1000);
    gesture = new Gesture(gesture_id);
}

function stopAccel() {
    console.log('stopAccel');
    if (gesture != null) {
        gesture.send();
        gesture = null;
    }
}

function draw() {

    background(255, 204, 0);

    var t = Date.now() / 1000.0;

    if (gesture != null) {
        gesture.update(accel_x * canvas.width/2, accel_y * canvas.height/2, t);
        gesture.draw();
    }

}


function Gesture(id) {

    this.id = id;
    this.history = [];
    this.ts = [];
    this.x = null;
    this.y = null;

    this.update = function(x, y, t) {
        this.x = x;
        this.y = y;
        this.history.push(createVector(x, y));
        this.ts.push(t);
    };

    this.draw = function() {
        fill(255);
        ellipse(this.x, this.y, 10, 10);
        noFill();
        stroke(255);
        strokeWeight(1);
        beginShape();
        for (var h in this.history) {
            var pos = this.history[h];
            vertex(pos.x, pos.y);
        }
        endShape();
    };

    this.send = function() {
        var xs = [];
        var ys = [];
        for (var v in this.history) {
            var vector = this.history[v];
            xs.push(vector.x / canvas.width);
            ys.push(vector.y / canvas.height);
        }
        db.insert(collection, {id: this.id, ts: this.ts, xs: xs, ys: ys});
    };

}
