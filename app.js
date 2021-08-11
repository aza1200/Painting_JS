const canvas = document.getElementById("jsCanvas");
const ctx    = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";  //픽셀의 배경색 흰색으로
ctx.fillRect(0,0,canvas.width,canvas.height); //캔버스 배경 하얀배경 설정!

//ctx.fillStyle = "green";
//ctx.fillRect(50,20,100, 49);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle   = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    if(filling ===false) {
        painting = true;
    }
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        // console.log("creating path in ",x,y);
        ctx.beginPath();
        ctx.moveTo(x,y); //path 를 만들시 마우스의 xy 좌표를 path 로 옮김
    }else{
        // console.log("creating line in ",x,y );
        ctx.lineTo(x,y);
        ctx.stroke(); //현재의 sub-path 를 현재의 stroke style 로 획을 그음
        //ctx.closePath(); 선이끝남 근데 계속 클릭하면
        // 시작점은 처음 클릭지점임 ㅋ
    }
}


function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    //console.log(event.target.value)
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }
    else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleCM(event){
    event.preventDefault(); //마우스 왼쪽클릭 메뉴 표시 금지!
    //console.log(event);
}

function handleSaveClick(){
    const image = canvas.toDataURL(); //default png 임
    //console.log(image);
    const link  = document.createElement("a");
    link.href = image
    link.download = "PaintJS[🧡]";
    link.click();
    //픽셀이 조금 꺠짐 안꺠지길 원하면 고화질로 만들어야함
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}
// console.log(Array.from(colors));
Array.from(colors).forEach(color =>color.addEventListener("click",handleColorClick));
                                // ↑ 요거는 array 안의 각각의 아이템 대표함
if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

