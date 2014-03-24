var board_x = 30;
var board_y = 30;
var timer = "";
var speed = 200;

function main(){
  drawBoard(board_x,board_y);
  init();
  randomBoard();
}

function drawBoard(width,height){
  var table = document.createElement('tbody');
  for(var y = 0;y < height; y++){
    var tr = document.createElement('tr');
    for(var x = 0;x < width; x++){
      var td = document.createElement('td');
      td.id = x+y*width;
      td.style.backgroundColor = x%2==1?"black":"red";
      tr.appendChild(td);
      td.onclick = function(e){
        var td = e.originalTarget;
        if(td.style.backgroundColor == "white")td.style.backgroundColor = "black";
        else td.style.backgroundColor = "white";
      };
    }
    table.appendChild(tr);
  }
  document.getElementById("board").appendChild(table);
  board = document.getElementById("board").children[0];
  document.getElementById("start").onclick = start;
  document.getElementById("stop").onclick = stop;
  document.getElementById("random").onclick = randomBoard;
  document.getElementById("clear").onclick = init;
  document.getElementById("speed").onmousemove = changeSpeed;
}

function getCell(x,y){
  return board.children[y].children[x]; 
}

function clear(x,y){
  getCell(x,y).style.backgroundColor = "black";
}

function set(x,y){
  getCell(x,y).style.backgroundColor = "white";
}

function init(){
  for(var y = 0;y <board_y;y++){
    for(var x=0;x<board_x;x++){
      clear(x,y);
    }
  }
}

function isAlive(x,y){
  if(x < 0 || y < 0 || x >= board_x || y >= board_y ) return 0;
  return getCell(x,y).style.backgroundColor == "white"? 1 : 0;
}

function check(x,y){
  var sum = 0;
  sum = 
    isAlive(x-1,y-1) + isAlive(x,y-1) + isAlive(x+1,y-1) +
    isAlive(x-1,y) + isAlive(x+1,y) +
    isAlive(x-1,y+1) + isAlive(x,y+1) + isAlive(x+1,y+1);
  return sum;
}

function checkBoard(){
  var res = [];
  for(var y = 0;y <board_y;y++){
    var row = [];
    for(var x=0;x<board_x;x++){
      var s = check(x,y);
      if( isAlive(x,y) ){
        if(s < 2 || s > 3)row.push(0);
        else row.push(1);
      } else {
        if(s == 3) row.push(1);
        else row.push(0);
      }
    }
    res.push(row);
  }
  return res;
}

function refrectBoardFromArray(array){
  for(var y = 0;y <board_y;y++){
    for(var x=0;x<board_x;x++){
      if(array[y][x] == 1) set(x,y);
      else clear(x,y);
    }
  }
}

function randomBoard(){
  for(var y = 0;y <board_y;y++){
    for(var x=0;x<board_x;x++){
      if(Math.floor(Math.random()*2)) set(x,y);
      else clear(x,y);
    }
  }
}

function start(){
  timer = setInterval(function(){
    refrectBoardFromArray(checkBoard()); 
  },speed);
  
}

function stop(){
  clearInterval(timer);
}

function changeSpeed(){
  speed = document.getElementById("speed").value;
  stop();
  start();
}
