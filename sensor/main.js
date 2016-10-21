var gestures = {};
var collection = "test";

// prevent scrolling
document.ontouchmove = function(event) {
    event.preventDefault();
}

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
    var t = Date.now() / 1000.0;
}

function onInput() {
    collection_input.style('color', "blue");
}

function setCollection() {
    collection = collection_input.value().trim();
    collection_input.style('color', "gray");
}

function draw() {

    background(255, 204, 0);

    var t = Date.now() / 1000.0;

    var current_gesture_ids = [];

    // update gestures and add new ones
    for (var i in touches) {
        var touch = touches[i];
        var gesture_id = touch['id'].toString();
        if (!(gesture_id in gestures)) {
            gestures[gesture_id] = new Gesture(gesture_id);
        } 
        var gesture = gestures[gesture_id];
        gesture.update(touch['x'], touch['y'], t);
        current_gesture_ids.push(gesture_id);
    }

    // remove gestures that have disappeared
    for (var gesture_id in gestures) {
        if (current_gesture_ids.indexOf(gesture_id) < 0) {
            gestures[gesture_id].send();
            delete gestures[gesture_id];
        }
    }

    // draw the gesture
    for (var g in gestures) {
        gestures[g].draw();
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
        strokeWeight(5);
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
