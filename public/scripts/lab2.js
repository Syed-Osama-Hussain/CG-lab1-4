window.onLoad = init();

function init() {
  display();
}

function display() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext('2d');
  const path = new Path2D();
  path.rect(0, 0, 550, 550);
  path.closePath();
  context.fillStyle = "#FFFFFF";
  context.fillStyle = "rgba(255,255,255,0.5)";
  context.fill(path);
  context.lineWidth = 2;
  context.strokeStyle = "#000000";
  context.stroke(path);
}

function getMousePosition(canvas, event) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y > rect.y && pos.y < rect.y + rect.height
}

canvas.addEventListener("click", function (event) {
  const mousePosition = getMousePosition(canvas, event);
  if (isInside(mousePosition, rect)) {
    alert("Mouse is inside");
  } else {
    alert("Mouse outside");
  }
})