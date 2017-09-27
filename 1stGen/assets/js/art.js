var edge = 32;
var array = [];
var numx = 11;
var numy = 4;
var startDrawX, startDrawY;
var flag = 0;
var time = 0;

var art = [
  0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1,
  1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
  1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0,
  1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0
];

function setup() {
  createCanvas(750, 400);
  background(0);
  for(var i=0;i<numx;i++){
    for(var j=0;j<numy;j++){
      var index = i + j*numx;
      if(art[index]){
    array.push(new Cell((i*edge),(j*edge)));
      }
    }
  }
  startDrawX = (width - (edge*(numx-0.5)))/2;
  startDrawY = (height - (edge*(numy-0.5)))/2;
}

function draw() {
  time++;
  if(time>300) {
    flag = 1- flag;
    time = 0;
  }
  background(0);
  if(flag) {
    for(var i=0;i<array.length;i++) {
      array[i].move();
    }
  } else {
    for(var i=0;i<array.length;i++) {
      array[i].goHome();
    }
  }
  push();
  translate(startDrawX, startDrawY);
  for(var i=0;i<array.length;i++){
    array[i].draw();
  }
  pop();
}

function mouseReleased() {
  flag = 1 - flag;
  time = 0;
}

function touchEnded() {
  flag = 1 - flag;
  time = 0;
}

var Cell = function(x, y) {
  this.x = x;
  this.y = y;
  this.startx = x;
  this.starty = y;
  this.dirX = random(-5, 5);
  this.dirY = random(-5, 5);
  this.speedBackX;
  this.speedBackY;
  this.edge = edge*2/3;
  this.seed = random(10);
}

Cell.prototype.draw = function() {
  noStroke();
  fill(255);
  rect(this.x, this.y, this.edge, this.edge)
  fill(224);
  triangle((this.x+this.edge), this.y, this.x, (this.y+this.edge),(this.x+this.edge), (this.y+this.edge));
  this.seed += 0.05
}

Cell.prototype.move = function() {
  this.x += this.dirX * noise(this.seed);
  this.y += this.dirY * noise(this.seed);
}

Cell.prototype.goHome = function() {
  this.speedBackX = (this.startx - this.x) / 8;
  this.speedBackY = (this.starty - this.y) / 8;
  this.x += this.speedBackX;
  this.y += this.speedBackY;
}