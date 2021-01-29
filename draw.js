var canvas = document.getElementById("canvas");
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
mouseX = 0
mouseY = 0
canvas.addEventListener('mousemove', e => {

    mouseX = e.offsetX;
    mouseY = e.offsetY;
    
  });

function drawPoint(x,y,x1,y1,color){
    
    
    ctx.strokeStyle = color;
    ctx.beginPath();
    //ctx.arc(x, y, 7, 0, 2 * Math.PI);
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fill();
}



cube = [[1,1,-1],
        [1,-1,-1],
        [-1,-1,-1],
        [-1,1,-1],
        [1,1,1],
        [1,-1,1],
        [-1,-1,1],
        [-1,1,1]];



function drawCube(x,y,z,Rx,Ry,Rz,scale,color){
    
    matX = [[1,0,0],
    [0,Math.cos(Rx),-1*Math.sin(Rx)],
    [0,Math.sin(Rx),Math.cos(Rx)]];

    matY = [[Math.cos(Ry),0,Math.sin(Ry)],
    [0,1,0],
    [-1*Math.sin(Ry),0,Math.cos(Ry)]];

    matZ = [[Math.cos(Rz),-1*Math.sin(Rz),0],
    [Math.sin(Rz),Math.cos(Rz),0],
    [0,0,1]];

    newP = []
    for(pt of cube){
        tmp = math.multiply(matX,pt)
        tmp = math.multiply(matY,tmp)
        tmp = math.multiply(matZ,tmp)

        //scale cube
        tmp=math.multiply(tmp,scale);

        //move cube to wherever
        
        tmp[0] = tmp[0] + x;
        tmp[1] = tmp[1] + y;
        tmp[2] = tmp[2] + z;
        newP.push(tmp)
    }
    for(i =0;i<4;i++){
        if(i>0){
            drawPoint(newP[i-1][0],newP[i-1][1],newP[i][0],newP[i][1],color);
        }
    }
    drawPoint(newP[0][0],newP[0][1],newP[3][0],newP[3][1],color);

    for(i =4;i<8;i++){
        if(i>4){
            drawPoint(newP[i-1][0],newP[i-1][1],newP[i][0],newP[i][1],color);
        }
    }
    drawPoint(newP[4][0],newP[4][1],newP[7][0],newP[7][1],color);

    for(i=0;i<4;i++){
        drawPoint(newP[i][0],newP[i][1],newP[i+4][0],newP[i+4][1],color);
    }
}


setInterval(frame, 60);
Rx = 0
Ry = 0
Rz = 0
function frame(){
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    Rx +=0.05;
    Ry +=0.1;
    Rz +=0.03;
    size1 = math.sin(Rx)*100+10;
    size2 = math.cos(Rx)*100+10;
    size3 = math.cos(Rx)*50+10;
    drawCube(mouseX,mouseY,0,Rz,Ry,Rx,size1,"Pink");
    drawCube(mouseX,mouseY,0,Rx,Ry,Rz,size2,"Lime");
    drawCube(mouseX,mouseY,0,Ry,Rz,Rx,size3,"Blue");
    drawCube(mouseX,mouseY,0,Ry*2,Rz,Rx,size3*1.5,"Red");

}
    
