const canvas = document.getElementById("jsCanvas"); //get id of canvas
const ctx = canvas.getContext("2d"); // control pixels in side of this
const colors = document.getElementsByClassName("jsColor"); //class jsColor >> colors
const range = document.getElementById("jsRange"); // get id range Input (thickness of stroke)
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
let painting = false; // init
let filling = false;
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;
init();

function init() {
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;
    ctx.strokeStyle = "INITIAL_COLOR"; // color of stroke
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.lineWidth = 2.5; // thickness of line(stroke)
    ctx.fillstyle = "INITIAL_COLOR";

    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick)); // color 클래스가 할당되어있는 각각의 객체들에 handleColorClick 이벤트 부여

    if (canvas) { // if canvas is exist
        canvas.addEventListener("mousemove", onMouseMove); // case when move mouse for painting
        canvas.addEventListener("mousedown", startPainting) // case when start painting
        canvas.addEventListener("mouseup", stopPainting);// case when stop clicking(drawing)
        canvas.addEventListener("mouseleave", stopPainting);//case when leave the canvas
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM); //ContextMenu (Right click on page)
    }

    if (range) {
        range.addEventListener("input", handleRangeChange);
    }

    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", handleSaveClick);
    }
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) { // 마우스의 이동을 계속해서 관찰
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) { // 계속해서 새로운 Path 생성 마우스(좌표)의 이동을 계속해서 관찰하고 그릴 준비를 함?
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); // 클릭을 하면 클릭이 되는 시점부터 선을 생성하고 그리기 시작 클릭을 하고 있는 동안에는 Path는 고정
        ctx.stroke()
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor; //클릭된 객체의 backgroundColor 값 반환, color에 대입
    ctx.strokeStyle = color; // strokeStyle 오버라이드, 대입
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event) {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]";
    link.click();
}