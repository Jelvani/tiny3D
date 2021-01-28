var canvas = document.getElementById("canvas");
canvas.width = window.innerHeight;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);


function drawPoint(x,y,x1,y1){
    
    
    ctx.strokeStyle = "Lime";
    ctx.beginPath();
    //ctx.arc(x, y, 7, 0, 2 * Math.PI);
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fill();
}



Goodcube = [[1,1,-1],
        [1,-1,-1],
        [-1,-1,-1],
        [-1,1,-1],
        [1,1,1],
        [1,-1,1],
        [-1,-1,1],
        [-1,1,1]];

cube = [[1,1,-1],
        [1,-1,-1],
        [0,-1,-1],
        [-1,1,-1],
        [1,1,1],
        [1,-1,1],
        [-1,-1,0],
        [-1,0,1]];




setInterval(frame, 60);
thetaX = 0
thetaY = 0
thetaZ = 0
function frame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "Black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    thetaX +=0.05;
    thetaY +=0.1;
    thetaZ +=0.03;
    Rx = [[1,0,0],
    [0,Math.cos(thetaX),-1*Math.sin(thetaX)],
    [0,Math.sin(thetaX),Math.cos(thetaX)]];

    Ry = [[Math.cos(thetaY),0,Math.sin(thetaY)],
    [0,1,0],
    [-1*Math.sin(thetaY),0,Math.cos(thetaY)]];

    Rz = [[Math.cos(thetaZ),-1*Math.sin(thetaZ),0],
    [Math.sin(thetaZ),Math.cos(thetaZ),0],
    [0,0,1]];
    newP = []
    for(x of cube){
        tmp = math.multiply(Rx,x)
        tmp = math.multiply(Ry,tmp)
        tmp = math.multiply(Rz,tmp)

        //scale cube
        tmp=math.multiply(tmp,100);

        //move cube to wherever
        tmp=math.add(tmp,canvas.height/2);
        newP.push(tmp)
    }
    for(i =0;i<4;i++){
        if(i>0){
            drawPoint(newP[i-1][0],newP[i-1][1],newP[i][0],newP[i][1]);
        }
    }
    drawPoint(newP[0][0],newP[0][1],newP[3][0],newP[3][1]);

    for(i =4;i<8;i++){
        if(i>4){
            drawPoint(newP[i-1][0],newP[i-1][1],newP[i][0],newP[i][1]);
        }
    }
    drawPoint(newP[4][0],newP[4][1],newP[7][0],newP[7][1]);

    for(i=0;i<4;i++){
        drawPoint(newP[i][0],newP[i][1],newP[i+4][0],newP[i+4][1]);
    }

}
    

