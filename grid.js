var grid = "";
var x = 50, y=20;
var Grid = document.querySelector('#Grid');
for(let i=0;i<y;i++){
	grid += "<div class='row'>" ;
	for(let j=0;j<x;j++){
		grid += "<div class='box' data-x='" + j + "' data-y='" + i + "' data-state='none'>"  + "</div>";
	}
	grid += "</div>";
}

document.getElementById("Grid").innerHTML = grid;