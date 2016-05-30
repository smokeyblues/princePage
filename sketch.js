var system;
var system1;
var system2;
var fr = 30;
var princeX = -200;
var titleAlpha = 0;


function setup() {
  var canvas = createCanvas(windowWidth, 400);
  canvas.parent('canvasP');
  frameRate(fr);
  system = new ParticleSystem(createVector(width/1.25, -25));
  system1 = new ParticleSystem(createVector(width/4.5, -25));
  system2 = new ParticleSystem(createVector(width/2, -25));
  img = loadImage("princePerforming.png"); 
}

function draw() {
    background(90, 42, 172);
    image(img, princeX, height/3, img.width/2, img.height/2);
  system.addParticle();
  system.run();
  system1.addParticle();
  system1.run();
  system2.addParticle();
  system2.run();
  princeX+=5;
  
  if (princeX > width - 300) {
    princeX = width - 300;
  }
  
  if (princeX > width - 350) {
    fill(255, titleAlpha);
    textFont("Impact");
    textSize(64);
    text("Prince", width/4, height/2);
    textFont("Avant Garde");
    textSize(18);
    text("1958 to 2016", width/4, height/1.9);
    titleAlpha+=3;
  }
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-2, 2), random(-5, 2));
  this.position = position.copy();
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2.35;
};

// Method to display
Particle.prototype.display = function() {
  noStroke();
  // stroke(200, this.lifespan);
  // strokeWeight(2);
  fill(random(255), random(255), random(255), this.lifespan);
  quad(this.position.x, this.position.y, this.position.x + random(-20, 20), this.position.y + random(-20, 20), this.position.x + random(-20, 20), this.position.y + random(-20, 20), this.position.x + random(-20, 20), this.position.y + random(-20, 20));
  //ellipse(this.position.x, this.position.y, random(6, 24), random(6, 24));
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};