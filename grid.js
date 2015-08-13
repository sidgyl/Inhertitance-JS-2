//grid width and height
var bw = 800;
var bh = 600;
//padding around grid
var p = 0;
//size of canvas
var cw = bw;
var ch = bh;

var canvas = document.getElementById("oDraw");

var context = canvas.getContext("2d");

function drawBoard(){
    for (var x = 0; x <= bw; x += 20) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }


    for (var x = 0; x <= bh; x += 20) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }

    context.strokeStyle = "black";
	context.lineWidth=1;
    context.stroke();
}
