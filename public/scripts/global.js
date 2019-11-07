let canvas;
let context;
let indexX = 0, indexY = 0,
  cols = 3, rows = 3,
  tileWidth, tileHeight,
  x = 0, y = 0,
  width, height;
let img3;
let img2;
const rect = {
  x: 0,
  y: 0,
  width: 200,
  height: 100
};
let timer;
canvas = document.getElementById("canvas");
context = canvas.getContext('2d')
canvas.width = 550;
canvas.height = 550;
tileWidth = Math.round(canvas.width / rows);
tileHeight = Math.round(canvas.height / cols);
