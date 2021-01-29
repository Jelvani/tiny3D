var canvas = document.getElementById("canvas");
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
mouseX = 0
mouseY = 0
distance = -3;
rl = 1;
canvas.addEventListener('mousemove', e => {

    mouseX = e.offsetX;
    mouseY = e.offsetY;
    
  });

  document.addEventListener("keydown", e =>{
    var keyCode = e.keyCode
    if (keyCode === 38) {//up
        distance+=0.1;
    }else if(keyCode === 40){//down
        distance-=0.1;
    }else if(keyCode === 37){//left
        rl-=0.1;
    }else if(keyCode === 39){//right
        rl+=0.1;
    }
  });

function drawPoint(x,y,x1,y1,color1,color2){
    x = x+canvas.width/2;
    y = y+canvas.height/2;
    x1 = x1+canvas.width/2;
    y1 = y1+canvas.height/2;

    var grad= ctx.createLinearGradient(x, y, x1, y1);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);

    ctx.strokeStyle = grad;
    
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

pentagon = [[-1,2,-1],
            [1,2,-1],
            [2,1,-1],
            [2,-1,-1],
            [1,-2,-1],
            [-1,-2,-1],
            [-2,-1,-1],
            [-2,1,-1],
            [-1,2,1],
            [1,2,1],
            [2,1,1],
            [2,-1,1],
            [1,-2,1],
            [-1,-2,1],
            [-2,-1,1],
            [-2,1,1]];
//apply 3D rotation to a single point around (0,0,0)
function rotate(pt, Rx,Ry,Rz){

    //rotation matrices
    matX = [[1,0,0],
    [0,Math.cos(Rx),-1*Math.sin(Rx)],
    [0,Math.sin(Rx),Math.cos(Rx)]];

    matY = [[Math.cos(Ry),0,Math.sin(Ry)],
    [0,1,0],
    [-1*Math.sin(Ry),0,Math.cos(Ry)]];

    matZ = [[Math.cos(Rz),-1*Math.sin(Rz),0],
    [Math.sin(Rz),Math.cos(Rz),0],
    [0,0,1]];

      
    pt = math.multiply(matX,pt)
    pt = math.multiply(matY,pt)
    pt = math.multiply(matZ,pt)
    return pt;
}

function translate(pt, x,y,z){
    pt[0] = pt[0] + x;
    pt[1] = pt[1] + y;
    pt[2] = pt[2] + z;
}

//project with perspective projection
function project(pt){
    //perspective projection matrix
    pMat = [[5*math.tan(100/pt[2]),0,0],
            [0,5*math.tan(100/pt[2]),0]];

    tmp=math.multiply(pMat,pt);
    return tmp;

}
function drawCube(x,y,z,Rx,Ry,Rz,scale,color1,color2){
    newP = []
    //for each points in cube
    for(pt of cube){

        //rotate around 3 axis
        tmp=rotate(pt,Rx,Ry,Rz)
        //translate cube on 3 axis
        translate(tmp,x,y,z)
        //scale cube
        tmp=math.multiply(tmp,scale);
        tmp = project(tmp);
        newP.push(tmp)
    }
    for(i =0;i<4;i++){
        if(i>0){
            drawPoint(newP[i-1][0],newP[i-1][1],newP[i][0],newP[i][1],color1,color2);
        }
    }
    drawPoint(newP[0][0],newP[0][1],newP[3][0],newP[3][1],color1,color2);

    for(i =4;i<8;i++){
        if(i>4){
            drawPoint(newP[i-1][0],newP[i-1][1],newP[i][0],newP[i][1],color1,color2);
        }
    }
    drawPoint(newP[4][0],newP[4][1],newP[7][0],newP[7][1],color1,color2);

    for(i=0;i<4;i++){
        drawPoint(newP[i][0],newP[i][1],newP[i+4][0],newP[i+4][1],color1,color2);
    }
}

function drawPentagon(x,y,z,Rx,Ry,Rz,scale,color1,color2){
    newP = []
    //for each points in cube
    for(pt of pentagon){

        //rotate around 3 axis
        tmp=rotate(pt,Rx,Ry,Rz)
        //translate cube on 3 axis
        translate(tmp,x,y,z)
        tmp=math.multiply(tmp,scale);
        tmp = project(tmp);
        //scale cube
        
        newP.push(tmp)
    }
    for(i =0;i<8;i++){
        if(i>0){
            drawPoint(newP[i-1][0],newP[i-1][1],newP[i][0],newP[i][1],color1,color2);
        }
    }
    drawPoint(newP[0][0],newP[0][1],newP[7][0],newP[7][1],color1,color2);

    
    for(i =8;i<16;i++){
        if(i>8){
            drawPoint(newP[i-1][0],newP[i-1][1],newP[i][0],newP[i][1],color1,color2);
        }
    }
    drawPoint(newP[8][0],newP[8][1],newP[15][0],newP[15][1],color1,color2);
    
    for(i=0;i<8;i++){
        drawPoint(newP[i][0],newP[i][1],newP[i+8][0],newP[i+8][1],color1,color2);
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
    drawCube(5*math.sin(Ry)*math.sin(Ry/2)+rl,5*math.sin(Ry)*math.cos(Ry/2),distance,math.sin(Ry),math.sin(Rz),math.sin(Rz),100,"Pink","White");
    drawCube(5*math.cos(Ry)+rl,5*math.sin(Ry),distance,math.sin(Rx),math.sin(Ry),math.sin(Rz),100,"Lime",'Purple');
    //drawCube(rl,0,distance,math.sin(Ry),math.sin(Rz),math.sin(Rx),100,"Blue");
    drawCube(rl,0,distance,math.sin(Ry),math.sin(Rz),math.sin(Rx),500,"Pink","Lime");
    drawPentagon(rl,0,distance,math.sin(Rz),math.sin(Rx),math.sin(Rx),500,"Yellow","Blue");

}
    
