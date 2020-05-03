var balls;
var BALL_SIZE = 20;
var BALL_SPEED = 3;
var MAX_BALLS = 3;
var BRICK_THRESHOLD = 5;
var score;
var isGameOver;
var showStartScreen;
var bricks;
var brickLevel;

function createBrick() {
  return {
    x: random(0, width),
    y: random(0, height),
    width: random(50, width / 4),
    height: random(50, height / 4),
  }
}

function createBall() {
  return {
    x: random(BALL_SIZE, height - BALL_SIZE),
    y: random(BALL_SIZE, width - BALL_SIZE),
    xSpeed: random(1, BALL_SPEED + 1) * (random(0, 1) > 0.5 ? 1 : -1),
    ySpeed: random(1, BALL_SPEED + 1) * (random(0, 1) > 0.5 ? 1 : -1),
    color: random(10, 80)
  };
}

function setup() {
  createCanvas(400, 400);
  colorMode(HSB);
  mySound.play();
  showStartScreen = true;
  balls = [];
  bricks = [];
  brickLevel = 0;
}

//Music
function preload() {
  soundFormats("mp3");
  mySound = loadSound("soundtrack.mp3");
  bounceSound = loadSound("pop.mp3");
}

//Music loops
function draw() {
  background(318, 22, 100);

  if (frameCount % 1800 == 0) {
    mySound.play();
  }

  noStroke()

  // show game over screen
  if (isGameOver) {
    textAlign(CENTER, CENTER);
    textSize(48);
    textStyle(BOLD);
    fill(359, 79, 85);
    text('GAME OVER', width / 2, height / 2);
    fill(0);
    textSize(14);
    textStyle(NORMAL);
    text('Press enter to start over', width / 2, height / 2 + 42);
  }

  if (showStartScreen) {
    textSize(48);
    textAlign(CENTER, CENTER);
    fill(119, 60, 57);
    textStyle(BOLD);
    text('INFECTION', width / 2, height / 4);
    textSize(18);
    fill(0);
    textStyle(NORMAL);
    text('Click the germs to destroy them.', width / 2, height / 2);
    textStyle(ITALIC);
    text('Hurry before there\'s too many!', width / 2, height / 2 + 32);
    textStyle(NORMAL);
    textSize(14);
    text('Press enter to play', width / 2, height * 3 / 4);
  }

  if (!showStartScreen) {
    fill(0)
    textAlign(LEFT);
    textSize(14);
    text('Score: ' + score, 10, 30);

    for (var ball of balls) {
      ballAction(ball);
    }

    ballCollision(balls);

    //adding bricks
    if (score % 5 == 0 && score > 0 && score > brickLevel) {
      brickLevel = score;
      bricks = [createBrick(), createBrick()];
    }

    //Adding balls
    if (frameCount % 120 == 0 && balls.length < MAX_BALLS) {
      balls.push(createBall());

      if (balls.length == MAX_BALLS) {
        isGameOver = true
      }
    }
  }

  // draw bricks
  if (!showStartScreen && !isGameOver) {
    for (var brick of bricks) {
      fill(352, 67, 70);
      rect(brick.x, brick.y, brick.width, brick.height);
    }
  }


}


//Kill
function mousePressed() {
  if (!isGameOver) {
    for (var index in balls) {
      var ball = balls[index];
      if (abs(mouseX - ball.x) < BALL_SIZE && abs(mouseY - ball.y) < BALL_SIZE) {
        balls.splice(index, 1);
        score += 1;
      }
    }
  }
}

function ballAction(ball) {
  fill(132, 52, ball.color);
  circle(ball.x, ball.y, BALL_SIZE * 2);

  ball.x += ball.xSpeed;
  ball.y += ball.ySpeed;

  //Top edg barrier
  if (ball.x < BALL_SIZE) {
    bounceSound.play();
    ball.xSpeed *= -1;
  }

  //Right edge barrier
  if (ball.x > height - BALL_SIZE) {
    bounceSound.play();
    ball.xSpeed *= -1;
  }

  //Bottom edge barrier
  if (ball.y > width - BALL_SIZE) {
    bounceSound.play();
    ball.ySpeed *= -1;
  }

  //Left edge barrier
  if (ball.y < BALL_SIZE) {
    bounceSound.play();
    ball.ySpeed *= -1;

  }
}

function ballCollision(balls) {
  for (var i = 0; i < balls.length - 1; i += 1) {
    var ballA = balls[i];
    for (var j = i + 1; j < balls.length; j += 1) {
      var ballB = balls[j];

      // check if balls collided
      // console.log(dist(ballA.x, ballA.y, ballB.x, ballB.y));
      if (dist(ballA.x, ballA.y, ballB.x, ballB.y) <= BALL_SIZE * 2) {
        ballA.color = random(10, 80)
        ballB.color = random(10, 80)
        var aXSpeed = ballA.xSpeed;
        var aYSpeed = ballA.ySpeed;
        ballA.xSpeed = ballB.xSpeed;
        ballA.ySpeed = ballB.ySpeed;
        ballB.xSpeed = aXSpeed;
        ballB.ySpeed = aYSpeed;
      }
    }
  }
}

function brickCollision(balls, bricks) {
  for (var i in balls) {
    var ball = balls[i];
    for (var j in bricks) {
      var brick = bricks[j];

      // check if ball collided with brick
      if (ball.x) {
          
      }
      
      
      
      // left side of brick
      if (ball.x < ) {
        bounceSound.play();
        ball.xSpeed *= -1;
      }

      //Right edge barrier
      if (ball.x > height - BALL_SIZE) {
        bounceSound.play();
        ball.xSpeed *= -1;
      }

      //Bottom edge barrier
      if (ball.y > width - BALL_SIZE) {
        bounceSound.play();
        ball.ySpeed *= -1;
      }

      // top of brick
      if (ball.y < BALL_SIZE) {
        bounceSound.play();
        ball.ySpeed *= -1;

      }




      if (dist(ballA.x, ballA.y, ballB.x, ballB.y) <= BALL_SIZE * 2) {
        ballA.color = random(10, 80)
        ballB.color = random(10, 80)
        var aXSpeed = ballA.xSpeed;
        var aYSpeed = ballA.ySpeed;
        ballA.xSpeed = ballB.xSpeed;
        ballA.ySpeed = ballB.ySpeed;
        ballB.xSpeed = aXSpeed;
        ballB.ySpeed = aYSpeed;
      }
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER && (isGameOver || showStartScreen)) {
    startGame();
  }
}

function startGame() {
  showStartScreen = false
  balls = [createBall()];
  score = 0;
  isGameOver = false;
  bricks = [];
  brickLevel = 0;
}
