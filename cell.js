class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.offsetX = cellSide;
    this.offsetY = cellSide;
    this.up = true;
    this.down = true;
    this.left = true;
    this.right = true;
    this.color = 'rgba(0, 0, 0)';
    this.visited = false;
  }

  drawInside(){
        colorRect(this.x, this.y, cellSide, cellSide, this.color);
  }
  drawUp(){
      if(this.up){
          drawSegment(this.x, this.y, this.x + this.offsetX, this.y);
      }
  }

  drawDown(){
      if(this.down){
          drawSegment(this.x, this.y + this.offsetY, this.x + this.offsetX, this.y + this.offsetY);
      }
  }

  drawLeft(){
      if(this.left){
          drawSegment(this.x, this.y, this.x, this.y + this.offsetY);
      }
  }

  drawRight(){
      if(this.right){
          drawSegment(this.x + this.offsetX, this.y, this.x + this.offsetX, this.y + this.offsetY);
      }
  }

  drawCurrent(){
      colorRect(this.x, this.y, cellSide, cellSide, 'rgba(255, 255, 255, 0.3)');
  }

  returnPos(){
      return [this.x, this.y];
  }

  update(){

  }
}
