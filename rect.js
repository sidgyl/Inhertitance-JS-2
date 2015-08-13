
var imported = document.createElement('script');
imported.src = 'grid.js';
document.head.appendChild(imported);

var canvas = document.getElementById('oDraw'),
    ctx = canvas.getContext('2d'),
    rect = {},
    drag = false;
	
var mouseup=false;
var fillColor;
var strokeColor;
var strokeThickness;
var modeOption;
var counter = 0;
var myRect = [];
var tempMyRect = [];
var tempMyRect1 = [];
var xTemp,yTemp,xstart,ystart;
var tempFill = "none";
var tempColor = "grey";
var tempThick = 5;
var flag=1;
var xul1,yul1,xlr1,ylr1,index;
var tempFill, tempstroke, tempthickness;
//var rect;

function Shape(x, y, w, h, fill,color, thickness, container) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.fill = fill;
    this.color = color;
    this.thickness = thickness;
    this.container = container;
}
	
	
function init() {
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false);
}

function mouseDown(e) {
  rect.startX = e.pageX - this.offsetLeft;
  rect.startY = e.pageY - this.offsetTop;
  drag = true;
  mouseup = false;
  console.log("in mouse down");
}

function setcontainment(){
	var index = (myRect.length)-1;
	currRec = myRect[index];
	for(var i in myRect){
		oRec = myRect[i];
		if(currRec.x>oRec.x && currRec.y>oRec.y && (currRec.x+currRec.w)<(oRec.x+oRec.w) && (currRec.y+currRec.h)<(oRec.y+oRec.h)){
			currRec.container = i;
		}
	}
}

function mouseUp(e) {

	console.log("in mouse up");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBoard();
	for ( var i in myRect) {
			oRec = myRect[i];        	
			draw(oRec.x, oRec.y,oRec.w,oRec.h,oRec.fill,oRec.color,oRec.thickness);
	}
	
	if((drag == true) && (rect.w!=0) && (rect.h!=0))
	{
		if(drawable() == true && modeOption == 1){
			setCordinates(rect.startX, rect.startY, rect.w, rect.h);
			myRect.push(new Shape(xul1, yul1, Math.abs(rect.w), Math.abs(rect.h), fillColor,strokeColor,strokeThickness,-1));
			
			console.log("tempfill="+tempFill+" tempstroke="+tempstroke);
			
			if(tempFill == 1){
				fillColor = "inherit";
				tempFill = 0;
			}
			
			if(tempstroke == 1){
				strokeColor = "inherit";
				tempstroke = 0;
			}
			
			if(tempthickness == 1){
				strokeThickness = "inherit";
				tempthickness = 0;
			}
			console.log("setting the container");
			setcontainment();
		}	
		
		for ( var i in myRect) {
        	oRec = myRect[i];        	
        	draw(oRec.x, oRec.y,oRec.w,oRec.h,oRec.fill,oRec.color,oRec.thickness);
		}
		rect.w=rect.h=rect.starX=rect.startY=0
	}
	
	if(modeOption==2){
	console.log("inside modeOption=2, mouseup");
	var xC,yC;
  	xC = e.pageX-this.offsetLeft;
  	yC = e.pageY-this.offsetTop;
  	if(checkOverlap(xC,yC) != 0){
  		console.log("inside checkoverlap");
  		ctx.clearRect(0,0,canvas.width,canvas.height);
		drawBoard();
		for(var i in myRect){
			oRec = myRect[i];
			if(index == i){
				if(fillColor == "inherit")
					oRec.fill = myRect[oRec.container].fill;
				else
					oRec.fill=fillColor
					
				if(strokeColor == "inherit")
					oRec.color = myRect[oRec.container].color
				else
					oRec.color=strokeColor;
					
				if(strokeThickness == 7)
					oRec.thickness = myRect[oRec.container].thickness
				else
					oRec.thickness=strokeThickness;
				draw(oRec.x, oRec.y,oRec.w,oRec.h,oRec.fill,oRec.color,oRec.thickness);
			}else
				draw(oRec.x, oRec.y,oRec.w,oRec.h,oRec.fill,oRec.color,oRec.thickness);
		}
  	}
  }
  
	drag = false;
	mouseup = true;
}

function mouseMove(e) {
  if (drag) {
    rect.w = (e.pageX - this.offsetLeft) - rect.startX;
    rect.h = (e.pageY - this.offsetTop) - rect.startY ;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawBoard();
    for ( var i in myRect) {
        	oRec = myRect[i];        	
        	draw(oRec.x, oRec.y,oRec.w,oRec.h,oRec.fill,oRec.color,oRec.thickness);
	}
  
	if(myRect.length == 0 && modeOption == 1)
		draw(rect.startX,rect.startY,rect.w,rect.h,fillColor,strokeColor,strokeThickness);
	else
		if(drawable() == true && modeOption == 1){
			var cIndex;
			for(var i in myRect){
				oRec = myRect[i];
				if(rect.startX>oRec.x && rect.startY>oRec.y && rect.startX<(oRec.x+oRec.w) && rect.startY<(oRec.y+oRec.h))
					cIndex = i;
			}
			
			console.log("cindex="+cIndex);
			if(fillColor == "inherit"){
				fillColor = myRect[cIndex].fill;
				tempFill = 1;
				console.log("fillcolor is inherit");
			}
				
			if(strokeColor == "inherit"){
				strokeColor = myRect[cIndex].color;
				tempstroke = 1;
				console.log("strokecolor is inherit");
			}
				
			if(strokeThickness == 6){
				strokeThickness = myRect[cIndex].thickness;
				tempthickness = 1;	
			}
				
			console.log(" fillcolor = "+ fillColor+" strokecolor = "+ strokeColor+" strokethickness = "+strokeThickness);
			
			draw(rect.startX,rect.startY,rect.w,rect.h,fillColor,strokeColor,strokeThickness);
		}
		else{
			if(modeOption == 1){
				draw(rect.startX,rect.startY,rect.w,rect.h,"none","grey",2);
				drawline(rect.startX,rect.startY,rect.startX+rect.w,rect.startY+rect.h);
				drawline(rect.startX,rect.startY+rect.h,rect.startX+rect.w,rect.startY);
			}
		}
  }else if(modeOption == 0){
  	var xC,yC;
  	xC = e.pageX-this.offsetLeft;
  	yC = e.pageY-this.offsetTop;
  	if(modeOption == 0 && myRect.length != 0){
  		if(checkOverlap(xC,yC) != 0){
  			ctx.clearRect(0,0,canvas.width,canvas.height);
    		drawBoard();
  			for(var i in myRect){
  				oRec = myRect[i];
  				if(index == i){
  					draw(oRec.x, oRec.y,oRec.w,oRec.h,"none","grey",2);
  					drawline(oRec.x,oRec.y,oRec.x+oRec.w,oRec.y+oRec.h);
					drawline(oRec.x,oRec.y+oRec.h,oRec.x+oRec.w,oRec.y);
					setRadioButtons(oRec.fill, oRec.color, oRec.thickness);
					cutProp(oRec.fill, oRec.color, oRec.thickness);
  				}else
  					draw(oRec.x, oRec.y,oRec.w,oRec.h,oRec.fill,oRec.color,oRec.thickness);
  			}
  		}else{
  			ctx.clearRect(0,0,canvas.width,canvas.height);
			drawBoard();
			for ( var i in myRect) {
					oRec = myRect[i];        	
					draw(oRec.x, oRec.y,oRec.w,oRec.h,oRec.fill,oRec.color,oRec.thickness);
			}
  		}		
  	}
  }
}

function cutProp(fillcolor, strokecolor, thickness){
	if(mouseup==true){
		fillColor=fillcolor;
		strokeColor=strokecolor;
		strokeThickness=thickness;
	}
	mouseup=false;
	}

function setRadioButtons(fill, strokeColor, thickness){

		if(fill == "black")
			radio1black.checked=true;
		else if(fill == "red")
				radio1red.checked=true;
			else if(fill == "green")
					radio1green.checked=true;
				else if(fill == "blue")
						radio1blue.checked=true;
					else if(fill == "orange")
							radio1orange.checked=true;
						else if(fill == "violet")
								radio1violet.checked=true;
							else if(fill == "inherit")
									radio1inherit.checked=true;
								else if(fill == "none")
										radio1none.checked=true;
									
		if(strokeColor == "black")
			radio2black.checked=true;
		else if(strokeColor == "red")
				radio2red.checked=true;
			else if(strokeColor == "green")
					radio2green.checked=true;
				else if(strokeColor == "blue")
						radio2blue.checked=true;
					else if(strokeColor == "orange")
							radio2orange.checked=true;
						else if(strokeColor == "violet")
								radio2violet.checked=true;
							else if(strokeColor == "inherit")
									radio2inherit.checked=true;
								else if(strokeColor == "none")
										radio2none.checked=true;
									
		if(thickness == 1)
			radio3one.checked=true;
		else if(thickness == 2)
				radio3two.checked=true; 
			else if(thickness == 3)
					radio3three.checked=true;
				else if(thickness == 4)
						radio3four.checked=true;
					else if(thickness == 5)
							radio3five.checked=true;
						else if(thickness == 6)
								radio3inherit.checked = true;
	
}

function setCordinates(x1,y1,w1,h1){
		
	xul1 = yul1 = xlr1 = ylr1 = 0;
	if(w1>0 && h1>0){
		xul1 = x1;
		yul1 = y1;
		xlr1 = x1+w1;
		ylr1 = y1+h1;
	}else
		if(w1<0 && h1<0){
			xul1 = x1+w1;
			yul1 = y1+h1;
			xlr1 = x1;
			ylr1 = y1;
		}else
			if(w1>0 && h1<0){
				xul1 = x1;
				yul1 = y1 + h1;
				xlr1 = x1 + w1;
				ylr1 = y1; 
				//h1 *= (-1);
			}
			else
				if(w1<0 && h1>0){
					yul1 = y1;
					xul1 = x1 + w1;
					xlr1 = x1;
					ylr1 = y1 + h1; 
					
				}
}

function intersects(x1,y1,x2,y2,x3,y3,x4,y4){					
	if(x3>x1 && y3>y1 && x2>x4 && y4<y2)
		return false;
	else
		if(x4>x1 && x3<x2 && y1 < y4 && y3 < y2)
			return true;
		else
			return false;
		
}

function drawable(){
	for ( var i in myRect) {
		oRec = myRect[i];   
		setCordinates(rect.startX,rect.startY,rect.w,rect.h);
		if(intersects(oRec.x,oRec.y,(oRec.w+oRec.x),(oRec.y+oRec.h),xul1,yul1,(xul1+Math.abs(rect.w)),(yul1+Math.abs(rect.h)))){
			return false;
		}
	}
	return true;
}

function checkOverlap(xC,yC){
	counter = 0;
	var sArea=4500000,cArea;
	for(var i in myRect){
		oRec = myRect[i];
		if(xC>oRec.x && xC<(oRec.x + oRec.w) && (yC>oRec.y) && yC<(oRec.y + oRec.h)){
			cArea = oRec.w * oRec.h;
			if(cArea < sArea){
				sArea = cArea;
				index = i;
			}
			counter++;
		}
	}	
	return counter;
}

function drawline(x1,y1,x2,y2){
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function draw(startX,startY,w,h,fc,sc,st) {
  
 
  if(fc != "none"){
	if(sc != "none"){
		ctx.beginPath();
		ctx.rect(startX, startY, w, h);
		ctx.fillStyle = fc;
		context.fill();
		context.lineWidth = st;
		context.strokeStyle = sc;
		context.stroke();
	}
	else{
	ctx.fillStyle=fc;
	ctx.fillRect(startX, startY,w, h);	
	}
  }
  else{ 
	ctx.beginPath();
	context.lineWidth = st;
    context.strokeStyle = sc;
	ctx.strokeRect(startX,startY, w, h);
	
  }
}


function setRadio(groupNum,buttonNum) {
  switch (groupNum) {
    case 0: // Mode options 
	  modeOption=buttonNum;
	  if(modeOption == 1)
	  	setRadioButtons(fillColor, strokeColor, strokeThickness);
      
      console.log("modeOption="+modeOption);
      if (modeOption!=0 && modeOption!=1 && modeOption != 2) {
        clearSelection();
        drawPrevious();
    	}

      break;
    case 1: // Fill color
      fillColor=["none","black","red","green","blue","orange","violet","inherit"][buttonNum];
      break;
    case 2: // Stroke color
      strokeColor=["none","black","red","green","blue","orange","violet","inherit"][buttonNum];
      break;
    case 3: // Stroke thickness
      strokeThickness=buttonNum+1;
      break;
    }
    if (fillColor=="none" && strokeColor=="none")
      alert("new rectangle will be invisible!");
	  init();
  }

