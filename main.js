/*queryたち*/
const smallMap=document.querySelector("#smallMap");
const mediumMap=document.querySelector("#mediumMap");
const largeMap=document.querySelector("#largeMap");
const customMap=document.querySelector("#customMap");
const startButton=document.querySelector("#startButton");
const mapSelect=document.querySelector("#mapSelect");
const canvas=document.querySelector(".canvas");
const C1=document.querySelector("#C1");
const C2=document.querySelector("#C2");
const descr=document.querySelector("#descr");
const gameSetting=document.querySelector(".gameSetting");
/*メイン*/
var time=0;
var win=false;
var mapDensity=0;
var marks=0;
var dctime="";
var tap=[-1,0];
var hitpoint=1;
var phoneMode=0;
var controle=0;
var startTime="";
const mouse = {
    x: null,
    y: null
}
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
});
var mapSize=[20,20];
var mines=0;
const ctx=canvas.getContext('2d');
const tiles=[];
var start=false;
var custom=false;
var gameOver=false;
var size=40;
function collisionRect(x,y,width,height,otherX,otherY,otherWidth,otherHeight){
    if(!otherWidth || !otherHeight){
        otherWidth=0;
        otherHeight=0;
    }
    if(otherX-x<(width+otherWidth) && otherX-x>=0 && otherY-y<(height+otherHeight) && otherY-y>=0){
        return true;
    }else{
        return false;
    }
}
function digup(i){
    if(tiles[i].mines==0){
        let index=-1;
    for(let k=1; k<=8; ++k){
    if(k==1){
    index=tiles.findIndex((e)=>e.x==tiles[i].x && e.y==tiles[i].y+size);
    }else if(k==2){
    index=tiles.findIndex((e)=>e.x==tiles[i].x && e.y==tiles[i].y-size);
    }else if(k==3){
    index=tiles.findIndex((e)=>e.x==tiles[i].x+size && e.y==tiles[i].y+size);
    }else if(k==4){
    index=tiles.findIndex((e)=>e.x==tiles[i].x-size && e.y==tiles[i].y+size);
    }else if(k==5){
    index=tiles.findIndex((e)=>e.x==tiles[i].x+size && e.y==tiles[i].y-size);
    }else if(k==6){
    index=tiles.findIndex((e)=>e.x==tiles[i].x-size && e.y==tiles[i].y-size);
    }else if(k==7){
    index=tiles.findIndex((e)=>e.x==tiles[i].x+size && e.y==tiles[i].y);
    }else if(k==8){
    index=tiles.findIndex((e)=>e.x==tiles[i].x-size && e.y==tiles[i].y);
    }
        if(index!=-1){
        if(tiles[index].status!="reveal"){
        tiles[index].status="reveal";
        if(tiles[index].mines==0){
        digup(index);
            }
        }
        }
        }
    }
}
/*タイル作成処理*/
function generateTiles(){
let px=0;
let py=0;
let i=0;
while(py<=canvas.height-size){
while(px<=canvas.width-size){
if(Math.random()*100<document.querySelector("#density").value){
tiles.push({id:i,x:px,y:py,status:"hide",mines:-1,item:"mine"});
mines++;
}else{
tiles.push({id:i,x:px,y:py,status:"hide",mines:0,item:""});
}
i++;
px+=size;
}
px=0;
py+=size;
}
for(const t of tiles){
    if(t.item!="mine"){
    let index=[];
    let bool=[];
    index[0]=tiles.findIndex((e)=>e.x==t.x && e.y==t.y+size);
    index[1]=tiles.findIndex((e)=>e.x==t.x && e.y==t.y-size);
    index[2]=tiles.findIndex((e)=>e.x==t.x+size && e.y==t.y);
    index[3]=tiles.findIndex((e)=>e.x==t.x-size && e.y==t.y);
    for(let k=0; k<4; ++k){
    if(index[k]==-1){
    bool[k]=true;
    }else if(tiles[index[k]].item=="mine"){
    bool[k]=true;
    }else{
    bool[k]=false;
    }
    }
    if(bool[0] && bool[1] && bool[2] && bool[3]){
        if(index[0]==-1){
            tiles[index[1]].item="";
            mines--;
            tiles[index[1]].mines=0;
        }else if(index[1]==-1){
            tiles[index[0]].item="";
            mines--;
            tiles[index[0]].mines=0;
        }else if(index[2]==-1){
            tiles[index[3]].item="";
            mines--;
            tiles[index[3]].mines=0;
        }else if(index[3]==-1){
            tiles[index[2]].item="";
            mines--;
            tiles[index[2]].mines=0;
        }else{
            tiles[index[Math.round(Math.random()*3)]].mines=0;
            mines--;
            tiles[index[Math.round(Math.random()*3)]].item="";
        }
    }
    }
    if(t.id==tiles.findIndex((e)=>Math.abs(e.x-size*mapSize[0]/2)<=size && Math.abs(e.y-size*mapSize[1]/2)<=size)){
        t.item="";
        t.mines=0;
        let index2=-1;
    for(let k=1; k<=8; ++k){
    if(k==1){
    index2=tiles.findIndex((e)=>e.x==t.x && e.y==t.y+size);
    }else if(k==2){
    index2=tiles.findIndex((e)=>e.x==t.x && e.y==t.y-size);
    }else if(k==3){
    index2=tiles.findIndex((e)=>e.x==t.x+size && e.y==t.y+size);
    }else if(k==4){
    index2=tiles.findIndex((e)=>e.x==t.x-size && e.y==t.y+size);
    }else if(k==5){
    index2=tiles.findIndex((e)=>e.x==t.x+size && e.y==t.y-size);
    }else if(k==6){
    index2=tiles.findIndex((e)=>e.x==t.x-size && e.y==t.y-size);
    }else if(k==7){
    index2=tiles.findIndex((e)=>e.x==t.x+size && e.y==t.y);
    }else if(k==8){
    index2=tiles.findIndex((e)=>e.x==t.x-size && e.y==t.y);
    }
    if(index2!=-1){
        if(tiles[index2].item=="mine"){
        tiles[index2].mines=0;
        }
        tiles[index2].item="";
    }
    }
}
    }
for(const t of tiles){
    if(t.item!="mine"){
    let index=-1;
    for(let k=1; k<=8; ++k){
    if(k==1){
    index=tiles.findIndex((e)=>e.x==t.x && e.y==t.y+size);
    }else if(k==2){
    index=tiles.findIndex((e)=>e.x==t.x && e.y==t.y-size);
    }else if(k==3){
    index=tiles.findIndex((e)=>e.x==t.x+size && e.y==t.y+size);
    }else if(k==4){
    index=tiles.findIndex((e)=>e.x==t.x-size && e.y==t.y+size);
    }else if(k==5){
    index=tiles.findIndex((e)=>e.x==t.x+size && e.y==t.y-size);
    }else if(k==6){
    index=tiles.findIndex((e)=>e.x==t.x-size && e.y==t.y-size);
    }else if(k==7){
    index=tiles.findIndex((e)=>e.x==t.x+size && e.y==t.y);
    }else if(k==8){
    index=tiles.findIndex((e)=>e.x==t.x-size && e.y==t.y);
    }
    if(index!=-1){
    if(tiles[index].item=="mine"){
        if(t.id==0){
        console.log("mine detected in tile["+index+"]");
            }
        t.mines+=1;
    }
    }
    }
}
}
}
smallMap.addEventListener("click",(e)=>{
    mapSize=[10,10];
    custom=false;
    smallMap.className="yellow";
    mediumMap.className="";
    largeMap.className="";
    customMap.className="";
});
mediumMap.addEventListener("click",(e)=>{
    mapSize=[20,20];
    custom=false;
    smallMap.className="";
    mediumMap.className="yellow";
    largeMap.className="";
    customMap.className="";
});
largeMap.addEventListener("click",(e)=>{
    mapSize=[30,30];
    custom=false;
    smallMap.className="";
    mediumMap.className="";
    largeMap.className="yellow";
    customMap.className="";
});
customMap.addEventListener("click",(e)=>{
    custom=true;
    smallMap.className="";
    mediumMap.className="";
    largeMap.className="";
    customMap.className="yellow";
});
startButton.addEventListener("click",(e)=>{
    startButton.innerHTML="";
    start=true;
    if(custom===true){
        mapSize=[C1.value,C2.value];
    }
    canvas.width=size*mapSize[0];
    canvas.height=size*mapSize[1];
    generateTiles();
    tiles[tiles.findIndex((e)=>Math.abs(e.x-size*mapSize[0]/2)<=size && Math.abs(e.y-size*mapSize[1]/2)<=size)].status="reveal";
    digup(tiles.findIndex((e)=>Math.abs(e.x-size*mapSize[0]/2)<=size && Math.abs(e.y-size*mapSize[1]/2)<=size));
    translate();
    mapSelect.innerHTML="";
    gameSetting.innerHTML=`
    サイズ${mapSize[0]}x${mapSize[1]}<br>
    経過時間<t id="time">0</t>
    地雷の数${mines}個
    マーク<t id="markamount">0</t>ヶ所
    `;
    startTime=Date.now();
    dctime=document.getElementById("time");
});
ctx.font = (size/3)+"px serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
function translate() {
    /*情報の更新*/
    if(gameOver===false && win===false){
    time=Date.now()-startTime;
    let timeData=Math.floor(time/10)/100;
    let minutes=Math.floor(timeData/60);
    let seconds=((Math.floor(timeData)-60*Math.floor(timeData/60))/100).toFixed(2).substring(2);
    let smallSeconds=((timeData-Math.floor(timeData))).toFixed(2).substring(2);
    dctime.innerHTML=`${minutes}:${seconds}:${smallSeconds}`;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(const t of tiles){
        if(t.item=="mine" && t.status=="reveal"){
        ctx.strokeStyle="#ff0000";
        }else{
        ctx.strokeStyle="#000000";
        }
        if(t.status=="hide"){
        ctx.strokeRect(t.x,t.y,size,size);
        }else if(t.status=="reveal"){
        ctx.strokeRect(t.x+size/4,t.y+size/4,size/2,size/2);
        if(t.mines>0){
        ctx.fillText(t.mines,t.x+size/2,t.y+size/2);
        }
        }else if(t.status=="marked"){
            ctx.beginPath();
            ctx.strokeRect(t.x,t.y,size,size);
            ctx.strokeStyle="#ff0000";
            ctx.moveTo(t.x,t.y);
            ctx.lineTo(t.x+size,t.y+size);
            ctx.moveTo(t.x+size,t.y);
            ctx.lineTo(t.x,t.y+size);
            ctx.stroke();
            ctx.closePath();
        }
    }
    requestAnimationFrame(translate);
}
canvas.addEventListener("click",(e)=>{
    if(controle==0){
    if(gameOver===false && win===false){
    for(const t of tiles){
        if(t.status!="reveal" && collisionRect(t.x,t.y,size,size,mouse.x,mouse.y)){
            if(e.ctrlKey){
                if(t.status=="hide"){
                    click2();
                    t.status="marked";
                    marks++;
                    document.querySelector("#markamount").innerHTML=marks;
                    if(tiles.findIndex((e)=>e.item=="mine" && e.status!="marked")==-1 && marks==mines){
                        win=true;
                        gameSetting.innerHTML+=`<hr>爆弾${mines}個${mapSize[0]}x${mapSize[1]}クリア！<br>
                    <input type="button" id="clip" onclick="copyResult()" value="結果をクリップボードにコピーする" />`
                    }
                }else if(t.status=="marked"){
                    cancel();
                    t.status="hide";
                    marks--;
                    document.querySelector("#markamount").innerHTML=marks;
                }
                }else{
                click1();
                t.status="reveal";
            digup(t.id);
            if(t.item=="mine"){
                explosion();
                gameOver=true;
                for(let k=0; k<tiles.length; ++k){
                    if(tiles[k].item=="mine"){
                        tiles[k].status="reveal";
                    }
                }
            }
            }
        }
    }
    }
        }else{
        if(gameOver===false && win===false){
    for(const t of tiles){
        if(t.status!="reveal" && collisionRect(t.x,t.y,size,size,mouse.x,mouse.y)){
            if(tap[0]==t.id){
                tap[1]++;
                }else{
                tap[0]=t.id;
                tap[1]=0;
                }
                if(t.status=="hide"){
                    t.status="marked";
                    click2();
                    marks++;
                    document.querySelector("#markamount").innerHTML=marks;
                    if(tiles.findIndex((e)=>e.item=="mine" && e.status!="marked")==-1 && marks==mines){
                        win=true;
                        gameSetting.innerHTML+=`<hr>爆弾${mines}個${mapSize[0]}x${mapSize[1]}クリア！<br>
                    <input type="button" id="clip" onclick="copyResult()" value="結果をクリップボードにコピーする" />`
                    }
                }else if(t.status=="marked"){
                    cancel();
                    t.status="hide";
                    marks--;
                    document.querySelector("#markamount").innerHTML=marks;
                }
            if(tap[1]==2){
                click1();
                t.status="reveal";
            digup(t.id);
            if(t.item=="mine"){
                explosion();
                gameOver=true;
                for(let k=0; k<tiles.length; ++k){
                    if(tiles[k].item=="mine"){
                        tiles[k].status="reveal";
                    }
                }
            }
            }
        }
    }
        }
        }
});
function valueCheck(){
    document.querySelector("#densityValue").innerHTML=document.querySelector("#density").value;
    mapDensity=document.querySelector("#density").value;
}
function copyResult(){
    let button=document.getElementById("clip");
    let string=`
    マインスイーパー\n
    爆弾${mines}個、${mapSize[0]}x${mapSize[1]}を${time}秒でクリア！
    `;
  navigator.clipboard.writeText(string).then(()=>{
      button.value="コピーしました。";
        setTimeout(function(){button.value="結果をクリップボードにコピーする"}, 1000);
    },()=>{
      button.value="何らかの理由でコピーに失敗しました。";
        setTimeout(function(){button.value="結果をクリップボードにコピーする"}, 1000);
      });
}
function controleChange(){
    if((-1)**phoneMode==-1){
    descr.innerHTML=`
    (スマホ向け)<br>
        タップでしるしをつけ、もう一度タップでしるしをけす<br>
        同じところを3回タップで掘る。`;
    controle=1;
    }else{
    descr.innerHTML=`
    (PC向け)<br>
        クリックで掘る。<br>
        ctrl+クリックでしるしを付ける。`;
    controle=0;
    }
}
function allReveal(){
    for(const t of tiles){
        t.status="reveal";
    }
}
