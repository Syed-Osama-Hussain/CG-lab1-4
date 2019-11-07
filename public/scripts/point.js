class Point {
  constructor(x, y, h, color) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.color = color;
  }

  getPoint() {
    return { x: this.x, y: this.y };
  }

  drawRect(context) {
    let f = true;
    const rect = new Rectangle(new Point(this.x - 3, this.y),
      new Point(this.x + 3, this.y),
      new Point(this.x + 3, this.y - this.h),
      new Point(this.x - 3, this.y - this.h), this.color, f);
    rect.draw(context);
  }

  drawPoint() {
    const square = new Square(new Point(320, 240), 50, "green");
    square.draw(context);
  }
}


class Square {
  constructor(origin, length, color) {
    this.origin = origin;
    this.length = length;
    this.color = color;
  }

  setOrigin(origin) {
    this.origin = origin;
  }

  draw(context) {
    context.beginPath();
    context.lineWidth = "1";
    context.moveTo(this.origin.x, this.origin.y);
    context.lineTo(this.origin.x + this.length, this.origin.y);
    context.lineTo(this.origin.x + this.length, this.origin.y + this.length);
    context.lineTo(this.origin.x, this.origin.y + this.length);
    context.lineTo(this.origin.x, this.origin.y);
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.stroke();
    context.fill();
    context.closePath();
  }
}


class Rectangle {
  constructor(left, right, top, bottom, color, flag) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
    this.color = color;
    this.flag = flag;
  }

  draw(context) {
    context.lineWidth = "1";
    context.beginPath();
    context.moveTo(this.left.x, this.left.y);
    context.lineTo(this.right.x, this.right.y);
    context.lineTo(this.right.x, this.top.y);
    context.lineTo(this.left.x, this.top.y);
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.stroke();
    if (this.flag) context.fill();
    context.closePath();
  }
}