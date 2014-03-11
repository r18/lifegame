function main(){
  drawBoard(4,4);
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
    }
    table.appendChild(tr);
  }
  document.getElementById("board").appendChild(table);
  
}
