document.getElementById("imageFile").addEventListener("change", handleFile);
/*document.getElementById("imageFile").addEventListener("click", function () {
  const path = new Path2D();
  path.rect(0, 0, 550, 550);
  path.closePath();
  context.fillStyle = "rgb(255,255,255)";
  context.fill(path);
  context.lineWidth = 2;
  context.strokeStyle = "#000000";
  context.stroke(path);
});*/
let yAxis = false
function handleFile() {
  let file = document.getElementById("imageFile").files[0];
  let img = new Image();
  let reader = new FileReader();
  reader.addEventListener("load", function () {
    img.src = reader.result;
  });
  img.onload = function () {
    resizeImage(canvas, img, context);
    //context.drawImage(img, 0, 0);
    calcAndGraph(img);
  }

  if (file) {
    reader.readAsDataURL(file);
  }
}

const resizeImage = function (canvas, img, context) {
  const imgAspectRatio = img.width / img.height;
  const canvasAspectRatio = canvas.width / canvas.height;
  width = canvas.width, height = canvas.height;

  if (canvasAspectRatio > imgAspectRatio) {
    width = img.width * (height / img.height)
    x = (canvas.width - width) / 2;
  }


  if (imgAspectRatio > canvasAspectRatio) {
    height = img.height * (width / img.width);
    y = (canvas.height - height) / 2;
  }
  context.drawImage(img, x, y, width, height);
  //console.log(imgAspectRatio, canvasAspectRatio);
}

function calcAndGraph(img) {
  let rD = {}, gD = {}, bD = {};
  //let cv = document.getElementById("canvas");
  //let context = cv.getContext("2d");
  //cv.width = img.width;
  //cv.height = img.height;
  //console.log(canvas.width, canvas.height);
  //context.drawImage(img, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
  for (var i = 0; i < 256; i++) {
    rD[i] = 0;
    gD[i] = 0;
    bD[i] = 0;
  }
  //console.log(imageData.length);
  //console.log(rD, gD, bD);

  for (var i = 0; i < imageData.length; i += 4) {
    rD[imageData[i]]++;
    gD[imageData[i + 1]]++;
    bD[imageData[i + 2]]++;
  }
  histogram({ rD, gD, bD });
}


function histogram(data) {
  context.lineWidth = "10";
  context.strokeStyle = "orange";
  context.beginPath();
  context.moveTo(x, y + height);
  context.lineTo(x + width, y + height);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y + height);
  context.lineTo(x, y);
  context.stroke();
  //let A = new Point(320, 240);
  //let sqr = new Square(A, 50, "green");
  lerp(data);
  //sqr.draw(context);
}

function lerp(data) {
  let maxRed = Math.max(data.rD[0]);
  let maxGreen = Math.max(data.gD[0]);
  let maxBlue = Math.max(data.bD[0]);
  console.log((maxRed / height) * 100, (maxGreen / height) * 100, maxBlue / height) * 100;
  let source = new Point(x, y + height);
  let destination = new Point(x + width, y + height);
  let points = 255;
  let tMin = 0.0, tMax = 1.0, delT = (tMax - tMin) / points;
  let t = tMin;
  let lerpX = {}, lerpY = {};
  let i = 0;
  timer = setInterval(function () {
    if (i < points) {
      lerpX[i] = Math.round(source.x + (destination.x - source.x) * t);
      lerpY[i] = Math.round(source.y + (destination.y - source.y) * t);
      t += delT;
      let redHeight = (data.rD[i] / height) * 20;

      let greenHeight = (data.gD[i] / height) * 20;
      let blueHeight = (data.bD[i] / height) * 20;
      let tweenRed = new Point(lerpX[i], lerpY[i], redHeight, "rgb(255,0,0,0.5)");
      let tweenGreen = new Point(lerpX[i], lerpY[i], greenHeight, "rgb(0,255,0,0.5)");
      let tweenBlue = new Point(lerpX[i], lerpY[i], blueHeight, "rgb(0,0,255,0.5)");

      tweenRed.drawRect(context);
      tweenGreen.drawRect(context);
      tweenBlue.drawRect(context);

      i++;
    } else {
      clearInterval(timer);
    }
  }, 50);

}

/*function histogram(data) {
  let W = 800;
  let H = W / 1.8;
  const svg = d3.select('svg');
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = W - margin.left - margin.right;
  const height = H - margin.top - margin.bottom;
  let q = document.querySelector('svg');
  q.style.width = width;
  q.style.height = height;
  if (yAxis) { d3.selectAll("g.y-axis").remove(); yAxis = false; }

  function graphComponent(data, color) {
    d3.selectAll(".bar-" + color).remove();
    var data = Object.keys(data).map(function (key) { return { freq: data[key], idx: +key } });
    var x = d3.scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data, function (d) { return d.idx; })]);
    var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, function (d) { return d.freq; })]);
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    if (!yAxis) {
      yAxis = true;
      g.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + -5 + ",0)")
        .call(d3.axisLeft(y).ticks(10).tickSizeInner(10).tickSizeOuter(2));
    }
    g.selectAll(".bar-" + color)
      .data(data)
      .enter().append("rect")
      .attr("class", "bar-" + color)
      .attr("fill", color)
      .attr("x", function (d) { return x(d.idx); })
      .attr("y", function (d) { return y(d.freq); })
      .attr("width", 2)
      .attr("opacity", 0.8)
      .attr("height", function (d) { return height - y(d.freq); })
  }
  graphComponent(data.gD, "green");
  graphComponent(data.bD, "blue");
  graphComponent(data.rD, "red");
}
*/