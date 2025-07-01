let canvas;
//let socket = io();

let drawings = [];

let stars = [];
let tapes = [];
let date = Date(Date.now());
let date1 = date.toString()
let date2 = date1.substr(4, 11)


function onStarPosition(data) {
  if (data.elementName == "star") {
    starStamp.style.left = `${data.x}px`;
    starStamp.style.top = `${data.y}px`;
  } else if (data.elementName == "anora") {
    // move the circle
    anora.style.left = `${data.x}px`;
    anora.style.top = `${data.y}px`;
  } else if (data.elementName == "punchcard") {
    punchcard.style.left = `${data.x}px`;
    punchcard.style.top = `${data.y}px`;
  } else if (data.elementName == "tape") {
    // move the circle
    tapeStamp.style.left = `${data.x}px`;
    tapeStamp.style.top = `${data.y}px`;
  }
}

function setup() {
  canvas = createCanvas(1000, 720);

  //socket.on("stamp", onStamp);
  //socket.on("moveStar", onStarPosition);

  let anora = document.getElementById("anora");
  anora.addEventListener("dragstart", function (ev) {
    ev.preventDefault();
  });

  let punchcard = document.getElementById("punchcard");
  punchcard.addEventListener("dragstart", function (ev) {
    ev.preventDefault();
  });

  let orange = document.getElementById("orange");
  orange.addEventListener("dragstart", function (ev) {
    ev.preventDefault();
  });
  let book = document.getElementById("book");
  book.addEventListener("dragstart", function (ev) {
    ev.preventDefault();
  });
  let asterisk = document.getElementById("asterisk");
  asterisk.addEventListener("dragstart", function (ev) {
    ev.preventDefault();
  });
  let vase = document.getElementById("vase");
  vase.addEventListener("dragstart", function (ev) {
    ev.preventDefault();
  });
  let receipt = document.getElementById("receipt");
  receipt.addEventListener("dragstart", function (ev) {
    ev.preventDefault();
  });
  
  let instructions = document.getElementById("instructions");
  instructions.addEventListener("click", function() {
        instructions.style.display = "none";
  });
  instructions.addEventListener("dragstart", function (ev) {
    ev.preventDefault();
  });

  let starButton = document.getElementById("starButton");
  starButton.addEventListener("click", addStar);

  let tapeButton = document.getElementById("tapeButton");
  tapeButton.addEventListener("click", addTape);
  

}

function draw() {
  background(200, 200, 240, 0);

  strokeWeight(0);
  fill(0);
  textSize(20);
  textFont("Special Elite");
  // text("mon. oct 21, 2024", 25, 45);
  text(date2 + " Scrapbook", 25, 45);

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.display();
  }
}

function addStar() {
  // how to change only on button click -- currently on any mouseclick
  let data = {
    x: mouseX,
    y: mouseY,
    url: "assets/starstamp.png",
    width: 80,
    height: 73,
  };
  onStamp(data);
  //socket.emit("stamp", data);
}

function addTape() {
  let data = {
    x: mouseX,
    y: mouseY,
    url: "assets/tape1010.png",
    width: 130,
    height: 130,
  };
  onStamp(data);
  //socket.emit("stamp", data);
}




// DRAWING
function onPaint(data) {
  drawings.push(data);
}

// MAKE STAMP
function onStamp(data) {
  stars.push(
    new MyStamp(
      random(10, 990),
      random(60, 600),
      data.url,
      data.width,
      data.height
    )
  );
}

// MAKE STAMP
class MyStamp {
  constructor(x, y, url, width, height) {
    // within our constructor, save the x and y position
    this.x = x;
    this.y = y;
    // this.rot = 0.7;
    this.img = loadImage(url);
    this.width = width;
    this.height = height;
  }

  display() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    image(this.img, 0, 0, this.width, this.height);
    pop();
  }
}

// --------------

// DRAGGABLE ELEMENTS

// https://codepen.io/dennisivy/pen/VwNEPvY
// https://www.youtube.com/watch?v=ymDjvycjgUM

let newX = 0,
  newY = 0,
  startX = 120,
  startY = 150;

anora.addEventListener("mousedown", mouseDown);
punchcard.addEventListener("mousedown", mouseDown2);
orange.addEventListener("mousedown", mouseDown3);
book.addEventListener("mousedown", mouseDown4);
asterisk.addEventListener("mousedown", mouseDown5);
vase.addEventListener("mousedown", mouseDown6);
receipt.addEventListener("mousedown", mouseDown7);

function mouseDown(e) {
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove);
  document.addEventListener("mouseup", mouseUp);
}

function mouseMove(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  anora.style.top = anora.offsetTop - newY + "px";
  anora.style.left = anora.offsetLeft - newX + "px";

  let starPosition = {
    elementName: "anora",
    x: e.clientX - offsetX,
    y: e.clientY - offsetY,
  };

  //socket.emit("moveStar", StarPosition);
}

function mouseUp(e) {
  document.removeEventListener("mousemove", mouseMove);
}

// PUNCHCARD

function mouseDown2(e) {
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove2);
  document.addEventListener("mouseup", mouseUp2);
}

function mouseMove2(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  punchcard.style.top = punchcard.offsetTop - newY + "px";
  punchcard.style.left = punchcard.offsetLeft - newX + "px";

  let starPosition = {
    elementName: "punchcard",
    x: e.clientX - offsetX,
    y: e.clientY - offsetY,
  };

  //socket.emit("moveStar", punchcardPosition);
}

function mouseUp2(e) {
  document.removeEventListener("mousemove", mouseMove2);
}

// ORANGE

function mouseDown3(e) {
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove3);
  document.addEventListener("mouseup", mouseUp3);
}

function mouseMove3(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  orange.style.top = orange.offsetTop - newY + "px";
  orange.style.left = orange.offsetLeft - newX + "px";
}

function mouseUp3(e) {
  document.removeEventListener("mousemove", mouseMove3);
}

// BOOK

function mouseDown4(e) {
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove4);
  document.addEventListener("mouseup", mouseUp4);
}

function mouseMove4(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  book.style.top = book.offsetTop - newY + "px";
  book.style.left = book.offsetLeft - newX + "px";
}

function mouseUp4(e) {
  document.removeEventListener("mousemove", mouseMove4);
}

// ASTERISK

function mouseDown5(e) {
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove5);
  document.addEventListener("mouseup", mouseUp5);
}

function mouseMove5(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  asterisk.style.top = asterisk.offsetTop - newY + "px";
  asterisk.style.left = asterisk.offsetLeft - newX + "px";
}

function mouseUp5(e) {
  document.removeEventListener("mousemove", mouseMove5);
}

// VASE

function mouseDown6(e) {
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove6);
  document.addEventListener("mouseup", mouseUp6);
}

function mouseMove6(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  vase.style.top = vase.offsetTop - newY + "px";
  vase.style.left = vase.offsetLeft - newX + "px";
}

function mouseUp6(e) {
  document.removeEventListener("mousemove", mouseMove6);
}

// RECEIPT

function mouseDown7(e) {
  startX = e.clientX;
  startY = e.clientY;

  document.addEventListener("mousemove", mouseMove7);
  document.addEventListener("mouseup", mouseUp7);
}

function mouseMove7(e) {
  newX = startX - e.clientX;
  newY = startY - e.clientY;

  startX = e.clientX;
  startY = e.clientY;

  receipt.style.top = receipt.offsetTop - newY + "px";
  receipt.style.left = receipt.offsetLeft - newX + "px";
}

function mouseUp7(e) {
  document.removeEventListener("mousemove", mouseMove7);
}
